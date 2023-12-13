const { HttpException } = require("../exceptions/HttpException")
const bcrypt = require("bcrypt")
const User = require("../models/User")
const { schema } = require("../middlewares/validationMiddleware")

//GET ALL USERS
const getAllUsersService = async () => {
    const users = await User.find()
    return users
}

//GET A USER
const getUserService = async (userId) => {
    const user = await User.findById(userId)
    if (!user) throw new HttpException(404, "This user does not Exist")
    return user
}

//UPDATE A USER
const updateUserService = async (userId, userData) => {
    const user = await User.findOne({ _id: userId })
    if(!user) throw new HttpException(404, "This user does not exist")
    if (userData.password) {
        if(!schema.validate(userData.password)) throw new HttpException(403, "Your Password is Invalid, it must contain uppercase letters, lowercase letters, no white spaces and at least 2 digits")
        const salt = await bcrypt.genSalt(10)
        userData.password = await bcrypt.hash(userData.password, salt)
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: userData },
            { new: true }
        );
        return updatedUser
    } else {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: userData },
            { new: true }
        );
        return updatedUser
    }
}

//DELETE A USER
const deleteUserService = async (userId) => {
    const user = await User.findOne({ _id: userId })
    if (!user) throw new HttpException(404, "This User does not Exist")
    
    await User.findByIdAndDelete(userId)
    return user
}


module.exports = { getAllUsersService, getUserService, updateUserService, deleteUserService }