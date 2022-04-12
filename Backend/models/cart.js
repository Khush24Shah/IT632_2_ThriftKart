const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
          ref: "products"
        },
        qty: {
          type: Number,
          default: 1,
        },
        price:{
          type: Number,
          required: [true, "product price must be provided"],
        },
        name: {
          type: String,
          required: [true, "product name must be provided"],
        },
      },
     
    ],
    bill: {
      type: Number,
      required: true,
      default: 0
  }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);