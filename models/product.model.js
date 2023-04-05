const mongoose = require('mongoose'); //model

const { model, Schema } = require('mongoose');

const productSchema = new Schema({
    name: String, //tipo propio de mongoose 'String'
    description: String,
    price: Number,
    department: String,
    available: Boolean,
    stock: Number
});

module.exports = model('product', productSchema);
//Aqui ponemso el nombre en singular mongoDB ya se encarga de saber q es el singular de los productos y que un producto tendra dicha composición