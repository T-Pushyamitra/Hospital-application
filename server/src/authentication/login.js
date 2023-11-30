// Ref: https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/
import {
  isPhoneNumberExsits,
  getUserByPhoneNumber,
} from "../services/user.service";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  try {

    // Login details through body
    const { phoneNumber, password } = req.body;

    // Check for errors in login credentials
    const errors = validateLogin(phoneNumber, password);

    if (errors) {
      logger.error(errors);
      return res.status(400).json({ error: errors });
    }

    // Get the user by phone number
    const user = await getUserByPhoneNumber(phoneNumber);

    // Create a jwt token
    const token = createToken(user._id, phoneNumber);
    
    logger.info(`Logged in successfully`);

    // Set the token as cookie
    res.cookie("token", token, {
      httpOnly: false,
      maxAge: process.env.TOKEN_AGE,
    });

    return res.status(200).json({
      message: `Logged in successfully`,
      data: {userId : user._id, userPhoneNumber: user.phoneNumber}
    });
  } catch (error) {
    logger.error(error.message);
    return res.status(400).json({ error: error.message });
  }
};

const createToken = (id, phoneNumber) => {
  const _token = jwt.sign(
    { user_id: id, user_phoneNumber: phoneNumber },
    process.env.TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );

  return _token;
};

const validateLogin = async (phoneNumber, password) => {
  if (!phoneNumber && !password) {
    return ["Required both Phone Number and password."];
  }

  if (!phoneNumber) {
    return ["Phone number is required."];
  }

  if (!password) {
    return ["Password is required."];
  }

  // Validate if user exist in our database
  const _isPhoneNumberExsits = await isPhoneNumberExsits(phoneNumber);

  if (!_isPhoneNumberExsits) {
    return [`User with ${_user.phoneNumber} doesn't exists. Please Sign up`];
  }

  // Password validation 
  const _isPasswordMatch = await bcrypt.compare(_user.password, user.password);

  if (!_isPasswordMatch) {
    return ["Provided password was incorrect. Please check it."];
  }
};
