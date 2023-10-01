const jwt = require('jsonwebtoken');

const { SECRET_KEY = 'some-secret-key' } = process.env;
const UnauthorizedError = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  req.user = payload;

  next();
};

// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;
//   console.log(authorization);

//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     throw new UnauthorizedErrorError('Необходима авторизация');
//   }

//   const token = authorization.replace('Bearer ', '');
//   let payload;

//   try {
//     payload = jwt.verify(token, 'some-secret-key');
//   } catch (err) {
//     throw new UnauthorizedErrorError('Необходима авторизация');
//   }

//   req.user = payload;

//   next();
// };
