const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": `The min length of the "name" field is 2`,
      "string.max": `The max length of the "name" field is 30`,
      "string.empty": `The "name" field must be filled in`,
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": `The "avatar" field must be filled in`,
      "string.uri": `The "avatar" field must be a valid url`,
    }),
    email: Joi.string().required().email().messages({
      "string.empty": `The "email" field must be filled in`,
      "string.email": `The "email" field must be a valid email`,
    }),
    password: Joi.string().required().messages({
      "string.empty": `The "password" field must be filled in`,
    }),
  }),
});

const validateItemBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": `The min length of the "name" field is 2`,
      "string.max": `The max length of the "name" field is 30`,
      "string.empty": `The "name" field must be filled in`,
    }),
    weather: Joi.string().required().messages({
      "string.empty": `The "weather" field must be filled in`,
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": `The "imageUrl" field must be filled in`,
      "string.uri": `The "imageUrl" field must be a valid url`,
    }),
  }),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": `The "email" field must be filled in`,
      "string.email": `The "email" filed must be a valid email`,
    }),
    password: Joi.string().required().messages({
      "string.empty": `The "password" field must be filled in`,
    }),
  }),
});

const validateUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": `The min length of the "name" field is 2`,
      "string.max": `The max length of the "name" field is 30`,
      "string.empty": `The "name" field must be filled in`,
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": `The "avatar" field must be filled in`,
      "string.uri": `The "avatar" field must be a valid url`,
    }),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  validateItemBody,
  validateUserBody,
  validateUser,
  validateId,
  validateUpdate,
};
