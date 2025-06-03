// middleware/index.js

const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Check if token exists
    if (!authHeader) {
        return res.status(403).json({ message: "No token provided." });
    }

    // Format: Bearer <token> — we extract the actual token
    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(403).json({ message: "Token is missing." });
    }

    // Verify token
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized token." });
        }

        // Attach user info to request
        req.user = decoded;
        next();
    });
};

module.exports = { verifyToken };