const Product = require("../models/Product");

exports.addProduct = async (req, res) => {

  try {
      const product =
      await Product.create(req.body);
     res.status(201).json(product);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};
exports.getProducts = async (req, res) => {

  try {

    const products =
      await Product.find();

    res.json({
      products,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

exports.deleteProduct = async (req, res) => {

  try {

    await Product.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Deleted Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

exports.updateProduct = async (req, res) => {

  try {

    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updatedProduct);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};