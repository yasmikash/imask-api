const Analyze = require("../schemas/analyze");

module.exports.respiratory = async (user) => {
  const result = await Analyze.find({ user: user.id }).select("date bpm -_id");
  return result;
};

module.exports.heartRate = async (user) => {
  const result = await Analyze.find({ user: user.id }).select(
    "date heartRate -_id"
  );
  return result;
};

module.exports.cough = async (user) => {
  const result = await Analyze.find({ user: user.id }).select(
    "date coughRate isCough -_id"
  );
  return result;
};

module.exports.spo2 = async (user) => {
  const result = await Analyze.find({ user: user.id }).select("date spo2 -_id");
  return result;
};

module.exports.temperature = async (user) => {
  const result = await Analyze.find({ user: user.id }).select(
    "date temperature -_id"
  );
  return result;
};
