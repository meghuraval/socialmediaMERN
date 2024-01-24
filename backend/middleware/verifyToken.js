const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Missing token" });
  }

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, "secretkeytest");

    // Attach the decoded token to the request for future use
    req.decodedToken = decodedToken;

    next(); // Token is valid, proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};

module.exports = verifyToken;
