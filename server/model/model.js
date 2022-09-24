const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    product_name : {
        type : String,
        required: true
    },
    price : {
        type: String,
        required: true
    },
    demand : String
})

const Productdb = mongoose.model('productdb', productSchema);

module.exports = Productdb;