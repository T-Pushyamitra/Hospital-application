const UserModel = require('../models/user.model');

/**
 * Check if the user is found by id.
 *
 * @param {string} _id
 * @returns {boolean}
 */
exports._isUserExists = async (_id) => {
  const user_count = await UserModel.findOne().where('_id').equals(_id).count();
  return !!user_count;
};

/**
 * Check if the user is found by phone number.
 *
 * @param {string} _phoneNumber
 * @returns {boolean}
 */
exports.isPhoneNumberExsits = async (_phoneNumber) => {
  const user_count = await UserModel.findOne()
    .where('phoneNumber')
    .equals(_phoneNumber)
    .count();
  return !!user_count;
};

/**
 * Check if the user is found by email.
 *
 * @param {string} _email
 * @returns {boolean}
 */
exports.isEmailExsits = async (_email) => {
  const user_count = await UserModel.findOne()
    .where('email')
    .equals(_email)
    .count();
  return !!user_count;
};

/**
 * This returns all the user from the db.
 *
 * @param {map} filter
 * @returns {UserModel} returns list of users
 */
exports.index = async (filters = {}) => { return await UserModel.find(filters) };

/**
 * Save a new user to db.
 *
 * @param {UserModel} user
 * @returns {UserModel}
 */
exports.create = async (user) => {
  const newUser = new UserModel(user);
  await newUser.save();
  return newUser;
};

/**
 * Get user by id.
 *
 * @param {string} _id
 * @returns {UserModel}
 */
exports.getUserById = async (_id) => {
  const user = await UserModel.findById(_id);
  return user;
};

/**
 *  Update the existing user by ID.
 *
 * @param {string} _userId
 * @param {UserModel} _user
 * @returns {UserModel}
 */
exports.update = async (_userId, _user) => {
  // If the user was not found by id. Throw Error.
  if (!_isUserExists(_user_id)) {
    throw new Error([`Cannot find any user with id ${_userId}`]);
  }

  // Update the user by id.
  const user = await UserModel.findByIdAndUpdate(_userId, _user);
  return user;
};

/**
 *  Get user by user's phone number from db.
 *
 * @param {string} _phoneNumber
 * @returns {UserModel}
 */
exports.getUserByPhoneNumber = async (_phoneNumber) => {
  const user = await UserModel.findOne()
    .where('phoneNumber')
    .equals(_phoneNumber);
  return user;
};

/**
 *  Get user by user's sex from db.
 *
 *  For current scope there only [male, female].
 * @param {string} _sex
 * @returns {UserModel}
 */
exports.getAllUserBySex = async (_sex) => {
  const users = await UserModel.find().where('sex').equals(_sex);
  return users;
};
