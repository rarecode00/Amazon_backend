const jwt = require("jsonwebtoken");
const JWT_SECRET = "thisissecret";

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).json({ success: false, message: "User not found" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: "Access denied" });
  }
};

module.exports = fetchuser;
