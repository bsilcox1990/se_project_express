const ClothingItem = require("../models/clothingItem");
const {
  INVALID_DATA_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
} = require("../utils/errors");

const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: "An error has occured on the server" });
    });
};

const createClothingItem = (req, res) => {
  const userId = req.user._id;
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: userId })
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res.status(INVALID_DATA_ERROR_CODE).send({ message: err.message });
      } else {
        res
          .status(DEFAULT_ERROR_CODE)
          .send({ message: "An error has occured on the server" });
      }
    });
};

const deleteClothingItem = (req, res) => {
  ClothingItem.findById(req.params.itemId)
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = NOT_FOUND_ERROR_CODE;
      throw error;
    })
    .then((item) => {
      const itemObject = item.toObject();
      if (!itemObject.owner.equals(req.user._id)) {
        const error = new Error(
          "Forbidden: You do not have permission to delete this item."
        );
        error.statusCode = FORBIDDEN_ERROR_CODE;
        throw error;
      }
      return item
        .deleteOne()
        .then(() => res.status(200).send({ message: "Successfully deleted" }));
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError" || err.name === "CastError") {
        res.status(INVALID_DATA_ERROR_CODE).send({ message: err.message });
      } else if (err.statusCode === NOT_FOUND_ERROR_CODE) {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
      } else if (err.statusCode === FORBIDDEN_ERROR_CODE) {
        res.status(FORBIDDEN_ERROR_CODE).send({ message: err.message });
      } else {
        res
          .status(DEFAULT_ERROR_CODE)
          .send({ message: "An error has occured on the server" });
      }
    });
  /* ClothingItem.findByIdAndDelete(req.params.itemId)
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = NOT_FOUND_ERROR_CODE;
      throw error;
    })
    .then((item) => {
      const itemObject = item.toObject();
      if (itemObject.owner.equals(req.user._id)) {
        res.send({ data: item });
      } else {
        const error = new Error(
          "Forbidden: You do not have permission to delete this item."
        );
        error.statusCode = FORBIDDEN_ERROR_CODE;
        throw error;
      }
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError" || err.name === "CastError") {
        res.status(INVALID_DATA_ERROR_CODE).send({ message: err.message });
      } else if (err.statusCode === NOT_FOUND_ERROR_CODE) {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
      } else if (err.statusCode === FORBIDDEN_ERROR_CODE) {
        res.status(FORBIDDEN_ERROR_CODE).send({ message: err.message });
      } else {
        res
          .status(DEFAULT_ERROR_CODE)
          .send({ message: "An error has occured on the server" });
      }
    }); */
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = NOT_FOUND_ERROR_CODE;
      throw error;
    })
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError" || err.name === "CastError") {
        res.status(INVALID_DATA_ERROR_CODE).send({ message: err.message });
      } else if (err.statusCode === NOT_FOUND_ERROR_CODE) {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
      } else {
        res
          .status(DEFAULT_ERROR_CODE)
          .send({ message: "An error has occured on the server" });
      }
    });
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = NOT_FOUND_ERROR_CODE;
      throw error;
    })
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError" || err.name === "CastError") {
        res.status(INVALID_DATA_ERROR_CODE).send({ message: err.message });
      } else if (err.statusCode === NOT_FOUND_ERROR_CODE) {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
      } else {
        res
          .status(DEFAULT_ERROR_CODE)
          .send({ message: "An error has occured on the server" });
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
