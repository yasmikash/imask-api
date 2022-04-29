const jwt = require("jsonwebtoken");
const { tokenSecret } = require("../config");

module.exports.authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader?.split(" ")[1];
    if (token) {
      jwt.verify(token, tokenSecret, (err, payload) => {
        if (err) throw new Error("Error occured signin the user");
        req.currentUser = payload;
        next();
      });
    } else {
      throw new Error("Unauthorized user");
    }
  } catch (error) {
    next(error);
  }
};
