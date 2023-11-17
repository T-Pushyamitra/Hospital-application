// Ref: https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/
import { getDateNoTime } from "../helpers/utils";
import { create  } from '../daos/user.dao';

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { isPhoneNumberExsits, getUserByPhoneNumber } = require("../services/user.service")

const createUser = async (user) => {
  const errors = validateUser(user);
  
  if (errors && errors.length) {
    throw new Error(errors);
  }

  user.dateOfBirth = user.date_of_birth 
    ? getDateNoTime(new Date(user.dateOfBirth)) 
    : undefined ;
  
  user.dateOfJoining = getDateNoTime(new Date());

  user.role = 'Patient';
  return create({ ...user});
}

function validateUser(user){
  
  if (!user) {
    return ["user is required"];
  }
  
  if (user.firstName.length > 15){
    return [" First name should be of max char 10"]
  }

  if (user.lastName.length > 15){
    return [" Last name should be of max char 10"]
  }

  if (!user.password){
    return ["password is required"];
  }

  if (isPhoneNumberExsits(user.phoneNumber)){
    return [`Phone Number '${user.phoneNumber}' already exists.`]
  }
  
  const errors = [];
  
  if (!user.firstName || !user.lastName || !user.email || !user.phoneNumber) {
    errors.push("First name, Last name, Email, Phone Number are required");
  }
  
  return errors;
}

exports.register = async (req, res) => {

    // Our register logic starts here
      // Get user input
      const _user = req.body;
      
  
      //Encrypt user password
      _user.password = await bcrypt.hash(_user.password, 10);

      _user.email = _user.email.toLowerCase();


      // Create user in our database
      const user = await createUser(_user);
      console.log(user);

  
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
      console.log(user.token);
  
      // return new user
      return res.status(201).json(user);
    // Our register logic ends here
  };
  


exports.login = async (req, res) => {

    // Our login logic starts here
    try {
      // Get user input
      const _user = req.body;
  
      // Validate user input
      if (!(_user.phoneNumber && _user.password)) {
        return res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await getUserByPhoneNumber(_user.phoneNumber);

      if (isPhoneNumberExsits(_user.phoneNumber) && (await bcrypt.compare(_user.password, user.password))) {
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
        return res.status(200).json(user);
      }
      return res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
      return err;
    }
    // Our register logic ends here
  };