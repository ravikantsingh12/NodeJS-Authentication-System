import User from "../models/userModel.js"; // Importing the User model

// Controller class for handling Google Sign In
export  class googleSignInController {
 
    // Method to handle successful Google sign-in
    signInSuccess = async (req, res) => {
        // Extracting user data from the request object
        const userData =  req.user._json;
        const { email, name, sub } = userData;

        if (email) {
            // Attempting to find existing user in the database
            const user = await User.findOne({email:email});
            if (user) {
                // If user exists, set user's email in session and render homepage
                req.session.userEmail = email;
                return res.status(200).render("homepage"); // Render homepage view
            }
            // If user does not exist, create a new user in the database
            const newUser = new User({username:name, email:email, password:sub});
            await newUser.save();  // Saving the new user to the database
            // Set user's email in session and render homepage
            req.session.userEmail = email;
            return res.status(200).render("homepage");
        } else {
            // If email is not present in user data, return Not Authorized error
            res.status(403).json({ error: true, message: "Not Authorized" });
        }
    }

    // Method to handle failed Google sign-in attempts
    signInFailed = (req, res) => {
        res.status(401).json({
            error: true,
            message: "Log in failure",
        });
    }

}