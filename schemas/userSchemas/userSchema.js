const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { updateTokens } = require('../../helpers/auth');
const { RefreshToken } = require('../refreshTokenSchema/refreshToken');
const errorsEnum = require('../../helpers/errors/errorsEnum');
const CustomError = require('../../helpers/errors/customError');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const User = mongoose.model('User', userSchema);

async function createNewUser({ name, email, password }) {
  const isEmailUnique = await User.findOne({ email });

  if (isEmailUnique) {
    throw new CustomError(errorsEnum.EMAIL_IN_USE);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    email,
    password: hashedPassword,
    name,
  };

  const user = await User.create(newUser);

  return user;
}

async function loginInAccount({ email, password }) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError(errorsEnum.EMAIL_OR_PASS_IS_WRONG);
  }

  const isPasswordTrue = await bcrypt.compare(password, user.password);

  if (!isPasswordTrue) {
    throw new CustomError(errorsEnum.EMAIL_OR_PASS_IS_WRONG);
  }

  const { _id: id } = user;

  const tokens = await updateTokens(id, { userId: id });

  const loggedInUser = await User.findById(id);

  return {
    loggedInUser,
    tokens,
  };
}

async function logoutFromAcc(id) {
  await RefreshToken.findOneAndDelete({ userId: id });

  return 'Logout success';
}

module.exports = {
  createNewUser,
  loginInAccount,
  logoutFromAcc,
  User,
};
