import { User } from "../DB/userSchema.js";

async function imageHistory (req, res) {
    try {
      const userId = req.userId;
  
      // Retrieve the user's uploaded image history
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
  
      // Return the user's uploaded image paths
      return res.status(200).json({ uploadedImages: user.uploadedImages });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error." });
    }
  }

  export {imageHistory};