// Ref: https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/
import { getDateNoTime } from '../helpers/utils';
import { create } from '../daos/user.dao';
import { validateUser } from '../validators/user.validate';
import {
  isPhoneNumberExsits,
  getUserByPhoneNumber,
} from '../services/user.service';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const createUser = async (user) => {
  const errors = await validateUser(user);

  if (errors && errors.length) {
    throw new Error(errors);
  }

  user.dateOfBirth = user.date_of_birth
    ? getDateNoTime(new Date(user.dateOfBirth))
    : undefined;

  user.dateOfJoining = getDateNoTime(new Date());

  return create({ ...user });
};

exports.register = async (req, res) => {
  try {
    // Our register logic starts here
    // Get user input
    const _user = req.body;

    // Encrypt user password
    _user.password = await bcrypt.hash(_user.password, 10);

    _user.email = _user.email.toLowerCase();

    // Create user in our database
    const user = await createUser(_user);

    // Create token
    const token = jwt.sign(
      { user_id: user._id, user_phoneNumber: user.phoneNumber },
      process.env.TOKEN_KEY,
      {
        expiresIn: '2h',
      },
    );
    // save user token
    user.token = token;

    // return new user
    return res.status(201).json(user);
    // Our register logic ends here
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const _user = req.body;

    console.log(_user)

    // Validate user input
    if (!(_user.phoneNumber && _user.password)) {
      return res.status(400).send({error: 'All input is required'});
    }

    // Validate if user exist in our database
    const user = await getUserByPhoneNumber(_user.phoneNumber);

    const _isPhoneNumberExsits = await isPhoneNumberExsits(_user.phoneNumber);
    if (
      _isPhoneNumberExsits &&
      (await bcrypt.compare(_user.password, user.password))
    ) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, user_phoneNumber: _user.phoneNumber },
        process.env.TOKEN_KEY,
        {
          expiresIn: '2h',
        },
      );

      // save user token
      user.token = token;

      console.log("Logged in successfully");
      // user
      return res.status(200).json({ data: user});
    }
    console.log("Failed invalid credentials");
    return res.status(400).send({error: 'Invalid Credentials'});
  } catch (err) {
    console.log(err);
    return err;
  }
  // Our register logic ends here
};

exports.logout = async (req, res) => { };
