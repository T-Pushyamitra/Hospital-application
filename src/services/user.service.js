
import { getDateNoTime } from "../helpers/utils";
import { index, create, update, getUserByPhoneNumber  } from '../daos/user.dao';

exports.getUsers = async () => {
  try{
    return index();
  }
  catch (error){
    throw error
  }
}

exports.createUser = async (user) => {
  const errors = validateUser(user, create=true);
  
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

exports.updateUser = async (id, user) => {
  const errors = validateUser(user);
  
  if (errors && errors.length) {
    throw new Error(errors);
  }

  user.dateOfBirth = user.date_of_birth 
    ? getDateNoTime(new Date(user.dateOfBirth)) 
    : undefined ;
  
    return update(id, user);
}

exports.getUserByPhoneNumber = (phoneNumber) => {
  return getUserByPhoneNumber(phoneNumber);
}

exports.isPhoneNumberExsits = (phoneNumber) => {
  return getUserByPhoneNumber(phoneNumber)? true: false;
}

function validateUser(user, create=false){
  
  if (!user) {
    return ["user is required"];
  }
  
  if (user.firstName.length > 10){
    return [" First name should be of max char 10"]
  }

  if (user.lastName.length > 10){
    return [" Last name should be of max char 10"]
  }

  if (!user.password){
    return ["password is required"];
  }

  if (create && getUserByPhoneNumber(user.phoneNumber)){
    return [`Phone Number '${user.phoneNumber}' already exists.`]
  }
  
  const errors = [];
  
  if (!user.firstName || !user.lastName || !user.email || !user.phoneNumber) {
    errors.push("First name, Last name, Email, Phone Number are required");
  }
  
  return errors;
}

