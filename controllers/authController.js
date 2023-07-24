const {
  createNewUser,
  loginInAccount,
  logoutFromAcc,
} = require('../schemas/userSchemas/userSchema');
const { createNewPairOfTokens } = require('../helpers/auth/index');
const joiUserSchema = require('../schemas/userSchemas/userJoiSchema');
const CustomError = require('../helpers/errors/customError');
const errorsEnum = require('../helpers/errors/errorsEnum');

async function registerNewUser(req, res, next) {
  try {
    const { error } = joiUserSchema.validate(req.body);

    if (error) {
      throw new CustomError(errorsEnum.VALIDATION_ERROR);
    }

    const user = await createNewUser(req.body);

    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

async function loginUser(req, res, next) {
  try {
    const user = await loginInAccount(req.body);

    return res.json(user);
  } catch (error) {
    next(error);
  }
}

async function logoutUser(req, res, next) {
  try {
    const { _id: id } = req.user;
    const message = await logoutFromAcc(id);

    return res.json({ message });
  } catch (error) {
    next(error);
  }
}

async function refreshTokens(req, res, next) {
  try {
    const tokens = await createNewPairOfTokens(req.body.refreshToken);

    res.json(tokens);
  } catch (error) {
    next(error);
  }
}

module.exports = { registerNewUser, loginUser, logoutUser, refreshTokens };
