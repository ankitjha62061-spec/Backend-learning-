
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mydatabase");

    console.log("MongoDB Connected ");
  } catch (error) {
    console.error("MongoDB Error ", error);
  }
};

module.exports = connectDB;



