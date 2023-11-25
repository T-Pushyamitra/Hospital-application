// Ref: https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/
import { getDateNoTime } from "../helpers/utils";
import { create } from "../daos/user.dao";
import { validateUser } from "../validators/user.validate";
import {
  isPhoneNumberExsits,
  getUserByPhoneNumber,
} from "../services/user.service";
import { logger } from "../helpers/logger";
import { validateLogin } from "../validators/login.validate";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
        expiresIn: "2h",
      }
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

    const errors = validateLogin(_user);

    if (errors) {
      return res(400).json({ error: errors });
    }

    // Validate if user exist in our database
    const user = await getUserByPhoneNumber(_user.phoneNumber);

    const _isPhoneNumberExsits = await isPhoneNumberExsits(_user.phoneNumber);

    if (!_isPhoneNumberExsits) {
      return res(400).json({
        error: `User with ${_user.phoneNumber} doesn't exists. Please Sign up`,
      });
    }

    if (await bcrypt.compare(_user.password, user.password)) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, user_phoneNumber: _user.phoneNumber },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      logger.info(
        `User ${user.firstName} ${user.lastName} logged in successfully`
      );
      return res
        .status(200)
        .json({
          message: `Logged in as ${user.firstName} ${user.lastName}`,
          data: user,
        });
    }

    logger.error("Password was incorrect");
    return res.status(400).json({ error: "Enter password was incorrect." });
  } catch (error) {
    logger.error(error.message);
    return res.status(400).json({ error: error.message });
  }
};

exports.logout = async (req, res) => {};
