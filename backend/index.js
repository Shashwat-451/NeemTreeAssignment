const express = require("express");
const app = express();
const { dbconnect } = require("./config/database")
const fileUpload = require('express-fileupload');
const candidateRoutes = require("./routes/candidateRoutes")
const cors = require("cors");
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

app.use(express.json());
app.use(fileUpload());
app.use("/candidates", candidateRoutes);
dbconnect();

app.listen(4000, () => {
    console.log("Listening at 4000")
})