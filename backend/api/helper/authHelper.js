const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = (req, res, next) => {
  const token = req.headers["x-access-token"];
  
  try {
    const tokenData = jwt.verify(token, process.env.TOKEN_SECRET);
    
    req._id = tokenData._id;

    next();
  } catch (error) {
    return res.send({ status: "Err", msg: "unauthorized access ", data: null });
  }
};
