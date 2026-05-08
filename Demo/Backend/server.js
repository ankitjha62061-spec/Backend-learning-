const express = require("express");
const cors = require("cors");

const app = express();

const connectDB = require("./config/db");
const userRouter = require("./routes/userRouter");

app.use(cors()); 

app.use(express.json());

connectDB();

app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("hello Ankit ");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});