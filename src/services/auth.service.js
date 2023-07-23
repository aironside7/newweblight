const { UserModel } = require('../models/user.model');
const { hashPassword, comparePasswords } = require('../utils/bcrypt.utils');
const { generateToken } = require('../utils/jwt.utils');

const registerUser = async (userData) => {
  const { username, email, password ,roles} = userData;

  const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    throw new Error('Username or email already exists.');
  }

  const hashedPassword = await hashPassword(password);

  const user = new UserModel({
    username,
    email,
    password: hashedPassword,
    roles
  });

  await user.save();
  return user;
};

const loginUser = async (credentials) => {
  const { username, password } = credentials;

  const user = await UserModel.findOne({ username });
  if (!user) {
    throw new Error('Invalid username or password.');
  }

  const passwordMatch = await comparePasswords(password, user.password);
  if (!passwordMatch) {
    throw new Error('Invalid username or password.');
  }

  const token = generateToken(user);
  return token;
};

module.exports = { registerUser, loginUser };
