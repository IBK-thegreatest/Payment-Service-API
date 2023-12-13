const { HttpException } = require("../exceptions/HttpException");
const Order = require("../models/Order")

//CREATE A ORDER
const createOrderService = async (orderData) => {
    const newOrder = new Order(orderData)
    const createOrder = await newOrder.save();
    return createOrder
}

//GET A ORDER
const getOrderService = async (orderId) => {
    const order = await Order.findById(orderId)
    if (!order) throw new HttpException(404, "There is no Order with this OrderId")
    return order
}

//GET ALL ORDERS
const getAllOrdersService = async () => {
    const orders = await Order.find()
    return orders
}

//UPDATE ORDER INFORMATION
const updateOrderService = async (orderId, orderData) => {
    const order = await order.findOne({ _id: orderId })
    if (!order) throw new HttpException(403, "A Order with this OrderId does not exist")

    const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { $set: orderData },
        { new: true }
    )
    return updatedOrder
}

//DELETE ORDER INFORMATION
const deleteOrderService = async (orderId) => {
    const order = await order.findOne({ _id: orderId })
    if(!order) throw new HttpException(404, "A Order with this OrderId does not exist")

    await order.findByIdAndDelete(orderId)
    return Order
}


module.exports = { createOrderService, getOrderService, getAllOrdersService, updateOrderService, deleteOrderService }