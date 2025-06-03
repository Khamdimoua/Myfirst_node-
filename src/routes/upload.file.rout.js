const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Ensure uploads folder exists
const uploadFolder = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true });
}

// Set up multer storage config
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadFolder);
//     },
//     filename: (req, file, cb) => {
//         const timestamp = new Date().toISOString().replace(/:/g, "-");
//         const uniqueName = `${timestamp}-${file.originalname}`;
//         cb(null, uniqueName);
//     },
// });

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Save to 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename with timestamp
    }
});

// Initialize multer
const upload = multer({ storage });

// ✅ Single File Upload (field name: 'file')
router.post("/upload-single-file", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
    }

    res.status(200).json({
        message: "File uploaded successfully.",
        file: req.file.filename,
    });
});

// ✅ Multiple Files Upload (field name: 'files')
router.post("/upload-multi-file", upload.array("files", 10), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No files uploaded." });
    }

    const uploadedFiles = req.files.map(file => file.filename);

    res.status(200).json({
        message: "Files uploaded successfully.",
        files: uploadedFiles,
    });
});

module.exports = router;