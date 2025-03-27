import mongoose from "mongoose";

const wishlistSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    products: [{
          type: mongoose.Schema.ObjectId,
          ref: "product",
          required: true,
      }],
  },
  {
    timestamps: true,
  }
);

export const wishlist = mongoose.model("wishlist", wishlistSchema);
