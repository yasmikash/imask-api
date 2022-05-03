const jwt = require("jsonwebtoken");
const { tokenSecret } = require("../config");
const User = require("../schemas/user");

module.exports.authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader?.split(" ")[1];
    if (token) {
      jwt.verify(token, tokenSecret, async (err, payload) => {
        try {
          if (err) throw new Error("Error occured signin the user");
          const maskUser = await User.findById(payload.id);
          if (!maskUser) throw new Error("No such user exists");
          req.currentUser = payload;
          next();
        } catch (error) {
          next(error);
        }
      });
    } else {
      throw new Error("Unauthorized user");
    }
  } catch (error) {
    next(error);
  }
};
