const User = require("../models/User");

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.body.productId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

  
    user.cart.push({
      productId: productId,
      quantity: 1
    });

    await user.save();

    res.json({
      message: "Product added to cart",
      cart: user.cart
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

