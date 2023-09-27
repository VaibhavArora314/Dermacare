// userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  dob: Date,
  gender: String,
  profilePicture: String,
  uploadedImages: [
    {
      imageUrl: String,
      diseaseName: String,
      diseaseInfoPrompt: String,
      medicinesPrompt: String,
    },
  ],
});

// Create and export the User model based on the userSchema
const User = mongoose.model("User", userSchema);
export {User};
