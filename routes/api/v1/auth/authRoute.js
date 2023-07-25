const express = require('express');
const router = express.Router();
const {
  registerNewUser,
  loginUser,
  logoutUser,
  refreshTokens,
} = require('../../../../controllers/authController');
const { auth } = require('../../../../middlewares/authMiddlware');

/**
 * @openapi
 * /register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: create user.
 *     description: Method for creating user. Required fields name, email, password.
 *     parameters:
 *       - in: body
 *         name: email
 *         required: true
 *       - in: body
 *         name: password
 *         required: true
 *       - in: body
 *         name: name
 *         required: true
 *
 *     responses:
 *       201:
 *         description: Returns created user.
 *
 *       409:
 *         description: email in use.
 *
 *       400:
 *         description: missing fields.
 *
 */

router.post('/register', registerNewUser);

/**
 * @openapi
 * /login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: login in account of user.
 *     description: Method for login in account of user. Required fields email, password.
 *     parameters:
 *       - in: body
 *         name: email
 *         required: true
 *       - in: body
 *         name: password
 *         required: true
 *
 *     responses:
 *       201:
 *         description: Returns logged user.
 *
 *       400:
 *         description: missing fields.
 *
 */

router.post('/login', loginUser);

/**
 * @openapi
 * /logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: logout from account of user.
 *     description: Method for logout from account of user.
 *
 *     responses:
 *       201:
 *         description: Returns messsage Logout success.
 *
 */

router.post('/logout', auth, logoutUser);

/**
 * @openapi
 * /refreshToken:
 *   post:
 *     tags:
 *       - Auth
 *     summary: refresh tokens .
 *     description: Method for refreshing tokens.
 *     parameters:
 *       - in: body
 *         name: refreshToken
 *         required: true
 *
 *     responses:
 *       201:
 *         description: Returns new pair of tokens acsessToken, refreshToken.
 *
 */

router.post('/refreshToken', refreshTokens);
module.exports = router;
