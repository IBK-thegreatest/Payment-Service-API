const { HttpException } = require("../exceptions/HttpException")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const { schema, emailValidator } = require("../middlewares/validationMiddleware")

//REGISTER A USER
const registerService = async (userData) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(userData.password, salt)
    //Checking if the user already exists in the database
    const ifAlreadyExists = await User.findOne({ username: userData.username })
    if (ifAlreadyExists) throw new HttpException(409, "This User already exists")

    const data = {
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        isAdmin: userData.isAdmin
    }
    if (!emailValidator.validate(userData.email)) {
        throw new HttpException(403, "Invalid Email Address, Put your Email Address in the form foo@bar.com")
    } else if (!schema.validate(userData.password)) {
        throw new HttpException(403, "Invalid Password, Password must contain an uppercase letter, lowercase letter, no white spaces and at least 2 digits")
    } else {
        const newUser = new User(data)
        const createUser = await newUser.save();
        return createUser
    }
}

//LOGIN A USER
const loginService = async (userData) => {
    const user = await User.findOne({ email: userData.email })
    if (!user) throw new HttpException(404, "User Not Found!!!")

    const isPasswordCorrect = await bcrypt.compare(userData.password, user.password)
    if(!isPasswordCorrect) throw new HttpException(401, "Username and Password don't match")

    const dataStoredInToken = {
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin
    }
    const accessToken = jwt.sign(dataStoredInToken, process.env.JWT_SEC, {expiresIn: "30d"})
    const userInfo = {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        token: accessToken
    }
    return userInfo
}


module.exports = { registerService, loginService }