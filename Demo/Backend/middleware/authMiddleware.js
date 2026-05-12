const jwt = require("jsonwebtoken");

const SECRET = "mysecretkey";

const authMiddleware = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token missing",
    });
  }

  const token = authHeader.split(" ")[1];

  try {

    const verified = jwt.verify(token, SECRET);

    req.user = verified;

    next();

  } catch (error) {

    res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = authMiddleware;
