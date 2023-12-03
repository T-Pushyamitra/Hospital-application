require("dotenv").config();
import mongoose from "mongoose";
import * as bodyParser from "body-parser";

const express = require("express");
const usersRouter = require("./routes/user.router")
const { apiPath } = require("./helpers/constants")
const cors = require('cors');

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
  

    // Allow all
    app.use(cors());


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