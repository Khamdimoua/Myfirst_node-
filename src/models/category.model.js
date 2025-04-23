const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");


const categories = sequelize.define("categories", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        categoryName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,

        },


    }

)

module.exports = categories;