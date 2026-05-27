const User = require("../models/User");

exports.addToCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.cart.push({
      productId: req.body.productId,
      quantity: 1
    });

    await user.save();

    res.json({
      message: "Added to cart",
      cart: user.cart
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.deleteFromCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.cart = user.cart.filter(
      item => item._id != req.params.id
    );

    await user.save();

    res.json({
      message: "Deleted from cart",
      cart: user.cart
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};