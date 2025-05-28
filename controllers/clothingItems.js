const ClothingItem = require("../models/clothingItem");
const BadRequestError = require("../errors/badRequestError");
const NotFoundError = require("../errors/notFoundError");
const ForbiddenError = require("../errors/forbiddenError");

const getClothingItems = (req, res, next) => {
  ClothingItem.find({})
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      next(err);
    });
};

const createClothingItem = (req, res, next) => {
  const userId = req.user._id;
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: userId })
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Request body could not be read properly"));
      } else {
        next(err);
      }
    });
};

const deleteClothingItem = (req, res, next) => {
  ClothingItem.findById(req.params.itemId)
    .orFail(() => {
      throw new NotFoundError("Item ID not found");
    })
    .then((item) => {
      const itemObject = item.toObject();
      if (!itemObject.owner.equals(req.user._id)) {
        throw new ForbiddenError(
          "Forbidden: You do not have permission to delete this item"
        );
      }
      return item
        .deleteOne()
        .then(() => res.status(200).send({ message: "Successfully deleted" }));
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        next(new BadRequestError("Request body could not be read properly"));
      } else {
        next(err);
      }
    });
};

const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("Item ID not found");
    })
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        next(new BadRequestError("Request body could not be read properly"));
      } else {
        next(err);
      }
    });
};

const dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("Item ID not found");
    })
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        next(new BadRequestError("Request body could not be read properly"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
};
