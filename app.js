import express from "express"; // Importing express for the web framework
import bodyParser from "body-parser"; // Importing bodyParser for parsing request bodies
import ejsLayouts from "express-ejs-layouts"; // Importing express-ejs-layouts for layout support
import path from "path"; // Importing express-ejs-layouts for layout support
import dotenv from "dotenv"; // Importing dotenv to load environment variables
import session from "express-session"; // Importing express-session for session management
import passport from "passport"; // Importing passport for authentication
import { Strategy as GoogleStrategy } from "passport-google-oauth20"; // Importing Google OAuth 2.0 strategy for passport

import { connectUsingMongoose } from "./config/mongodb.js"; // Importing MongoDB connection function
import router from "./routes/routes.js"; // Importing main application routes
import authrouter from "./routes/authRoutes.js"; // Importing authentication routes

dotenv.config(); // Loading environment variables from .env file
const app = express(); // Initializing express application

//SESSION
app.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

//MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL:
        "http://localhost:3000/auth/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, callback) {
      callback(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Set Templates
app.set("view engine", "ejs"); // Define template engine
app.use(ejsLayouts); // Use base template
app.set("views", path.join(path.resolve(), "views")); // Define template directory

// DB Connection
connectUsingMongoose();

//ROUTES
app.get("/", (req, res) => {
  res.send("Hey Ninja ! Go to /user/signin for the login page.");
});
app.use("/user", router);
app.use("/auth", authrouter);
app.use(express.static("public"));

//LISTEN
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
