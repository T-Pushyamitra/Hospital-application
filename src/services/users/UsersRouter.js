import { Router } from "express";
const asyncHandler = require("express-async-handler");

export default class UsersRouter {
  constructor({ service }) {
    this.router = Router();
    this.service = service;

    this.router.get("/users/", asyncHandler(this.getUsers.bind(this)));
    this.router.post("/users/", asyncHandler(this.createUser.bind(this)));
  }

  async getUsers(req, res) {
    const users = await this.service.getUsers();
    return res.status(200).json({ users });
  }

  async createUser(req, res) {
    const { user } = req.body;

    const newUser = await this.service.createUser(user);
    return res.status(200).json({ user: newUser });
  }
}

