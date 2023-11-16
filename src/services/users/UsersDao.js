import { UserModel } from "./models/users.js";

export class UsersDao {
  async createUser(user) {
    const newUser = new UserModel(user);
    await newUser.save();
    return newUser.toJSON();
  }

  async getAuthors() {
    return UserModel.find();
  }

}