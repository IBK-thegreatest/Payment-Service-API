const authService = require("../services/authServices.js")
//REGISTER A USER
const register = async (req, res, next) => {
    try {
        const userData = req.body
        const registerData = await authService.registerService(userData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "User has been Successfully registered",
            data: registerData
        })
    } catch (err) {
        next(err)
    }
}

//LOGIN A USER
const login = async (req, res, next) => {
    try {
        const userData = req.body
        const { id, username, email, isAdmin, token } = await authService.loginService(userData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "You are now logged in",
            id: id,
            username: username,
            email: email,
            isAdmin: isAdmin,
            token: token
        })
    } catch (err) {
        next(err)
    }
}


module.exports = { register, login }