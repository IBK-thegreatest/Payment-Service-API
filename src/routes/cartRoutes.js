const express = require("express")
const { verifyUser, verifyAdmin, verifyToken } = require("../middlewares/authMiddleware")
const { getCart, createCart, getAllCarts, updateCart, deleteCart } = require("../controllers/cartController")
const router = express.Router()

//CREATE A CART
router.post("/", verifyToken, createCart)

//GET CARTS BY A USER
router.get("/find/:userId", verifyUser, getCart)

//GET ALL CARTS
router.get("/", verifyAdmin, getAllCarts)

//UPDATE CART INFORMATION
router.put("/:userId/:cartId", verifyUser, updateCart)

//DELETE CART INFORMATION
router.delete("/:userId/:cartId", verifyUser, deleteCart)



module.exports = router