const { Schema, model } = require("mongoose");

const locationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  lat: Number,
  long: Number,
  analyze: {
    type: Schema.Types.ObjectId,
    ref: "Analyze",
  },
  date: Date,
});

module.exports = model("Location", locationSchema);
