const User = require("../schemas/user");

module.exports.createUser = async (data) => {
  const user = new User({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    location: data.location,
    password: data.password,
    age: data.age,
    phoneNo: data.phoneNo,
    NIC: data.NIC,
  });

  const createdUser = await user.save();
  return createdUser;
};
