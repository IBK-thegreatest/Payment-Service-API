const express = require("express")
const { verifyUser, verifyAdmin, verifyToken } = require("../middlewares/authMiddleware")
const { createOrder, getOrder, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController")
const router = express.Router()

//CREATE AN ORDER
router.post("/", verifyToken, createOrder)

//GET ORDERS FOR A SPECIFIC USER
router.get("/find/:orderId", verifyUser, getOrder)

//GET ALL ORDERS
router.get("/", verifyAdmin, getAllOrders)

//UPDATE ORDER INFORMATION
router.put("/find/:orderId", verifyUser, updateOrder)

//DELETE CART INFORMATION
router.delete("/:userId/:orderId", verifyUser, deleteOrder)



module.exports = router