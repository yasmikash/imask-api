const jwt = require("jsonwebtoken");
const { tokenSecret } = require("../config");

module.exports.generateAccessToken = (data) => jwt.sign(data, tokenSecret);
