// We reuse this import in order to have access to the `body` property in requests
const express = require("express");

// ℹ️ Responsible for the messages you see in the terminal as requests are coming in
// https://www.npmjs.com/package/morgan
const logger = require("morgan");

// ℹ️ Needed when we deal with cookies (we will when dealing with authentication)
// https://www.npmjs.com/package/cookie-parser
const cookieParser = require("cookie-parser");

// ℹ️ Needed to accept from requests from 'the outside'. CORS stands for cross origin resource sharing
// unless the request if from the same domain, by default express wont accept POST requests
const cors = require("cors");
const session = require("express-session");
const helmet = require("helmet");
// Middleware configuration
module.exports = (app) => {
  // Because this is a server that will accept requests from outside and it will be hosted ona server with a `proxy`, express needs to know that it should trust that setting.
  // Services like heroku use something called a proxy and you need to add this to your server
  app.set("trust proxy", 1);

  // controls a very specific header to pass headers from the frontend
  // app.use(
  //   session({
  //     secret: process.env.SESS_SECRET,
  //     resave: true,
  //     saveUninitialized: false,
  //     cookie: {
  //       sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  //       secure: process.env.NODE_ENV === "production",
  //       httpOnly: true,
  //       maxAge: 600000, // 60 * 1000 ms * 10 === 10 min
  //     },
  //   })
  // );

  app.use(
    cors({
      credentials: true,
      origin: process.env.ORIGIN || "http://localhost:3000",
    })
  );

  app.use(helmet());
  app.use('/uploads', express.static("uploads"));
  // In development environment the app logs
  app.use(logger("dev"));

  // To have access to `body` property in the request
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
