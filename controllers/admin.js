const bcrypt = require("bcrypt");
const { generateAccessToken } = require("./auth");
const Admin = require("../schemas/admin");
const FlaggedLocation = require("../schemas/flaggedLocation");

module.exports.getProfile = async (user) => {
  const fetchedUser = await Admin.findById(user.id, "-__v -password");
  return fetchedUser;
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

  const user = new Admin({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    NIC: data.NIC,
    password: hashedPassword,
  });

  const { firstName, lastName, email, NIC } = await user.save();
  return {
    firstName,
    lastName,
    email,
    NIC,
  };
};

module.exports.signUser = async (data) => {
  const foundUser = await Admin.findOne({ NIC: data.NIC });

  const profile = {
    firstName: foundUser.firstName,
    lastName: foundUser.lastName,
    email: foundUser.email,
    NIC: foundUser.NIC,
  };

  if (!foundUser) {
    throw new Error("Admin user could not be found");
  }

  const validPassword = await new Promise((res, rej) => {
    bcrypt.compare(data.password, foundUser.password, (err, result) => {
      if (!result || err) rej(new Error("Invalid  admin user"));
      res(result);
    });
  });

  const tokenPayload = {
    id: foundUser._id,
    email: foundUser.user,
    NIC: foundUser.NIC,
    userType: "admin",
  };

  const token = generateAccessToken(tokenPayload);
  return { token, profile };
};

module.exports.flagLocation = async (data, user) => {
  const flaggedLocation = new FlaggedLocation({
    lat: data.lat,
    long: data.long,
    createdBy: user.id,
  });

  const createdFlaggedLocations = await flaggedLocation.save();

  return createdFlaggedLocations;
};
