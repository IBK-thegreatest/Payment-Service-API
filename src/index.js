const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const compression = require("compression")
const morgan = require("morgan")
const helmet = require("helmet")
const cors = require("cors")
const authRoutes = require("./routes/authRoutes.js")
const userRoutes = require("./routes/userRoutes.js")
const cartRoutes = require("./routes/cartRoutes.js")
const orderRoutes = require("./routes/orderRoutes.js")
const productRoutes = require("./routes/productRoutes.js")

dotenv.config();
mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true }
).then(() => {
    console.log("Database Connection Successful");
}).catch(err => {
    console.log(err);
})

const app = express()
app.use(express.json())
app.use(compression())
app.use(helmet())
app.use(morgan("dev"))
app.use(cors())
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/carts", cartRoutes)
app.use("/api/v1/products", productRoutes)
app.use("/api/v1/orders", orderRoutes)
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Backend Server is currently running on port ${PORT}`);
})