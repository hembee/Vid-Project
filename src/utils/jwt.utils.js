const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    username: user.username,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
};
const verifyToken = (token) => {
  jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {generateToken, verifyToken};
