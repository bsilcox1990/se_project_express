const router = require("express").Router();
const user = require("./users");
const clothingItem = require("./clothingItems");
const { createUser, login } = require("../controllers/users");
const NotFoundError = require("../errors/notFoundError");
const { validateUserBody, validateUser } = require("../middlewares/validation");

router.use("/users", user);
router.use("/items", clothingItem);
router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateUser, login);
router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
