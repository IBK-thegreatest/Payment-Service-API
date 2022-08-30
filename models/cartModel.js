const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
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
        ]
    }
);

const Cart = mongoose.model("Cart", cartSchema)

module.exports = Cart