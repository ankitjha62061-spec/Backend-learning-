const jwt = require("jsonwebtoken");

const SECRET = "mysecretkey";

function createToken(user) {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
    },
    SECRET,
    { expiresIn: "1h" }
  );
}

function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
}

module.exports = {
  createToken,
  verifyToken,
};