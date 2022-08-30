const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes.js");
const authRoutes = require("./routes/auth.js")
const productRoutes = require("./routes/productRoutes")
const orderRoutes = require("./routes/orderRoutes")
const cartRoutes = require("./routes/cartRoutes")

dotenv.config();

mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true },
    (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Database Connection Successful")
        }
    }
);

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth/", authRoutes);
app.use("/api/products/", productRoutes);
app.use("/api/orders/", orderRoutes);
app.use("/api/carts/", cartRoutes);


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Backend Server is currently running on port ${port}`)
});