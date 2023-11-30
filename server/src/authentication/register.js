// Ref: https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/
import { isPhoneNumberExsits, isEmailExsits } from '../services/user.service';
import { create } from "../daos/user.dao";
// import { getRoleByName } from "../daos/role.dao";
import { getDateNoTime, titleCase } from "../helpers/utils";

const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const _user = req.body;

    const errors = await validateUser(_user);

    if (errors && errors.length) {
      throw new Error(errors);
    }

    // Title casing the first name and last name
    _user.firstName = titleCase(_user.firstName);
    _user.lastName = titleCase(_user.lastName);

    // Lower casing the email ids
    _user.email = _user.email.toLowerCase();

    // Encrypt user password
    _user.password = await bcrypt.hash(_user.password, 10);

    // Create date object for date of birth
    _user.dateOfBirth = getDateNoTime(new Date(_user.dateOfBirth))

    // Create date object for date of joining
    _user.dateOfJoining = getDateNoTime(new Date());

    // TODO: After creating the api calls for role schema revert the comment line on line 4 and 38.
     
    // If the user's role is not set by default set it as role 'USER'
    if (!_user.role) {
    //   const role = await getRoleByName("USER");
      _user.role = "USER";
    }

    // Created user
    const newUser =  await create({ ..._user });

    // return new user
    return res.status(201).json({ message: "Create a new user", data: newUser });

    // Our register logic ends here
  } catch (error) {
    return res.status(500).json({ error: [error.message] });
  }
};


const validateUser = async (user) => {
  if (!user) {
    return ['user is required'];
  }

  if (user.firstName.length > 15) {
    return [' First name should be of max char 15'];
  }

  if (user.lastName.length > 15) {
    return [' Last name should be of max char 15'];
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

  if (!user.firstName || !user.lastName || !user.email || !user.phoneNumber || !user.dateOfBirth || !user.sex) {
    errors.push('First name, Last name, Email, Phone Number, Date of birth and sex are required');
  }

  return errors;
};