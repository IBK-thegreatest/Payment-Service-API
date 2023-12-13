const express = require("express")
const { verifyUser, verifyAdmin } = require("../middlewares/authMiddleware")
const { getUser, getAllusers, updateUser, deleteUser } = require("../controllers/userController")
const router = express.Router()

//GET A USER
router.get("/:id", verifyUser, getUser)

//GET ALL USERS
router.get("/", verifyAdmin, getAllusers)

//UPDATE USER INFORMATION
router.put("/:id", verifyUser, updateUser)

//DELETE USER INFORMATION
router.delete("/:id", verifyUser, deleteUser)


module.exports = router