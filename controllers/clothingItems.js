const ClothingItem = require("../models/clothingItem");
const {
  INVALID_DATA_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
} = require("../utils/errors");

const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      res.status(DEFAULT_ERROR_CODE).send({ message: err.message });
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
        res.status(DEFAULT_ERROR_CODE).send({ message: err.message });
      }
    });
};

const deleteClothingItem = (req, res) => {
  ClothingItem.findByIdAndDelete(req.params.itemId)
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
        res.status(DEFAULT_ERROR_CODE).send({ message: err.message });
      }
    });
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
};
