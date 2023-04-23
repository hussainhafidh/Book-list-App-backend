
const { timeStamp } = require('console');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    isbn:{
        type: String,
        required: true
    },
    author: {
        type: String
    }
    // description: {
    //     type: String
    // }
   
})

module.exports = mongoose.model("products", productSchema);