import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import multer from "multer";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import getDiagnosis from "./openaiHandler.js";
import PDFDocument from 'pdfkit'; // Import PDFKit
import cors from "cors";
import path from "path"; // Import the 'path' module
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer'; // Import Nodemailer

const app = express();
const port = 5000;   // Backend Server at port 5000

const reactServerURL = 'http://localhost:3000'; // Replace with your actual React server URL

app.use(cors({
  origin: reactServerURL,
  credentials: true,
}));

// Middleware for parsing JSON data
app.use(bodyParser.json());
// Use cookie-parser middleware
app.use(cookieParser());

// MongoDB setup
mongoose
  .connect("mongodb://127.0.0.1:27017/Dermacare", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// User schema with 'Gender' added
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  dob: Date,
  gender: String, // Add 'gender' field
  profilePicture: String,
  uploadedImages: [String],
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
const jwtSecretKey = "we-can-do-it";

// Middleware to check if the user is authenticated
const checkAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, jwtSecretKey);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized." });
  }
};

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dermacareofficialmail@gmail.com', // Your email address
    pass: 'bkxq kzwo wocn xxvl', // Your email password or app-specific password
  },
});

// Registration API with local image storage
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

    // Save the uploaded profile picture file path
    const profilePicturePath = req.file ? req.file.path : "";

    // Create a new user in the DB
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      dob: new Date(dob),
      gender, // Include 'gender' in the user object
      profilePicture: profilePicturePath,
    });

    await newUser.save();

    // Generate a JWT token with user ID
    const token = jwt.sign({ userId: newUser._id }, jwtSecretKey, {
      expiresIn: "1h",
    });

    // Setting the token
    res.cookie("token", token, { httpOnly: true }); // Set the token as an httpOnly cookie

    // Send a welcome email to the user
    const mailOptions = {
      from: 'dermacareofficialmail@gmail.com', // Sender email address
      to: email, // User's email address
      subject: 'Welcome to Dermacare',
      text: `Dear ${username},\n\nWelcome to Dermacare! Thank you for registering with us. We hope you find our services helpful.\n\nBest regards,\nThe Dermacare Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    return res.status(201).json({ message: "Registration successful." });
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
        expiresIn: "1h",
      });

      // Set the token as a cookie
      res.cookie("token", token, { httpOnly: true });

      return res.status(200).json({ message: "Login successful." });
    } else {
      return res.status(401).json({ error: "Incorrect password." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error." });
  }
});

// Image Upload API
app.post("/api/upload", checkAuth, upload.single("image"), async (req, res) => {
  try {
    // Save the uploaded image file path to the user's profile
    const userId = req.userId; //(this userId is from middleware)
    const imagePath = req.file ? req.file.path : "";

    // Adding the uploaded image path to the user array to maintain history
    await User.findByIdAndUpdate(userId, {
      $push: { uploadedImages: imagePath },
    });

    return res.status(201).json({ message: "Image uploaded successfully." });
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
      "Key Points": responses[0].split('\n').slice(0, 5), // Get the first 5 points
      "Common Medicines": responses[1].split('\n').slice(0, 5), // Get the first 5 medicines
      "Preventive Measures": responses[2].split('\n').slice(0, 5), // Get the first 5 measures
      "Home Remedies": responses[3].split('\n').slice(0, 5), // Get the first 5 remedies
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
      "Key Points": responses[0].split('\n').slice(0, 5), // Get the first 5 points
      "Common Symptoms": responses[1].split('\n').slice(0, 5), // Get the first 5 symptoms
      "Causes and Risk Factors": responses[2].split('\n').slice(0, 5), // Get the first 5 causes
      "Treatment Options": responses[3].split('\n').slice(0, 5), // Get the first 5 treatment options
      "Research Findings": responses[4].split('\n').slice(0, 5), // Get the first 5 research findings
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
app.get('/api/generate-pdf', checkAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const diseaseName = req.query.disease; // Get the disease name from the query parameter

    // Retrieve user profile from DB
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Use the getDiagnosis API to fetch 5 medicines to cure the disease
    const medicinesPrompt = `Provide 5 medicines to cure ${diseaseName}. just 5 names no need of 1 2 3 s.no and just name no description`;
    const medicinesResponse = await getDiagnosis(medicinesPrompt);

    // Use the getDiagnosis API to fetch 5 key points about the disease
    const pointsPrompt = `Provide 5 key points about ${diseaseName}. just 5 points no numbering required and description`;
    const pointsResponse = await getDiagnosis(pointsPrompt);

    // Ensure that both responses are valid
    if (!medicinesResponse || !pointsResponse) {
      return res.status(500).json({ error: 'Invalid diagnosis response.' });
    }

    // Create a new PDF document
    const doc = new PDFDocument();

    // Get the directory path of the current module
    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    // Modify the path to the logo image
    const logoPath = path.join(__dirname, 'logo.png'); // Replace 'Backendlogo.png' with your logo file name

    // Pipe the PDF document to the response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=user_diagnosis_${diseaseName}.pdf`);
    doc.pipe(res);

    // Add a professional title with logo and bold heading
    const logoWidth = 200; // Adjust the logo width as needed
    const pageWidth = doc.page.width;
    const xPosition = (pageWidth - logoWidth) / 2;

    doc.image(logoPath, xPosition, 20, { width: logoWidth }); // Place the logo at the top-center
    
    // User Information Section
    doc.fontSize(16).fillColor('#333333').text('User Information', { underline: true });
    doc.fontSize(12).fillColor('#333333').text(`Name: ${user.username}`);
    doc.fontSize(12).fillColor('#333333').text(`Age: ${calculateAge(user.dob)}`);
    doc.fontSize(12).fillColor('#333333').text(`Gender: ${user.gender}`);
    doc.fontSize(12).fillColor('#333333').text(`Email: ${user.email}`);

    // Add the last uploaded image by the user
    if (user.uploadedImages.length > 0) {
      const lastImage = user.uploadedImages[user.uploadedImages.length - 1];
      const imagePath = path.join(__dirname, lastImage);
      const imageWidth = 200; // Set the image width
      const xImagePosition = (pageWidth - imageWidth) / 2; // Center-align the image

      doc.moveDown(1); // Add some space before the image
      doc.image(imagePath, xImagePosition, doc.y, { width: imageWidth }); // Display the image
      doc.moveDown(0.5); // Add some space after the image
    }

    // Diagnosis Section - Key Points
    doc.fontSize(16).fillColor('#333333').text('Diagnosis - Key Points', { underline: true });
    // Add the key points about the disease from the API response
    doc.fontSize(12).fillColor('#333333').text(pointsResponse);

    // Medicines Suggestion Section
    doc.moveDown(0.5); // Add some space between sections
    doc.fontSize(16).fillColor('#333333').text('Medicines Suggestion', { underline: true });
    // Split the medicines response into lines and use them as medicine suggestions
    const medicines = medicinesResponse.split('\n').slice(0, 5);
    medicines.forEach((medicine, index) => {
      doc.fontSize(12).fillColor('#333333').text(`${medicine}`);
    });

    // Copyright Section
    doc.moveDown(0.5); // Add some space before the copyright notice
    doc.fontSize(8).fillColor('#333333').text('© 2023 DermaCare. All rights reserved.', { align: 'center' });

    // Generate a PDF file and get its buffer
    const pdfBuffer = await new Promise((resolve, reject) => {
      const buffers = [];
      doc.on('data', (buffer) => buffers.push(buffer));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.end();
    });

    // Send the PDF as an email attachment to the user's Gmail address
    const mailOptions = {
      from: 'dermacareofficialmail@gmail.com', // Sender email address
      to: user.email, // User's email address
      subject: 'Your Dermacare Diagnosis Report',
      text: `Dear ${user.username},\n\nPlease find attached your Dermacare diagnosis report for ${diseaseName}.\n\nBest regards,\nThe Dermacare Team`,
      attachments: [
        {
          filename: `user_diagnosis_${diseaseName}.pdf`,
          content: pdfBuffer, // Attach the PDF buffer
        },
      ],
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to send email.' });
      } else {
        console.log('Email sent: ' + info.response);
        // Send a success response to the client
        return res.status(200).json({ message: 'Email sent successfully.' });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error.' });
  }
});

// Function to calculate age from date of birth
function calculateAge(dob) {
  const today = new Date();
  const birthDate = new Date(dob);
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1;
  }
  return age;
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
