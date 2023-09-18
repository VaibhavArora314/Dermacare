import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import multer from 'multer';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import getDiagnosis from './openaiHandler.js';

const app = express();
const port = 3000;

// Middleware for parsing JSON data
app.use(bodyParser.json());
// Use cookie-parser middleware
app.use(cookieParser());

// MongoDB setup 
mongoose.connect('mongodb://127.0.0.1:27017/Dermacare', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

//User schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  dob: Date,
  profilePicture: String,
  uploadedImages: [String],
});

const User = mongoose.model('User', userSchema);

// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg');
  },
});

const upload = multer({ storage });

// JWT secret key 
const jwtSecretKey = 'we-can-do-it';

// Middleware to check if the user is authenticated
const checkAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, jwtSecretKey);
    req.userId = decoded.userId;
    next(); 
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }
};

// Registration API with local image storage
app.post('/api/register', upload.single('profilePicture'), async (req, res) => {
  try {
    const { username, email, password, dob } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered.' });
    }

    // Hash the user's password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save the uploaded profile picture file path
    const profilePicturePath = req.file ? req.file.path : '';

    // Create a new user in the DB
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      dob: new Date(dob),
      profilePicture: profilePicturePath,
    });

    await newUser.save();

    // Generate a JWT token with user ID
    const token = jwt.sign({ userId: newUser._id }, jwtSecretKey, {
      expiresIn: '1h', 
    });

    // Setting the token
    res.cookie('token', token, { httpOnly: true }); // Set the token as an httpOnly cookie

    return res.status(201).json({ message: 'Registration successful.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error.' });
  }
});

// User Login API with JWT token and cookie 
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If the user does not exist
    if (!user) {
      return res.status(400).json({ error: 'User not found.' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If passwords match Setting JWT token
    if (passwordMatch) {
      // Generate a JWT token with user ID
      const token = jwt.sign({ userId: user._id }, jwtSecretKey, {
        expiresIn: '1h',
      });

      // Set the token as a cookie
      res.cookie('token', token, { httpOnly: true }); 

      return res.status(200).json({ message: 'Login successful.' });
    } else {
      return res.status(401).json({ error: 'Incorrect password.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error.' });
  }
});

// Image Upload API
app.post('/api/upload', checkAuth, upload.single('image'), async (req, res) => {
  try {

    // Save the uploaded image file path to the user's profile
    const userId = req.userId; //(this userId is from middleware)
    const imagePath = req.file ? req.file.path : '';

    // Adding the uploaded image path to the user array to maintain history
    await User.findByIdAndUpdate(userId, { $push: { uploadedImages: imagePath } });

    return res.status(201).json({ message: 'Image uploaded successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error.' });
  }
});

// Diagnosis API
app.post('/api/diagnose', checkAuth, async (req, res) => {
  try {
    // Set a fixed prompt here
    // const prompt = "disease-name"; // You can replace "disease-name" with your desired prompt
    const prompt = "how to cure acne give me 2 points"; // we will paste the name of disease here come from our ai model

    // Call the getDiagnosis function
    const diagnosis = await getDiagnosis(prompt);

    // processing the diagnosis here
    console.log('Diagnosis:', diagnosis);

    // Return the diagnosis
    return res.status(200).json({ diagnosis });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error.' });
  }
});

// User Profile API
// User Profile API using checkAuth middleware to extract the user ID
app.get('/api/user/profile', checkAuth, async (req, res) => {
  try {
    const userId = req.userId; 

    // Retrieve user profile from DB
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Return user profile data
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error.' });
  }
});

// Image History API
// Image History API using checkAuth middleware to extract the user ID
app.get('/api/user/images', checkAuth, async (req, res) => {
  try {
    const userId = req.userId; 

    // Retrieve the user's uploaded image history
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Return the user's uploaded image paths
    return res.status(200).json({ uploadedImages: user.uploadedImages });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error.' });
  }
});

// Logout API
app.post('/api/logout', (req, res) => {
  // Clear the token cookie
  res.cookie('token', '', { expires: new Date(0), httpOnly: true });
  return res.status(200).json({ message: 'Logout successful.' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
