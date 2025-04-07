const router = require("express").Router();
const user = require("./users");
const clothingItem = require("./clothingItems");

router.use("/users", user);
router.use("/items", clothingItem);
router.use((req, res, next) => {
  res.status(404).json({
    message: "Requested resource not found",
  });
});

module.exports = router;
