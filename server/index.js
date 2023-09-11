const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("dotenv").config();
// import mongo model class schema for user
// NOTE: user model should be imported before being referenced by passport instance
// make sure import of user model comes before import of passport.js
require("./models/user");
// import passport.js code
require("./services/passport");

// connect to mongoDB
mongoose.connect(process.env.MONGO_URI);

// Get the connection object
const db = mongoose.connection;

// Bind to the 'error' event to get notified of connection errors
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Bind to the 'connected' event to get notified when connection is established
db.once("connected", () => {
  console.log("Successfully connected to MongoDB");
});

// Bind to the 'disconnected' event to get notified when disconnected
db.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

const app = express();

// middleware for cookie-session
app.use(
  cookieSession({
    // set duration of cookie milliseconds
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // encrypt cookie
    keys: [process.env.COOKIE_KEY]
  })
);

// set passport to use cookies
app.use(passport.initialize());
app.use(passport.session());

// calling function from auth_routes.js and passing app as argument
require("./routes/auth_routes")(app);

// test route
app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

// stopped on video 34. Nodemon Setup

// allow for hosting / deployment on third party platforms
const PORT = process.env.PORT || 5000;

app.listen(PORT);
