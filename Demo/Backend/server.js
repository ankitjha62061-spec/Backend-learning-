const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const authRoutes =
  require("./routes/userRouter");

const productRoutes =
  require("./routes/productRoutes");

const cartRoutes =
  require("./routes/cartRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);
mongoose.connect(
  "mongodb://127.0.0.1:27017/mydatabase"
)

.then(() => {

  console.log("MongoDB Connected");

});
app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/cart", cartRoutes);
app.listen(3000, () => {

  console.log("Server Running");

});