require("dotenv").config();
import mongoose from "mongoose";
import * as bodyParser from "body-parser";

const express = require("express");
const { apiPath } = require("./helpers/constants")

const user_routes = require("./routes/user.router")
const auth_routes = require("./auth/auth.routes")

export const runServer = async (port, mongoUri) => {
    if (!port) {
      process.exit(1);
    }
  
    // Db connection
    await mongoose.connect(mongoUri);
  
    // Express Object
    const app = express();
  
    const server = app.listen(port, () => {
      console.log(`Application started. http://localhost:${port}`);
    });
  
    app.use(bodyParser.json({ limit: "10mb" }));
    app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
  
    app.use(apiPath, user_routes);
    app.use(apiPath, auth_routes);
  
    app.use((error, req, res, next) => {
      res.status(error.status || 500);
  
      res.json({
        status: error.status,
        message: error.message
      });
    });
  
    return server;
  };