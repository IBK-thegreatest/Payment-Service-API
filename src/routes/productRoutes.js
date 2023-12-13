const express = require("express")
const { verifyToken, verifyAdmin } = require("../middlewares/authMiddleware")
const { createProduct, getProduct, getAllProducts, updateProduct, deleteProduct } = require("../controllers/productController")
const router = express.Router()

//CREATE A PRODUCT
router.post("/", verifyAdmin, createProduct)

//GET A PRODUCT
router.get("/:id", verifyToken, getProduct)

//GET ALL PRODUCTS
router.get("/", verifyToken, getAllProducts)

//UPDATE PRODUCT INFORMATION
router.put("/:id", verifyAdmin, updateProduct)

//DELETE PRODUCT INFORMATION
router.delete("/:id", verifyAdmin, deleteProduct)



module.exports = router