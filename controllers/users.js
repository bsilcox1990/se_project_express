const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const BadRequestError = require("../errors/badRequestError");
const NotFoundError = require("../errors/notFoundError");
const ConflictError = require("../errors/conflictError");
const UnauthorizedError = require("../errors/unauthorizedError");

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError("User ID not found");
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Request body could not be read properly"));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const userObject = user.toObject();
      delete userObject.password;
      res.send({ data: userObject });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Request body could not be read properly"));
      } else if (err.code === 11000) {
        next(new ConflictError("Email already in use"));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new BadRequestError("Email and password required"));
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password!") {
        next(new UnauthorizedError("Incorrect email or password!"));
      } else if (err.name === "ValidationError") {
        next(new BadRequestError("Request body could not be read properly"));
      } else {
        next(err);
      }
    });
};

const updateProfile = (req, res, next) => {
  const { name, avatar } = req.body;

  User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: { name, avatar } },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      throw new NotFoundError("User ID not found");
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Request body could not be read properly"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCurrentUser,
  createUser,
  login,
  updateProfile,
};
