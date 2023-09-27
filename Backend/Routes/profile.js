import { User } from "../DB/userSchema.js";

async function getProfile (req, res){
    try {
      const userId = req.userId;
  
      // Retrieve user profile from DB
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
  
      // Return user profile data
      return res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error." });
    }
  }

  export {getProfile};