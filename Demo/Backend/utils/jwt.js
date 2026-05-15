const jwt = require("jsonwebtoken");

const SECRET = "mysecretkey";

const createToken = (user) => {

  return jwt.sign(
    {
      id: user._id,
    },
    SECRET,
    {
      expiresIn: "20min",
    }
  );
};

module.exports = {
  createToken,
};