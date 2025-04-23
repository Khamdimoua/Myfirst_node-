const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const categories = require("./category.model");


const SalesDetails = sequelize.define("Sales_details ", {

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
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

});

module.exports = SalesDetails;