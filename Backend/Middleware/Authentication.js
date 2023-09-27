
import jwt from "jsonwebtoken";
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

export {checkAuth,jwtSecretKey};