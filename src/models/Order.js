const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        products: [
            {
                productId: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],
        amount: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        status: {
            type: String,
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model("Order", OrderSchema)


module.exports = Order