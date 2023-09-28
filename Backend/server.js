import express from "express";
import multer from "multer";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import cloudinary from "cloudinary"; // Import Cloudinary
import { loginUser } from "./Routes/login.js";
import { uploadImage } from "./Routes/upload.js";
import { checkAuth } from "./Middleware/Authentication.js";
import { diagnosis } from "./Routes/diagnoses.js";
import { getProfile } from "./Routes/profile.js";
import { imageHistory } from "./Routes/imageHistory.js";
import { searchDisease } from "./Routes/searchDisease.js";
import { logout } from "./Routes/logout.js";
import { generatePdf } from "./Routes/generatePdf.js";
import { registerUser } from "./Routes/registration.js";
import connectToMongoDB from "./DB/Mongo_Connection.js";
import { teams } from "./Routes/teams.js";

const app = express();
const port = `${process.env.BACKEND_SERVER}`; // Backend Server at port 5000

const reactServerURL = `${process.env.REACT_SERVER_URL}`; // Replace with your actual React server URL

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

//conecting to MongoDB
connectToMongoDB();

// Cloudinary configuration
cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
  api_key: `${process.env.CLOUDINARY_API_KEY}`,
  api_secret: `${process.env.CLOUDINARY_API_SECRET}`,
});

// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});

const upload = multer({ storage });
// Send a welcome email to the user
app.post("/api/register", upload.single("profilePicture"), registerUser);

// User Login API with JWT token and cookie
app.post("/api/login",loginUser);

// Update the /api/upload endpoint
app.post("/api/upload", checkAuth, upload.single("image"), uploadImage);

app.post("/api/diagnose", checkAuth, diagnosis);

// User Profile API
app.get("/api/user/profile", checkAuth, getProfile);

// Image History API
app.get("/api/user/images", checkAuth, imageHistory);

// Search Any disease
app.get("/api/search-disease", searchDisease);

// Logout API
app.post("/api/logout", logout);

// Endpoint to generate a PDF containing user diagnosis and send it to the user's Gmail
app.get("/api/generate-pdf", checkAuth,generatePdf);

//teams api
app.get("/api/team", teams);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});