const express = require("express");
const app = express();

const userRouter = require("./routes/userRouter");

app.use(express.json());


app.use("/users", userRouter);


app.get("/", (req, res) => {
  res.send("hello Ankit ");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});