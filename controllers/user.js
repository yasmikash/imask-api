const bcrypt = require("bcrypt");
const User = require("../schemas/user");
const { generateAccessToken } = require("./auth");

module.exports.createUser = async (data) => {
  const hashedPassword = await new Promise((res, rej) => {
    bcrypt.hash(data.password, 10, (err, hash) => {
      if (err) {
        rej(new Error("Could not create user"));
      }
      res(hash);
    });
  });

  const user = new User({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    location: data.location,
    age: data.age,
    phoneNo: data.phoneNo,
    NIC: data.NIC,
    password: hashedPassword,
    gender: data.gender,
    photo: data.photo,
  });

  const {
    firstName,
    lastName,
    email,
    location,
    age,
    phoneNo,
    NIC,
    gender,
    photo,
  } = await user.save();
  return {
    firstName,
    lastName,
    email,
    location,
    age,
    phoneNo,
    NIC,
    gender,
    photo,
  };
};

module.exports.signUser = async (data) => {
  const foundUser = await User.findOne({ NIC: data.NIC });
  if (!foundUser) {
    throw new Error("User could not be found");
  }

  const validPassword = await new Promise((res, rej) => {
    bcrypt.compare(data.password, foundUser.password, (err, result) => {
      if (!result || err) rej(new Error("Invalid user"));
      res(result);
    });
  });

  const tokenPayload = {
    id: foundUser._id,
    email: foundUser.user,
    NIC: foundUser.NIC,
  };

  const token = generateAccessToken(tokenPayload);
  return { token };
};
