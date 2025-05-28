const router = require("express").Router();
const user = require("./users");
const clothingItem = require("./clothingItems");
const { createUser, login } = require("../controllers/users");
const NotFoundError = require("../errors/notFoundError");

router.use("/users", user);
router.use("/items", clothingItem);
router.post("/signup", createUser);
router.post("/signin", login);
router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
