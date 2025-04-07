const ClothingItem = require("../models/clothingItem");

const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((item) => res.send({ data: item }))
    .catch(() => res.status(404).send({ message: "Error" }));
};

const createClothingItem = (req, res) => {
  const userId = req.user._id;
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: userId })
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Invalid data provided" });
      } else {
        res.status(500).send({ message: "An error occurred on the server" });
      }
    });
};

const deleteClothingItem = (req, res) => {
  ClothingItem.findByIdAndDelete(req.params.itemId)
    .then((item) => res.send({ data: item }))
    .catch(() => res.status(404).send({ message: "Error" }));
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
};
