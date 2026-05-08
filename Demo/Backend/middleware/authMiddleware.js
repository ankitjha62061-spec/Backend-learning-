const jwt = require("jsonwebtoken");

const SECRET = "mysecretkey";

function authMiddleware(req, res, next) {
  const header = req.headers["authorization"];

  if (!header) {
    return res.status(401).json({ message: "No token" });
  }
  const token = header.split(" ")[1];

  try {
    const user = jwt.verify(token, SECRET);
    req.user = user; 
    next();
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
}

module.exports = authMiddleware;






