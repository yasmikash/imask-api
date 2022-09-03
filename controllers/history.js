const moment = require("moment");
const Analyze = require("../schemas/analyze");
const mongoose = require("mongoose");

module.exports.fetchAll = async (user) => {
  const result = await Analyze.find({ user: user.id })
    .select("-_id -__v -user")
    .sort({ date: "desc" });
  return result;
};

module.exports.fetchRespiratory = async (user) => {
  const result = await Analyze.find({ user: user.id })
    .select("date bpm -_id")
    .sort({ date: "desc" });
  return result;
};

module.exports.fetchHeartRate = async (user) => {
  const result = await Analyze.find({ user: user.id })
    .select("date heartRate -_id")
    .sort({ date: "desc" });
  return result;
};

module.exports.fetchCough = async (user) => {
  const result = await Analyze.find({ user: user.id })
    .select("date coughRate isCough -_id")
    .sort({ date: "desc" });
  return result;
};

module.exports.fetchSpo2 = async (user) => {
  const result = await Analyze.find({ user: user.id })
    .select("date spo2 -_id")
    .sort({ date: "desc" });
  return result;
};

module.exports.fetchTemperature = async (user) => {
  const result = await Analyze.find({ user: user.id })
    .select("date temperature -_id")
    .sort({ date: "desc" });
  return result;
};

module.exports.fetchAnalyzedBpm = async (data, user) => {
  const result = await getAnalyzedDataInRange(
    "bpm",
    user.id,
    data.to,
    data.from
  );
  return result;
};

module.exports.fetchAnalyzedHeartRate = async (data, user) => {
  const result = await getAnalyzedDataInRange(
    "heartRate",
    user.id,
    data.to,
    data.from
  );
  return result;
};

module.exports.fetchAnalyzedSpo2 = async (data, user) => {
  const result = await getAnalyzedDataInRange(
    "spo2",
    user.id,
    data.to,
    data.from
  );
  return result;
};

module.exports.fetchAnalyzedTemperature = async (data, user) => {
  const result = await getAnalyzedDataInRange(
    "temperature",
    user.id,
    data.to,
    data.from
  );
  return result;
};

module.exports.fetchAnalyzedCoughRate = async (data, user) => {
  const result = await getAnalyzedDataInRange(
    "coughRate",
    user.id,
    data.to,
    data.from
  );
  return result;
};

module.exports.fetchAnalyzedAll = async (user) => {
  const result = await Analyze.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(user.id),
        date: {
          $gte: new Date(moment().format("YYYY-MM-DD")),
          $lte: new Date(moment().add(1, "day").format("YYYY-MM-DD")),
        },
      },
    },
    {
      $group: {
        _id: new mongoose.Types.ObjectId(user.id),
        avgSpo2: { $avg: "$spo2" },
        avgBpm: { $avg: "$bpm" },
        avgCoughRate: { $avg: "$coughRate" },
        avgHeartRate: { $avg: "$heartRate" },
        avgCovidStatusProbability: { $avg: "$covidStatusProbability" },
        avgTemperature: { $avg: "$temperature" },
      },
    },
  ]);

  const analyzedData = result[0];

  if (!analyzedData) {
    return {
      _id: user.id,
      avgSpo2: 0,
      avgCoughRate: 0,
      avgHeartRate: 0,
      avgCovidStatusProbability: 0,
      avgTemperature: 0,
      avgBpm: 0,
    };
  } else {
    return {
      _id: user.id,
      avgSpo2: analyzedData.avgSpo2.toFixed(2),
      avgCoughRate: analyzedData.avgCoughRate.toFixed(2),
      avgHeartRate: analyzedData.avgHeartRate.toFixed(2),
      avgCovidStatusProbability:
        analyzedData.avgCovidStatusProbability.toFixed(2),
      avgTemperature: analyzedData.avgTemperature.toFixed(2),
      avgBpm: analyzedData.avgBpm.toFixed(2),
    };
  }
};

module.exports.fetchAnalyzedStatus = async (data, user) => {
  const result = await getAnalyzedDataInRange(
    "covidStatusProbability",
    user.id,
    data.to,
    data.from
  );
  return result;
};

async function getAnalyzedDataInRange(type, userId, to, from) {
  const datesInRange = [];

  for (let s = moment(from); s.isSameOrBefore(to); s.add(1, "day")) {
    datesInRange.push(s.format("YYYY-MM-DD"));
  }

  const result = await Analyze.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
        date: {
          $gte: new Date(from),
          $lte: new Date(to),
        },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        avgData: { $avg: `$${type}` },
      },
    },
  ]);

  const values = datesInRange.map((date) => {
    const item = result.find((item) => moment(item._id).isSame(moment(date)));
    if (item) return item.avgData;
    return 0.0;
  });

  return { labels: datesInRange, data: values, to, from };
}
