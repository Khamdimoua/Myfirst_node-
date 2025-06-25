const db = require("../models");
const Image = db.image;
const fs = require("fs");
const path = require("path");

// Create and Save a new Image
exports.create = async(req, res) => {
    try {
        if (!req.file || !req.file.filename) {
            return res.status(400).send({
                message: "No file uploaded or filename is missing!"
            });
        }

        const image = {
            filename: req.file.filename,
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
            path: req.file.path,
            alt_text: req.body.alt_text || null, // ✅ จาก req.body
            description: req.body.description || null,
            category: req.body.category || null,
            uploaded_by: req.body.uploaded_by || null
        };

        const data = await Image.create(image);
        res.status(201).send({
            message: "Image created successfully!",
            data: data
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Image."
        });
    }
};

// Retrieve all Images from the database
exports.findAll = async(req, res) => {
    try {
        const category = req.query.category;
        const condition = category ? {
            category: {
                [db.Sequelize.Op.like]: `%${category}%`
            }
        } : null;

        const data = await Image.findAll({
            where: condition,
            order: [
                ['createdAt', 'DESC']
            ]
        });

        res.status(200).send({
            message: "Images retrieved successfully!",
            data: data
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving images."
        });
    }
};

// Find a single Image with an id
exports.findOne = async(req, res) => {
    try {
        const id = req.params.id;

        const data = await Image.findByPk(id);
        if (data) {
            res.status(200).send({
                message: "Image retrieved successfully!",
                data: data
            });
        } else {
            res.status(404).send({
                message: `Cannot find Image with id=${id}.`
            });
        }
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving Image with id=" + req.params.id
        });
    }
};

// Update an Image by the id in the request
exports.update = async(req, res) => {
    try {
        const id = req.params.id;

        const [num] = await Image.update(req.body, {
            where: { id: id }
        });

        if (num == 1) {
            res.status(200).send({
                message: "Image was updated successfully."
            });
        } else {
            res.status(404).send({
                message: `Cannot update Image with id=${id}. Maybe Image was not found or req.body is empty!`
            });
        }
    } catch (err) {
        res.status(500).send({
            message: "Error updating Image with id=" + req.params.id
        });
    }
};

// Delete an Image with the specified id in the request
exports.delete = async(req, res) => {
    try {
        const id = req.params.id;

        // First, find the image to get file path
        const image = await Image.findByPk(id);
        if (!image) {
            return res.status(404).send({
                message: `Cannot find Image with id=${id}.`
            });
        }

        // Delete the physical file
        const filePath = path.join(__dirname, "../../uploads", image.filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // Delete from database
        const num = await Image.destroy({
            where: { id: id }
        });

        if (num == 1) {
            res.status(200).send({
                message: "Image was deleted successfully!"
            });
        } else {
            res.status(404).send({
                message: `Cannot delete Image with id=${id}. Maybe Image was not found!`
            });
        }
    } catch (err) {
        res.status(500).send({
            message: "Could not delete Image with id=" + req.params.id
        });
    }
};