const userService = require("../services/userServices.js")

//GET ALL USERS
const getAllusers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsersService()
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}

const getUser = async (req, res, next) => {
    try {
        const userId = req.params.id
        const user = await userService.getUserService(userId)
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id
        const userData = req.body
        const updatedUser = await userService.updateUserService(userId, userData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "User Information has been successfully Updated",
            data: updatedUser
        })
    } catch (err) {
        next(err)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id
        await userService.deleteUserService(userId)
            .then(() => {
                res.status(200).json({
                    success: true,
                    status: "OK",
                    message: "User Information has been Successfully Deleted"
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


module.exports = { getUser, getAllusers, updateUser, deleteUser }