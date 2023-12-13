const orderService = require("../services/orderServices.js")

//CREATE A Order
const createOrder = async (req, res, next) => {
    try {
        const orderData = req.body
        const createOrderData = await orderService.createOrderService(orderData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "Order has been successfully added",
            data: createOrderData
        })
    } catch (err) {
        next(err)
    }
}

const getOrder = async (req, res, next) => {
    try {
        const userId = req.params.userId
        const orderId = req.params.orderId
        const order = await orderService.getOrderService(orderId)
        res.status(200).json(order)
    } catch (err) {
        next(err)
    }
}

const getAllOrders = async (req, res, next) => {
    try {
        const orders = await orderService.getAllOrdersService()
        res.status(200).json(orders)
    } catch (err) {
        next(err)
    }
}

const updateOrder = async (req, res, next) => {
    try {
        const orderId = req.params.id
        const orderData = req.body
        const updatedOrder = await orderService.updateOrderService(orderId, orderData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "Order Information has been successfully Updated",
            data: updatedOrder
        })
    } catch (err) {
       next(err) 
    }
}

const deleteOrder = async (req, res, next) => {
    try {
        const orderId = req.params.id
        await orderService.deleteOrderService(orderId)
        .then(() => {
            res.status(200).json({
                success: true,
                status: "OK",
                message: "Order Information has been Successfully Deleted"
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

module.exports = { createOrder, getOrder, getAllOrders, updateOrder, deleteOrder }