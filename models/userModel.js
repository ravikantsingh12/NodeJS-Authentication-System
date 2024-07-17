import mongoose from 'mongoose';  // Importing mongoose for MongoDB interactions

// Defining the schema for the User model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true }, // Field for username, must be a string and required
  email: { type: String, required: true, unique: true }, // Field for email, must be a string, required, and unique
  password: { type: String, required: true }, // Field for password, must be a string and required

});

// Creating the User model based on the schema
const User = mongoose.model("User", userSchema);

export default User; // Exporting the User model

