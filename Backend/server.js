import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import multer from "multer";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import getDiagnosis from "./openaiHandler.js";
import PDFDocument from "pdfkit"; // Import PDFKit
import cors from "cors";
import path from "path"; // Import the 'path' module
import { fileURLToPath } from "url";
import nodemailer from "nodemailer"; // Import Nodemailer
import cloudinary from "cloudinary"; // Import Cloudinary
import fs from "fs";
import { downloadImage } from "./image_extraction.js";
import axios from "axios";

const app = express();
const port = `${process.env.BACKEND_SERVER}`; // Backend Server at port 5000

const reactServerURL = `${process.env.REACT_SERVER_URL}`; // Replace with your actual React server URL

const expiresInDays = 30; // Set the expiration time to 30 days
const expirationInSeconds = expiresInDays * 24 * 60 * 60; // Convert days to seconds

app.use(
  cors({
    origin: reactServerURL,
    credentials: true,
  })
);

// Middleware for parsing JSON data
app.use(bodyParser.json());
// Use cookie-parser middleware
app.use(cookieParser());

// MongoDB setup
mongoose
  .connect(`${process.env.MONGO_DB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Cloudinary configuration
cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
  api_key: `${process.env.CLOUDINARY_API_KEY}`,
  api_secret: `${process.env.CLOUDINARY_API_SECRET}`,
});

// User schema with 'Gender' added
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  dob: Date,
  gender: String,
  profilePicture: String,
  uploadedImages: [
    {
      imageUrl: String, // Store the image URL
      diseaseName: String, // Store the disease name
      diseaseInfoPrompt: String,
      medicinesPrompt: String,
    },
  ],
});
const User = mongoose.model("User", userSchema);

// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});

const upload = multer({ storage });

// JWT secret key
const jwtSecretKey = `${process.env.JWT_SECRET_KEY}`;

// Middleware to check if the user is authenticated
const checkAuth = (req, res, next) => {
  const token = req.headers.token;
  // console.log(token);

  if (!token) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized." });
  }
};

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.OFFICIAL_MAIL}`, // Your email address
    pass: `${process.env.OFFICIAL_MAIL_PASS_KEY}`, // Your email password or app-specific password
  },
});

// Send a welcome email to the user
app.post("/api/register", upload.single("profilePicture"), async (req, res) => {
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
});

