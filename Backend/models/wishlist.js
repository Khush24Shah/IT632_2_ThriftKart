const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
          ref: "products"
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wishlist", WishlistSchema);