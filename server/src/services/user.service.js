import { getDateNoTime } from '../helpers/utils';
import {
  index,
  update,
  isPhoneNumberExsits,
  isEmailExsits,
  getUserByPhoneNumber,
} from '../daos/user.dao';
import { validateUser } from '../validators/user.validate';
import { getRoleById } from '../daos/role.dao';

import { getDateNoTime } from "../helpers/utils";
import { index, create, update, getUserByPhoneNumber, isPhoneNumberExsits, isEmailExsits  } from '../daos/user.dao';
/**
 * Get all the users.
 *
 * @returns {UserModel}
 */
exports.getUsers = async () => index();

/**
 * Check if the user is found by phone number..
 *
 * @param {string} phoneNumber
 * @returns {boolean}
 */
exports.isPhoneNumberExsits = async (phoneNumber) =>
  isPhoneNumberExsits(phoneNumber);

/**
 * Check if the user is found by email.
 *
 * @param {string} email
 * @returns
 */
exports.isEmailExsits = async (email) => isEmailExsits(email);

/**
 * Update the user by id.
 *
 * @param {string} id
 * @param {UserModel} user
 * @returns {UserModel}
 */
exports.updateUser = async (id, user) => {
  // Check if any errors are in requested body. And throw error.
  const errors = validateUser(user);

  if (errors && errors.length) {
    throw new Error(errors);
  }

  // Convert passed date of birth.
  user.dateOfBirth = user.date_of_birth
    ? getDateNoTime(new Date(user.dateOfBirth))
    : undefined;
  return update(id, user);
};

/**
 * Get the user by phone number.
 *
 * @param {string} phoneNumber
 * @returns {UserModel}
 */
exports.getUserByPhoneNumber = (phoneNumber) =>
  getUserByPhoneNumber(phoneNumber);

/**
 * Get all the users by the role id.
 *
 * @param {string} roleId
 * @returns {UserModel}
 */
exports.getUsersByRoleId = async (roleId) => {
  const role = await getRoleById(roleId);

  if (!role) {
    throw new Error(['Role was not found']);
  }

  const users = index({ role: role._id });
  return users;
};
