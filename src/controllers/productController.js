const productService = require("../services/productServices.js")

//CREATE A product
const createProduct = async (req, res, next) => {
    try {
        const productData = req.body
        const createproductData = await productService.createProductService(productData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "Product has been successfully added",
            data: createproductData
        })
    } catch (err) {
        next(err)
    }
}

const getProduct = async (req, res, next) => {
    try {
        const productId = req.params.id
        const product = await productService.getProductService(productId)
        res.status(200).json(product)
    } catch (err) {
        next(err)
    }
}

const getAllProducts = async (req, res, next) => {
    try {
        const products = await productService.getAllProductsService()
        res.status(200).json(products)
    } catch (err) {
        next(err)
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const productId = req.params.id
        const productData = req.body
        const updatedproduct = await productService.updateProductService(productId, productData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "Product Information has been successfully Updated",
            data: updatedproduct
        })
    } catch (err) {
       next(err) 
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.id
        await productService.deleteProductService(productId)
        .then(() => {
            res.status(200).json({
                success: true,
                status: "OK",
                message: "Product Information has been Successfully Deleted"
            })
        }).catch(err => {
            res.status(500).json({
                success: false,
                status: 500,
                message: "Something went wrong!!!"
            })
        })
    } catch (err) {
        next(err)
    }
}

module.exports = { createProduct, getProduct, getAllProducts, updateProduct, deleteProduct }