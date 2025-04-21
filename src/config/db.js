const { Sequelize } = require("sequelize");
require("dotenv").config();


const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.USER,
    process.env.PASSWORD, {
        dialect: "mysql",
        host: process.env.HOST,
        timezone: "+07:00",
        dialectOptions: {
            // Your mysql2 options here
        },
    }
);

sequelize
    .authenticate()
    .then(async() => {
        await sequelize.sync();
        console.log("Database has been connected");
    })
    .catch((error) => {
        console.error("Unable to connect database:", error);
    });

module.exports = sequelize;