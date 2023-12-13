const { HttpException } = require("../exceptions/HttpException");
const Cart = require("../models/Cart")

//CREATE A CART
const createCartService = async (cartData) => {
    const newCart = new Cart(cartData)
    const createCart = await newCart.save();
    return createCart
}

//GET A CART
const getCartService = async (cartId) => {
    const cart = await Cart.findById(cartId)
    if (!cart) throw new HttpException(404, "There is no Cart with this cartId")
    return cart
}

//GET ALL CARTS
const getAllCartsService = async () => {
    const carts = await Cart.find()
    return carts
}

//UPDATE CART INFORMATION
const updateCartService = async (cartId, cartData) => {
    const cart = await Cart.findOne({ _id: cartId })
    if (!cart) throw new HttpException(403, "A cart with this cartId does not exist")

    const updatedCart = await Cart.findByIdAndUpdate(
        cartId,
        { $set: cartData },
        { new: true }
    )
    return updatedCart
}

//DELETE CART INFORMATION
const deleteCartService = async (cartId) => {
    const cart = await Cart.findOne({ _id: cartId })
    if(!cart) throw new HttpException(404, "A cart with this cartId does not exist")

    await Cart.findByIdAndDelete(cartId)
    return cart
}


module.exports = { createCartService, getCartService, getAllCartsService, updateCartService, deleteCartService }