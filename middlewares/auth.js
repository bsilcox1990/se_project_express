const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UNAUTHORIZED_ERROR_CODE } = require("../utils/errors");

const handleAuthError = (res) => {
  res.status(UNAUTHORIZED_ERROR_CODE).send({ message: "Authorization error" });
};

const extractBearerToken = (header) => header.replace("Bearer ", "");

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer")) {
    return handleAuthError(res);
  }
  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return handleAuthError(res);
  }

  req.user = payload;
  next();
};
