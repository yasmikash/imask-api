const { Schema, model } = require("mongoose");

const analyzeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  isCough: Number,
  heartRate: Number,
  coughRate: Number,
  bpm: Number,
  spo2: Number,
  temperature: Number,
  covidStatus: Number,
  covidStatusProbability: Number,
  date: Date,
});

module.exports = model("Analyze", analyzeSchema);
