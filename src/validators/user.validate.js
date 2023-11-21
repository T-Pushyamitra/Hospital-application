import { isPhoneNumberExsits, isEmailExsits } from '../services/user.service';

exports.validateUser = async (user) => {
  if (!user) {
    return ['user is required'];
  }

  if (user.firstName.length > 15) {
    return [' First name should be of max char 10'];
  }

  if (user.lastName.length > 15) {
    return [' Last name should be of max char 10'];
  }

  if (!user.password) {
    return ['password is required'];
  }

  const _isPhoneNumberExsits = await isPhoneNumberExsits(user.phoneNumber);

  if (_isPhoneNumberExsits) {
    return [`Phone Number '${user.phoneNumber}' already exists.`];
  }

  const _isEmailExsits = await isEmailExsits(user.email);

  if (_isEmailExsits) {
    return [`Email '${user.email}' already exists.`];
  }

  const errors = [];

  if (!user.firstName || !user.lastName || !user.email || !user.phoneNumber) {
    errors.push('First name, Last name, Email, Phone Number are required');
  }

  return errors;
};
