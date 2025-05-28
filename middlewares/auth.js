const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const UnauthorizedError = require("../errors/unauthorizedError");

const handleAuthError = () => {
  throw new UnauthorizedError("Authorization error");
};

const extractBearerToken = (header) => header.replace("Bearer ", "");

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer")) {
    next(handleAuthError());
  }
  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    next(handleAuthError());
  }

  req.user = payload;
  return next();
};
