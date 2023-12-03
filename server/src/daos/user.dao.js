const UserModel = require("../models/user.model")


const _isUserExists = async (_id) => {
  return await UserModel.findOne().where('_id').equals(_id);
}

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
  return user_count > 0;
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
        return user_count > 0;
      };

// get all the users
exports.index = async () => {
  return UserModel.find();
}


// Create a new user
exports.create = async (user) => {
  const newUser = new UserModel(user);
  await newUser.save();
  return newUser;
}

exports.getUserById = async (_id) => {
  if (!_isUserExists(_id)){
    throw new Error(`User with ID: ${id} not found.`)
  }
  const user = await UserModel.findOne().where('_id').equals(_id);
  return user;
}

exports.update = async (_id, _user) => {
  if (!_isUserExists(_id)){
    return new Error([`Cannot find any user with id ${_id}`])
  }
  await UserModel.findByIdAndUpdate(_id, _user);

  const user = UserModel.findById(_id);
  return user
} 

exports.getUserByPhoneNumber = async (_phoneNumber) => {
  const user = await UserModel.findOne().where('phoneNumber').equals(_phoneNumber);
  return user;
}

exports.getAllUserBySex = async (_sex) => {
  const users = await UserModel.find().where('sex').equals(_sex);
  return users;
}