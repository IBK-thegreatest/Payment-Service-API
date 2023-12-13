const cartService = require("../services/cartServices.js")

//CREATE A CART
const createCart = async (req, res, next) => {
    try {
        const cartData = req.body
        const createCartData = await cartService.createCartService(cartData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "Product has been added to Cart",
            data: createCartData
        })
    } catch (err) {
        next(err)
    }
}

const getCart = async (req, res, next) => {
    try {
        const cartId = req.params.id
        const cart = await cartService.getCartService(cartId)
        res.status(200).json(cart)
    } catch (err) {
        next(err)
    }
}

const getAllCarts = async (req, res, next) => {
    try {
        const carts = await cartService.getAllCartsService()
        res.status(200).json(carts)
    } catch (err) {
        next(err)
    }
}

const updateCart = async (req, res, next) => {
    try {
        const cartId = req.params.id
        const cartData = req.body
        const updatedCart = await cartService.updateCartService(cartId, cartData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "Cart Information has been successfully Updated",
            data: updatedCart
        })
    } catch (err) {
       next(err) 
    }
}

const deleteCart = async (req, res, next) => {
    try {
        const cartId = req.params.id
        await cartService.deleteCartService(cartId)
        .then(() => {
            res.status(200).json({
                success: true,
                status: "OK",
                message: "Cart Information has been Successfully Deleted"
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

module.exports = { createCart, getCart, getAllCarts, updateCart, deleteCart }