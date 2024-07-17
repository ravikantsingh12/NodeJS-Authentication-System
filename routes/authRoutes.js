import passport from 'passport';  // Importing passport for authentication
import express from 'express';    // Importing express for the web framework
import { googleSignInController } from '../controllers/authController.js';  // Importing the Google sign-in controller
import dotenv from 'dotenv';      // Importing dotenv to load environment variables

dotenv.config();  // Loading environment variables from .env file

const authRouter = express.Router(); // Creating an instance of express Router for handling authentication routes
const googleSignIn = new googleSignInController(); // Creating an instance of GoogleSignInController

// OAuth2 login with Google
authRouter.get("/google", passport.authenticate('google', { scope: ['email', 'profile'] }));

// Google OAuth2 callback
authRouter.get("/google/callback",
    passport.authenticate("google", {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: "/login/failed"
    })
);

// Routes for handling login success and failure
authRouter.get("/login/success", googleSignIn.signInSuccess);
authRouter.get("/login/failed", googleSignIn.signInFailed);

export default authRouter; // Exporting the Auth Router
