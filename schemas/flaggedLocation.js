const { Schema, model } = require("mongoose");

const flaggedLocationSchema = new Schema({
  locations: [{ lat: Number, lng: Number }],
  createdDate: {
    type: Date,
    default: new Date(),
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
  },
});

module.exports = model("FlaggedLocation", flaggedLocationSchema);
