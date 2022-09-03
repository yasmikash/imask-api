const FlaggedLocation = require("../schemas/flaggedLocation");

module.exports.fetchLocalLocations = async () => {
  const locations = await FlaggedLocation.findOne();
  return locations;
};
