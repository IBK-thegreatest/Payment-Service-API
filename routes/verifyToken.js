const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(
            token,
            process.env.JWT_SECRET_KEY,
            (err, user) => {
                if (err) {
                    res.status(403).json("Your Token is not Valid")
                }
                req.user = user
                next();
            }
        )
    } else {
        res.status(401).json("You are not Authenticated")
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not Authorized to do this")
        }
    });
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not Authorized to do this")
        }
    });
}

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin }