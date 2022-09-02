const jwt = require("jsonwebtoken");
const { tokenSecret } = require("../config");
const User = require("../schemas/user");
const Admin = require("../schemas/admin");

module.exports.authenticateUser = (userType) => (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader?.split(" ")[1];
    if (token) {
      jwt.verify(token, tokenSecret, async (err, payload) => {
        try {
          if (err) throw new Error("Error occured signin the user");
          const claimedUserType = payload.userType;
          if (userType !== claimedUserType)
            throw new Error("User is not allowed to perform this operation");
          let user;
          if (claimedUserType === "user")
            user = await User.findById(payload.id);
          if (claimedUserType === "admin")
            user = await Admin.findById(payload.id);
          if (!user) throw new Error("No such user exists");
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
