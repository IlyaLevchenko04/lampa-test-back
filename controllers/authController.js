const {
  createNewUser,
  loginInAccount,
  logoutFromAcc,
} = require('../schemas/userSchemas/userSchema');
const joiUserSchema = require('../schemas/userSchemas/userJoiSchema');

async function registerNewUser(req, res, next) {
  try {
    const { error } = joiUserSchema.validate(req.body);

    if (error) {
      const err = new Error('missing fields');
      err.status = 400;
      throw err;
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

module.exports = { registerNewUser, loginUser, logoutUser };
