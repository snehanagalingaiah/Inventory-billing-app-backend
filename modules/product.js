const productModel1 = require('../model/product');
const mongoose = require('mongoose');

const fetchProduct = async (req, res) => { 
    const { id } = req.params;
    try {
        const product = await productModel1.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const getProductByUser = async (req, res) => {
    const {searchQuery} = req.query;
    try {
        const product = await productModel1.find({ creator: searchQuery });
        console.log("product", product)
        res.status(200).json({ data: product });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}
const createProduct = async (req, res) => {
    const product = req.body
    const newProduct = new productModel1(product)
    try {
        await newProduct.save()
        console.log("newProduct", newProduct)
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(409).json(error.message)
    }
}

const updateProduct = async (req, res) => {
    const { id: _id } = req.params
    const product = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No product with that id')

    const updatedProduct = await productModel1.findByIdAndUpdate(_id, {...product, _id}, { new: true})

    res.json(updatedProduct)
}


 const deleteProduct = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Product with that id')

    await productModel1.findByIdAndRemove(id)

    res.json({message: 'Product deleted successfully'})
}

module.exports = {
    fetchProduct,
    getProductByUser,
    createProduct,
    updateProduct,
    deleteProduct
  };