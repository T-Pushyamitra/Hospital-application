require("dotenv").config();
const express = require("express");
import mongoose from "mongoose";
import * as bodyParser from "body-parser";
import usersRouter from "./services/users/UsersRouter.js";

import { apiPath } from "./helpers/constants.js";

export const runServer = async (port, mongoUri) => {
    if (!port) {
      process.exit(1);
    }
  
    // Db connection
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true
    });
  
    // Express Object
    const app = express();
  
    const server = app.listen(port, () => {
      console.log(`Application started. http://localhost:${port}/`);
    });
  
    app.use(bodyParser.json({ limit: "10mb" }));
    app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
  
    app.use(apiPath, usersRouter);
  
    app.use((error, req, res, next) => {
      res.status(error.status || 500);
  
      res.json({
        status: error.status,
        message: error.message
      });
    });
  
    return server;
  };