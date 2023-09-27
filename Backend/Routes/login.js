import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../Middleware/Authentication";
import { expirationInSeconds } from "../Utility/Constants";
import User from "../DB/userSchema";

const loginRouter = express.Router();

loginRouter.post("/api/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      // If the user does not exist
      if (!user) {
        return res.status(400).json({ error: "User not found." });
      }
  
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      // If passwords match Setting JWT token
      if (passwordMatch) {
        // Generate a JWT token with user ID
        const token = jwt.sign({ userId: user._id }, jwtSecretKey, {
          expiresIn: expirationInSeconds,
        });
  
        return res
          .status(200)
          .json({ message: "Login successful.", token, username: user.username });
      } else {
        return res.status(401).json({ error: "Incorrect password." });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error." });
    }
  });

  export {loginRouter};
  