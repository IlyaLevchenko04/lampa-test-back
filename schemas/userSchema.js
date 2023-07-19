const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const userSchema = new Schema({
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
  token: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

async function createNewUser({ name, email, password }) {
  const isEmailUnique = await User.findOne({ email });

  if (isEmailUnique) {
    const error = new Error('email in use');
    error.status = 409;
    throw error;
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
    const error = new Error('Email or password is wrong');
    error.status = 401;
    throw error;
  }

  const isPasswordTrue = await bcrypt.compare(password, user.password);

  if (!isPasswordTrue) {
    const error = new Error('Email or password is wrong');
    error.status = 401;
    throw error;
  }

  const { _id: id } = user;

  const payload = { id };

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '23h' });

  const loggedInUser = await User.findByIdAndUpdate(
    id,
    { token },
    { new: true }
  );

  return loggedInUser;
}

async function logoutFromAcc(id) {
  await User.findByIdAndUpdate(id, { token: '' });

  return 'Logout success';
}

module.exports = {
  createNewUser,
  loginInAccount,
  logoutFromAcc,
  User,
};
