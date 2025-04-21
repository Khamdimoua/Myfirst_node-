const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const categories = require("./category.model");


const products = sequelize.define("products", {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,

    },

    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,

    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,

    },

});

module.exports = products;