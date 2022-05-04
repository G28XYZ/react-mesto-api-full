const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

require('dotenv').config();

const { JWT_SECRET = 'JWT_SECRET' } = process.env;

const handleAuthError = (next) => {
  next(new UnauthorizedError('Необходима авторизация'));
};

module.exports = (req, res, next) => {
  const cookieAuth = req.cookies.jwt;
  if (!cookieAuth) {
    return handleAuthError(next);
  }
  let payload;
  try {
    payload = jwt.verify(cookieAuth, JWT_SECRET);
  } catch (err) {
    return handleAuthError(next);
  }
  req.user = payload;
  return next();
};
