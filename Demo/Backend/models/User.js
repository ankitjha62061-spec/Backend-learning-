const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  // cart: [
  //   {
  //     productId: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Product"
  //     },
  //     quantity: {
  //       type: Number,
  //       default: 1
  //     }
  //   }
  // ]
});

module.exports = mongoose.model("User", userSchema);