import express from 'express';  // Importing express for the web framework
import { UserGetController, UserPostController } from '../controllers/controller.js';  // Importing controllers for GET and POST requests

const router = express.Router();  // Creating an instance of express Router for defining routes
const UserGetControllerInstance = new UserGetController();  // Creating an instance of UserGetController
const UserPostControllerInstance = new UserPostController();  // Creating an instance of UserPostController

// GET REQUESTS

// Route definitions for GET requests
router.get('/signup', UserGetControllerInstance.getSignUpPage);  // Route to render sign up page
router.get('/signin', UserGetControllerInstance.getSignInPage);  // Route to render sign in page
router.get('/homepage', UserGetControllerInstance.homePage);  // Route to render homepage
router.get('/signout', UserGetControllerInstance.logoutUser);  // Route to handle user logout
router.get('/forgot-password', UserGetControllerInstance.getForgotPassword);  // Route to render forgot password page
router.get('/change-password', UserGetControllerInstance.getChangePassword);  // Route to render change password page

// POST REQUESTS

// Route definitions for POST requests
router.post('/signup', UserPostControllerInstance.createUser);  // Route to handle user sign up
router.post('/signin', UserPostControllerInstance.signInUser);  // Route to handle user sign in
router.post('/forgot-password', UserPostControllerInstance.forgotPassword);  // Route to handle forgot password
router.post('/change-password', UserPostControllerInstance.changePassword);  // Route to handle change password

export default router;  // Exporting the router instance for use in other parts of the application
