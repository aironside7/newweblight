const { Schema, model } = require('mongoose');

const Role = {
  Admin: 'admin',
  User: 'user',
};

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: { type: [String], required: true, default: [Role.User] }, // Default role is 'user'
});

const UserModel = model('User', userSchema);

module.exports = { UserModel, Role };
