const jwt = require("jsonwebtoken");

const SECRET = "mysecretkey";

const createToken = (user) => {

  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    SECRET,
    {
      expiresIn: "1d",
    }
  );
};

module.exports = {
  createToken,
};