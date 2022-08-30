const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        UserId: {type:String, required: true, unique: true},
        products: [
            {
                productId: {
                    type: String
                },
                quantity:{
                    type: String,
                    default: 1
                }
            }
        ],
        amount: {type: Number, required: true},
        address: {type: Object, required: true},
        status: {type: String, default: "pending"}
    }
);

const Order = mongoose.model("Order", orderSchema)

module.exports = Order