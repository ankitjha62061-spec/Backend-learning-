const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes =
  require("./routes/userRouter");

const productRoutes =
  require("./routes/productRoutes");

const app = express();
 app.use(cors());
 app.use(express.json());

mongoose.connect(
  "mongodb://127.0.0.1:27017/mydatabase"
)
.then(() => {
  console.log("MongoDB Connected");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.listen(3000, () => {
  console.log("Server Running");
});