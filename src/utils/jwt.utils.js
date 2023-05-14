const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    username: user.username,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1hr",
  });
  return token;
};
const verifyToken = (token) => {
  jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
