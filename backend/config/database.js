const mongoose = require("mongoose");
require("dotenv").config();
const dbConnectionString = process.env.DB_CONNECTION_STRING;

exports.dbconnect = () => {
    mongoose.connect(dbConnectionString , {
        useNewUrlParser: true,
        UseUnifiedTopology: true
    })
        .then(() => {
            console.log("Databse Connected successfully");
        })
        .catch((err) => {
            console.log("Error in connecting");
            console.log(err);
            process.exit(1);
        })
}