const ClothingItem = require("../models/clothingItem");

const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((item) => res.send({ data: item }))
    .catch(() => res.status(404).send({ message: "Error" }));
};

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl })
    .then((item) => res.send({ data: item }))
    .catch(() => res.status(404).send({ message: "Error" }));
};

const deleteClothingItem = (req, res) => {
  ClothingItem.findByIdAndDelete(req.params._id)
    .then((item) => res.send({ data: item }))
    .catch(() => res.status(404).send({ message: "Error" }));
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
};
