const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }
    // Check if this product is already in the user's cart
    const existingItem = await Cart.findOne({ userId, productId });

    if (existingItem) {
      // Update quantity instead of creating a duplicate
      existingItem.quantity += quantity || 1;
      await existingItem.save();
      return res.json({
        message: "Cart quantity updated",
        cart: existingItem
      });
    }


   
    const cartItem = await Cart.create({
      userId,
      productId,
      quantity: quantity || 1
    });

    res.status(201).json({
      message: "Added to cart",
      cart: cartItem
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
``

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cartItems = await Cart.find({ userId }).populate("productId", "name price image");

    res.json({ cart: cartItems });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.deleteFromCart = async (req, res) => {
  try {
    const deleted = await Cart.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json({ message: "Deleted from cart" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};