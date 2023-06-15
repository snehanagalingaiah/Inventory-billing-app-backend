const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: {
        type : String,
        required: true,
    },
    productCode: {
        type : String,
        required: true,
    },
    price: {
        type : Number,
        required: true
    },
    userId: [String],
})

const Product = mongoose.model('Product', productSchema, 'product');
module.exports = Product;