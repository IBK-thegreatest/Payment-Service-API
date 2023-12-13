const { HttpException } = require("../exceptions/HttpException");
const Product = require("../models/Product")

//CREATE A PRODUCT
const createProductService = async (productData) => {
    const newProduct = new Product(productData)
    const createProduct = await newProduct.save();
    return createProduct
}

//GET A PRODUCT
const getProductService = async (productId) => {
    const product = await Product.findById(productId)
    if (!product) throw new HttpException(404, "There is no Product with this ProductId")
    return product
}

//GET ALL PRODUCTS
const getAllProductsService = async () => {
    const products = await Product.find()
    return products
}

//UPDATE PRODUCT INFORMATION
const updateProductService = async (productId, productData) => {
    const product = await Product.findOne({ _id: productId })
    if (!product) throw new HttpException(403, "A Product with this ProductId does not exist")

    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { $set: productData },
        { new: true }
    )
    return updatedProduct
}

//DELETE PRODUCT INFORMATION
const deleteProductService = async (productId) => {
    const product = await Product.findOne({ _id: productId })
    if(!product) throw new HttpException(404, "A Product with this ProductId does not exist")

    await product.findByIdAndDelete(productId)
    return product
}


module.exports = { createProductService, getProductService, getAllProductsService, updateProductService, deleteProductService }