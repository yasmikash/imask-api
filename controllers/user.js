const bcrypt = require("bcrypt");
const User = require("../schemas/user");
const Location = require("../schemas/location");
const { generateAccessToken } = require("./auth");

module.exports.getProfile = async (user) => {
  const fetchedUser = await User.findById(user.id, "-__v -password");
  return fetchedUser;
};

module.exports.fetchLocations = async (user) => {
  const fetchedLocations = await Location.find({ user: user.id }).populate(
    "analyze",
    "-__v -user -date"
  );
  return fetchedLocations;
};

module.exports.fetchUserCoordinates = async (user) => {
  const fetchedCoordinates = await Location.find(
    { user: user.id },
    "lat long -_id"
  );
  return fetchedCoordinates;
};

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

module.exports.updateUser = async (data, user) => {
  const dataToUpdate = {
    firstName: data.firstName,
    lastName: data.lastName,
    location: data.location,
    phoneNo: data.phoneNo,
    photo: data.photo,
  };

  await User.findByIdAndUpdate(user.id, dataToUpdate);
  return dataToUpdate;
};

module.exports.signUser = async (data) => {
  const foundUser = await User.findOne({ NIC: data.NIC });

  const profile = {
    firstName: foundUser.firstName,
    lastName: foundUser.lastName,
    email: foundUser.email,
    location: foundUser.location,
    age: foundUser.age,
    phoneNo: foundUser.phoneNo,
    NIC: foundUser.NIC,
    gender: foundUser.gender,
    photo: foundUser.photo,
  };

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
    userType: "user",
  };

  const token = generateAccessToken(tokenPayload);
  return { token, profile };
};
