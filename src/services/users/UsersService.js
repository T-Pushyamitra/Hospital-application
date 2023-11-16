import { getUTCDateNoTime } from "../../helpers/utils.js";

export class UsersService {
  constructor({ dao }) {
    this.dao = dao;
  }

  async createUser(user) {
    const errors = this.validateUser(user);
    if (errors && errors.length) {
      throw new Error(errors);
    }

    const dateOfBirth = user.date_of_birth 
      ? getUTCDateNoTime(new Date(user.dateOfBirth)) 
      : undefined ;
    
    const dateOfDeath = user.dateOfDeath
      ? getUTCDateNoTime(new Date(user.dateOfDeath))
      : undefined;
    
      return this.dao.createUser({ ...user, dateOfBirth, dateOfDeath });
  }

  async getUsers() {
    return this.dao.getUsers();
  }

  validateUser(user) {
    if (!user) {
      return ["user is required"];
    }

    if (!user.password){
      return ["password is required"];
    }

    const errors = [];

    if (!user.firstname || !user.lastname || !user.email || !user.phoneNumber) {
      errors.push("First name, Last name, Email, Phone Number are required");
    }

    return errors;
  }
}