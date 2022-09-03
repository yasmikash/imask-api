const FlaggedLocation = require("../schemas/flaggedLocation");

module.exports.fetchLocalLocations = async () => {
  const locations = await FlaggedLocation.findOne();

  const convertedLocations = locations.locations.map((location) => ({
    lat: location.lat,
    long: location.lng,
  }));

  return convertedLocations;
};
