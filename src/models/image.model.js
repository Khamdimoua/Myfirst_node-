const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const categories = require("./category.model");


const images = sequelize.define("images ", {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    productId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },

});

module.exports = images;