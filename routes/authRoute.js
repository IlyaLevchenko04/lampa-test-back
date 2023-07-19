const express = require('express');
const router = express.Router();
const {
  registerNewUser,
  loginUser,
  logoutUser,
} = require('../controllers/authController');
const { auth } = require('../middlewares/authMiddlware');

router.post('/register', registerNewUser);

router.post('/login', loginUser);

router.post('/logout', auth, logoutUser);
module.exports = router;
