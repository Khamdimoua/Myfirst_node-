const Users = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.create = async(req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        Users.create({...req.body, password: hashPassword }).then((user) => {
            res.status(200).send(user);
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};

exports.login = async(req, res) => {
    try {
        Users.findOne({
            where: { userName: req.body.userName },
        }).then(async(user) => {
            if (user) {
                const validPassword = await bcrypt.compare(
                    req.body.password,
                    user.password
                );

                if (!validPassword) {
                    return res
                        .status(401)
                        .send({ message: "Invalid username or password" });
                }

                const payload = {
                    id: user.id,
                    userName: user.userName,
                };
                const token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: "30 day",
                });
                res
                    .status(200)
                    .send({ id: user.id, userName: user.userName, token: token });
            } else {
                res.status(401).send({ message: "Invalid username or password" });
            }
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};

exports.getAll = async(req, res) => {
    try {
        Users.findAndCountAll().then((users) => {
            res.status(200).send(users);
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};

exports.getOne = async(req, res) => {
    try {
        Users.findOne({ where: { id: req.params.id } }).then(async(user) => {
            if (user) {
                res.status(200).send(user);
            } else {
                res.status(404).send({ message: "User not found" });
            }
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};

exports.update = async(req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        Users.update({...req.body, password: hashPassword }, { where: { id: req.params.id } }).then((_) => {
            Users.findOne({ where: { id: req.params.id } }).then((user) => {
                res.status(200).send(user);
            });
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};

exports.delete = async(req, res) => {
    try {
        Users.destroy({ where: { id: req.params.id } }).then((_) => {
            res.status(200).send({ message: "User has been deleted" });
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};