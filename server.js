const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

require("dotenv").config()

mongoose.connect(process.env.mongodb_URI).then(() => {
   
    console.log("db is connected");
    app.use(require("./index.js"))
    app.listen(5000, () => {
        console.log(`port running on 5000`)
    })
}).catch((err) => {
    console.log(err);
})