// User Login API with JWT token and cookie
app.post("/api/login", async (req, res) => {
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

// Update the /api/upload endpoint
app.post("/api/upload", checkAuth, upload.single("image"), async (req, res) => {
  try {
    // Save the uploaded image file path to the user's profile
    const userId = req.userId;

    // console.log(req.file, req.body);

    const imagePath = req.file ? req.file.path : "";
    let user = await User.findById(userId);

    // const diseaseNames = ["acne", "vitilgo", "psorasis", "eczema", "atopic"];
    // // const diseaseName = "ml-model"; // Get the disease name from the model

    // // Generate a random index between 0 and the length of the array
    // const randomIndex = Math.floor(Math.random() * diseaseNames.length);

    // // Get the random disease name
    // const diseaseName = diseaseNames[randomIndex];
    const diseaseName = req.body.diseaseName;

    // let diseaseName = "Error predicting disease";

    // try {
    //   const formData = new FormData();
    //   formData.append("image", req.file); // Ensure req.file contains the image file

    //   const res = await axios.post("http://127.0.0.1:7000/predict", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data", // Set the correct content type
    //     },
    //   });

    //   console.log("Success", res.data);

    //   if (res.data.prediction) {
    //     diseaseName = res.data.prediction;
    //   }
    // } catch (error) {
    //   console.log("Error", error);
    // }

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
});

// Diagnosis API
app.post("/api/diagnose", checkAuth, async (req, res) => {
  try {
    // List of prompts to send to the diagnosis model
    const disease = "acne";

    const prompts = [
      `Provide 5 key points about ${disease}.`,
      `List 5 medicines commonly used to treat ${disease}.`,
      `Outline 5 preventive measures against ${disease}.`,
      `Share 5 effective home remedies for ${disease}.`,
    ];

    // Array to store the responses
    const responses = [];

    // Call the getDiagnosis function for each prompt
    for (const prompt of prompts) {
      const diagnosis = await getDiagnosis(prompt);
      responses.push(diagnosis);
      console.log(diagnosis);
    }

    // Response object with the collected responses
    const response = {
      "Key Points": responses[0].split("\n").slice(0, 5), // Get the first 5 points
      "Common Medicines": responses[1].split("\n").slice(0, 5), // Get the first 5 medicines
      "Preventive Measures": responses[2].split("\n").slice(0, 5), // Get the first 5 measures
      "Home Remedies": responses[3].split("\n").slice(0, 5), // Get the first 5 remedies
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error." });
  }
});

// User Profile API
app.get("/api/user/profile", checkAuth, async (req, res) => {
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
});

// Image History API
app.get("/api/user/images", checkAuth, async (req, res) => {
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
});

// Search Any disease
app.get("/api/search-disease", checkAuth, async (req, res) => {
  try {
    // Get the disease name from the query parameters
    const disease = req.query.disease;

    // List of prompts for disease information search
    const prompts = [
      `Provide 5 key points about ${disease}.`,
      `List 5 common symptoms of ${disease}.`,
      `Describe the causes and risk factors of ${disease}.`,
      `Explain the available treatment options for ${disease}.`,
      `Share any recent research findings related to ${disease}.`,
    ];

    // Array to store the responses
    const responses = [];

    // Call the getDiagnosis function for each prompt
    for (const prompt of prompts) {
      const diseaseInfo = await getDiagnosis(prompt);
      responses.push(diseaseInfo);
      console.log(diseaseInfo);
    }

    // Response object with the collected disease information
    const response = {
      "Key Points": responses[0].split("\n").slice(0, 5), // Get the first 5 points
      "Common Symptoms": responses[1].split("\n").slice(0, 5), // Get the first 5 symptoms
      "Causes and Risk Factors": responses[2].split("\n").slice(0, 5), // Get the first 5 causes
      "Treatment Options": responses[3].split("\n").slice(0, 5), // Get the first 5 treatment options
      "Research Findings": responses[4].split("\n").slice(0, 5), // Get the first 5 research findings
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error." });
  }
});

// Logout API
app.post("/api/logout", (req, res) => {
  // Clear the token cookie
  res.cookie("token", "", { expires: new Date(0), httpOnly: true });
  return res.status(200).json({ message: "Logout successful." });
});

// Endpoint to generate a PDF containing user diagnosis and send it to the user's Gmail

app.get("/api/generate-pdf", checkAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const index = req.query.index; // Get the disease name from the query parameter
    const needEmail = req.query.needEmail;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (!user.username) {
      return res
        .status(400)
        .json({ error: "Username not found in user profile." });
    }

    const diseaseName = user.uploadedImages[index].diseaseName;
    const imageUrl = user.uploadedImages[index].imageUrl;
    const diseaseInfoResponse = user.uploadedImages[index].diseaseInfoPrompt;
    const medicinesResponse = user.uploadedImages[index].medicinesPrompt;
    // console.log(diseaseInfoResponse);
    // console.log(medicinesResponse);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Ensure that both responses are valid
    if (!diseaseInfoResponse || !medicinesResponse) {
      return res.status(500).json({ error: "Invalid diagnosis response." });
    }

    // Create a new PDF document
    const doc = new PDFDocument();

    // Get the directory path of the current module
    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    // Modify the path to the logo image (replace 'logo.png' with your logo file name)
    const logoPath = path.join(__dirname, "logo.png"); // Replace 'logo.png' with the actual filename

    let validFile = false,
      downloadedImagePath;
    if (imageUrl) {
      try {
        const downloadImageName = await downloadImage(imageUrl);
        downloadedImagePath = path.join(__dirname, downloadImageName);

        fs.accessSync(downloadedImagePath, fs.constants.F_OK);
        validFile = true;
        console.log("Valid Path!");
      } catch (error) {
        console.log(error);
      }
    }

    // PDF Generation
    // Pipe the PDF document to the response

    // Add a professional title with logo and bold heading
    const logoWidth = 200; // Adjust the logo width as needed
    const pageWidth = doc.page.width;
    const xPosition = (pageWidth - logoWidth) / 2;

    doc.image(logoPath, xPosition, 20, { width: logoWidth }); // Place the logo at the top-center

    // User Information Section
    doc
      .fontSize(16)
      .fillColor("#333333")
      .text("User Information", { underline: true });
    doc.fontSize(12).fillColor("#333333").text(`Name: ${user.username}`);
    doc
      .fontSize(12)
      .fillColor("#333333")
      .text(`Age: ${calculateAge(user.dob)}`);
    doc.fontSize(12).fillColor("#333333").text(`Gender: ${user.gender}`);
    doc.fontSize(12).fillColor("#333333").text(`Email: ${user.email}`);

    const imageWidth = 200; // Set the image width
    const xImagePosition = (pageWidth - imageWidth) / 2; // Center-align the image

    if (validFile) {
      doc.moveDown(1); // Add some space before the image

      // Display the locally saved image in the PDF
      doc.image(downloadedImagePath, xImagePosition, doc.y, {
        width: imageWidth,
      });

      doc.moveDown(1);
      console.log("File attached");
    }

    doc
      .fontSize(16)
      .fillColor("#333333")
      .text(`Diagnosis - ${diseaseName} Information`, { underline: true });
    // Add the detailed information about the disease from the API response
    doc.fontSize(12).fillColor("#333333").text(diseaseInfoResponse);

    // Medicines Suggestion Section
    doc.moveDown(0.5); // Add some space between sections
    doc
      .fontSize(16)
      .fillColor("#333333")
      .text("Medicines Suggestion", { underline: true });
    // Split the medicines response into lines and use them as medicine suggestions
    const medicines = medicinesResponse.split("\n").slice(0, 5);
    doc
      .fontSize(12)
      .fillColor("#333333")
      .text("Here are 5 medicines that can help with this condition:");
    medicines.forEach((medicine, index) => {
      doc.fontSize(12).fillColor("#333333").text(`${medicine}`);
    });

    // Recommendations Section
    doc.moveDown(0.5); // Add some space between sections
    doc
      .fontSize(16)
      .fillColor("#333333")
      .text("Recommendations", { underline: true });
    // Add personalized recommendations or advice for the user here
    doc
      .fontSize(12)
      .fillColor("#333333")
      .text("Based on your diagnosis, we recommend the following:");
    doc
      .fontSize(12)
      .fillColor("#333333")
      .text("- Maintain a healthy skincare routine.");
    doc
      .fontSize(12)
      .fillColor("#333333")
      .text("- Use sunscreen to protect your skin from UV rays.");
    doc
      .fontSize(12)
      .fillColor("#333333")
      .text("- Consult a dermatologist for further evaluation.");

    // Additional Information Section
    doc.moveDown(0.5); // Add some space between sections
    doc
      .fontSize(16)
      .fillColor("#333333")
      .text("Additional Information", { underline: true });
    // Add any additional information or resources related to the disease here
    doc
      .fontSize(12)
      .fillColor("#333333")
      .text(
        "For more information and resources on this condition, you can visit our website or consult with our dermatologists."
      );

    // Copyright Section
    doc.moveDown(0.5); // Add some space before the copyright notice
    doc
      .fontSize(8)
      .fillColor("#333333")
      .text("© 2023 DermaCare. All rights reserved.", { align: "center" });

    // doc.end();

    // res.setHeader("Content-Type", "application/pdf");
    // res.setHeader(
    //   "Content-Disposition",
    //   `attachment; filename=user_diagnosis_${diseaseName}.pdf`
    // );
    // // res.pipe(doc);
    // doc.pipe(res);

    // Generate a PDF file and get its buffer
    const pdfBuffer = await new Promise((resolve, reject) => {
      const buffers = [];
      doc.on("data", (buffer) => buffers.push(buffer));
      doc.on("end", () => resolve(Buffer.concat(buffers)));
      doc.end();
    });

    // Send the PDF as an email attachment to the user's Gmail address
    if (needEmail) {
      const mailOptions = {
        from: `${process.env.OFFICIAL_MAIL}`, // Sender email address
        to: user.email, // User's email address
        subject: `Your Dermacare Diagnosis Report for ${diseaseName}`,
        text: `Dear ${user.username},\n\nPlease find attached your Dermacare diagnosis report for ${diseaseName}. This report contains detailed information about the condition, a list of recommended medicines, and personalized skincare advice.\n\nBest regards,\nThe Dermacare Team`,
        attachments: [
          {
            filename: `user_diagnosis_${diseaseName}.pdf`,
            content: pdfBuffer,
          },
        ],
      };

      // Send the email with the PDF attachment
      await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: "Email sending error." });
        } else {
          console.log("Email sent: " + info.response);
          return res.status(200).json({
            message: "PDF generated and sent successfully.",
            // pdf: pdfBuffer.toString("base64"),
            // diseaseName,
            // imageUrl,
            // diseaseInfoResponse,
            // medicinesResponse,
          });
        }
      });
    } else {
      return res.status(200).json({
        message: "PDF generated and sent successfully.",
        pdf: pdfBuffer.toString("base64"),
        diseaseName,
        imageUrl,
        diseaseInfoResponse,
        medicinesResponse,
      });
    }
  } catch (error) {
    console.error("Error generating PDF and sending email:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// Function to calculate age from date of birth
function calculateAge(dob) {
  const today = new Date();
  const birthDate = new Date(dob);
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    return age - 1;
  }
  return age;
}

app.get("/api/team", async (req, res) => {
  const team = process.env.DEVS.split(" ");

  return res.status(200).json({
    team,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});