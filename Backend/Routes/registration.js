import { User } from "../DB/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../Middleware/Authentication.js";
import {cloudinary} from "../Configuration/cloudinary.js";
import { expirationInSeconds } from "../Utility/Constants.js";
import transporter from "../Configuration/transporter.js";


async function registerUser (req, res) {
    try {
      const { username, email, password, dob, gender } = req.body;
  
      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email is already registered." });
      }
  
      // Hash the user's password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Upload the profile picture to Cloudinary
      let profilePictureUrl = "";
      if (req.file) {
        const cloudinaryResponse = await cloudinary.uploader.upload(
          req.file.path
        );
        profilePictureUrl = cloudinaryResponse.secure_url;
      }
  
      // Create a new user in the DB with the Cloudinary image link
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        dob: new Date(dob),
        gender,
        profilePicture: profilePictureUrl, // Store the Cloudinary link
      });
  
      await newUser.save();
  
      // Generate a JWT token with user ID
      const token = jwt.sign({ userId: newUser._id }, jwtSecretKey, {
        expiresIn: expirationInSeconds,
      });
  
      // Send a comprehensive welcome email to the user
      const mailOptions = {
        from: `${process.env.OFFICIAL_MAIL}`,
        to: email,
        subject: "Welcome to Dermacare",
        text: `Dear ${username},\n\nWelcome to Dermacare! Thank you for registering with us. We are thrilled to have you join our skincare community.\n\nDermacare offers a wide range of features to support your skincare journey:\n\n1. Instant Skin Diagnosis: Our cutting-edge AI-driven technology analyzes your skin images within seconds to detect skin conditions accurately.\n2. Medication Suggestions: Receive personalized medication recommendations based on your diagnosis, helping you take better care of your skin.\n3. Search Any Disease: Explore our vast database to find accurate and high-quality information about various diseases and conditions.\n4. Expert Advice: Access a wealth of skincare articles and tips, authored by leading dermatologists and experts in the field.\n5. Community Engagement: Join our skincare community forums to connect with fellow enthusiasts, share experiences, and seek advice.\n6. Exclusive Discounts: Enjoy exclusive discounts and promotions on top-quality skincare products tailored to your skin's needs.\n7. Personalized Product Recommendations: Let us suggest the best skincare products for your unique skin type and concerns.\n\nWe are proud to offer skin diagnosis within seconds, utilizing advanced image processing techniques and AI to provide you with accurate results. Additionally, you can search for any disease or condition to access reliable and comprehensive information.\n\nIf you have any questions or need assistance, please don't hesitate to reach out. We're here to support you on your skincare journey.\n\nBest regards,\nThe Dermacare Team`,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
  
      return res
        .status(201)
        .json({ message: "Registration successful.", token, username });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error." });
    }
  }
  export {registerUser};