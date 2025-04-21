const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");


const Users = sequelize.define(

    "users", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,

        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,

        },
    }

)

module.exports = Users;

// select * from users where id = 1
// user.find({id: 1})