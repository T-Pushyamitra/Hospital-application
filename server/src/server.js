import mongoose from "mongoose";
import * as bodyParser from "body-parser";
import cookieParser from 'cookie-parser';

const express = require("express");
const cors = require('cors');
const morgan = require('morgan');

const { apiPath } = require("./helpers/constants");

// Import all the routes here
const userRoutes = require("./routes/user.router").default;
const authenticationRoutes = require("./routes/authentication.router").default;

require("dotenv").config();

export const runServer = async (port, mongoUri) => {
    if (!port) {
      process.exit(1);
    }
  
    // Express Object
    const app = express();
    
    const server = await mongoose.connect(mongoUri)
    .then(() => {
      console.log(`Database was connected successfully.`)
      return app.listen(port, () => {
        console.log(`Application started. http://localhost:${port}`);
        })  
    })
    .catch((error) => {
      console.log(`A Error occured while connecting to database.\nError: ${error.message}`);
    })

    // Allow all
    app.use(cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true, 
    }));
  
    app.use(cookieParser());

    app.use(bodyParser.json({ limit: "10mb" }));
    app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
  
    morgan.token('host', function(req, res) {
      return req.hostname;
    });

    // we are using the host parameter
    app.use(morgan(':method :host :status - :response-time ms'))

    // Pass all the routes here.
    app.use(`${apiPath}/user`, userRoutes);
    app.use(`${apiPath}/auth`, authenticationRoutes);
 
    return server;
  };