const router = require("express").Router();
const User = require("../models/userModel.js");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER A NEW ACCOUNT ACCOUNT OR USER
//The crypto JS encryption algorithm was used to encode the password
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.CRYPTOJS_SECRET_PASSPHRASE
        ).toString()
    });
    try {
        savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json(err)
    }
});

//LOGIN TO AN EXISTING ACCOUNT
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(401).json("Wrong Credentials");
        
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.CRYPTOJS_SECRET_PASSPHRASE
        );
        const password = hashedPassword.toString(CryptoJS.enc.Utf8)
        password !== req.body.password && res.status(401).json("Wrong Credentials");

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        },
        process.env.JWT_SECRET_KEY,
        {expiresIn: "3d"})
        
        res.status(200).json({id:user._id, isAdmin: user.isAdmin, accessToken});
    } catch (err) {
        res.status(500).json(err)
    }
});


module.exports = router;