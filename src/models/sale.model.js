const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const categories = require("./category.model");


const Sales = sequelize.define("Sales ", {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

});

module.exports = Sales;