const router = require('express').Router();
// const { signout } = require('../controllers/users');

router.post('/', (req, res) => {
  res.clearCookie('jwt');
  res.send('вы вышли из аккаунта');
});

module.exports = router;
