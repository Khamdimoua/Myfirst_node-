const Categories = require("../models/category.model");

exports.create = async(req, res) => {
    try {
        Categories.create({...req.body }).then((categories) => {
            res.status(200).send(categories);
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};


exports.getAll = async(req, res) => {
    try {
        Categories.findAndCountAll().then((categories) => {
            res.status(200).send(categories);
        });
    } catch (error) {
        res.status(500).send({
            messageq: error.message,
        });
    }
};


exports.getOne = async(req, res) => {
    try {
        Categories.findOne({
            where: { id: req.params.id },
        }).then(async(categories) => {
            if (categories) {
                res.status(200).send(categories);
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
        Categories.update({...req.body }, { where: { id: req.params.id } }).then((_) => {
            Categories.findOne({
                where: { id: req.params.id },
            }).then((categories) => {
                res.status(200).send(categories);
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
        Categories.destroy({ where: { id: req.params.id } }).then((_) => {
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