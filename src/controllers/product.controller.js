const Products = require("../models/product.model");

exports.create = async(req, res) => {
    try {
        Products.create({...req.body }).then((product) => {
            res.status(200).send(product);
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};


exports.getAll = async(req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;

        if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
            return res.status(400).json({ message: 'Invalid pagination parameters' });
        }

        const offset = (page - 1) * limit;

        const products = await Products.findAndCountAll({
            offset,
            limit
        });

        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};



exports.getOne = async(req, res) => {
    try {
        Products.findOne({
            where: { id: req.params.id },
        }).then(async(products) => {
            if (products) {
                res.status(200).send(products);
            } else {
                res.status(404).send({
                    message: "Category not found",
                });
            }
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};

exports.updated = async(req, res) => {
    try {
        Products.update({...req.body }, { where: { id: req.params.id } }).then((_) => {
            Products.findOne({
                where: { id: req.params.id },
            }).then((products) => {
                res.status(200).send(products);
            });
        });
    } catch (error) {
        res.status(500).send({
            message: "error to updated",
        });
    }
};

exports.delete = async(req, res) => {
    try {
        Products.destroy({ where: { id: req.params.id } }).then((_) => {
            res.status(200).send({
                message: "Category deleted",
            });
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};