import { User } from "../DB/userSchema.js";
import {cloudinary} from "../Configuration/cloudinary.js";
import getDiagnosis from "../openaiHandler.js";
import { calculateAge } from "../Utility/calculateAge.js";

async function uploadImage (req, res) {
    try {
      // Save the uploaded image file path to the user's profile
      const userId = req.userId;
  
      // console.log(req.file, req.body);
  
      const imagePath = req.file ? req.file.path : "";
      let user = await User.findById(userId);
  
      const diseaseName = req.body.diseaseName;
      
      // Upload the image to Cloudinary
      let cloudinaryResponse = null;
      if (req.file) {
        cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);
      }
  
      // Check if the image was successfully uploaded to Cloudinary
      if (cloudinaryResponse && cloudinaryResponse.secure_url) {
        // Create an object with image URL and disease name
        const diseaseInfoPrompt = `Provide detailed information about ${diseaseName} to a person having age ${calculateAge(
          user.dob
        )}`;
        const diseaseInfoResponse = await getDiagnosis(diseaseInfoPrompt);
  
        // Use the getDiagnosis API to fetch 5 medicines to cure the disease
        const medicinesPrompt = `Provide 5 medicines to cure ${diseaseName} to a person having age ${calculateAge(
          user.dob
        )}. Just the name nothing else`;
        const medicinesResponse = await getDiagnosis(medicinesPrompt);
  
        const uploadedImage = {
          imageUrl: cloudinaryResponse.secure_url,
          diseaseName: diseaseName,
          diseaseInfoPrompt: diseaseInfoResponse,
          medicinesPrompt: medicinesResponse,
        };
  
        // Add the image object to the user's uploadedImages array
        user = await User.findByIdAndUpdate(userId, {
          $push: { uploadedImages: uploadedImage },
        });
  
        return res.status(201).json({
          message: "Image uploaded successfully.",
          imageUrl: cloudinaryResponse.secure_url,
          index: user.uploadedImages.length,
        });
      } else {
        // If the image upload to Cloudinary failed, return an error response
        return res
          .status(500)
          .json({ error: "Failed to upload image to Cloudinary." });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error." });
    }
  }

  export {uploadImage};