const { Schema, model } = require("mongoose");

const defaultProfilePhoto = `data:image/png;base64,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`;

const adminSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  NIC: String,
  photo: {
    type: String,
    default: defaultProfilePhoto,
  },
  createdDate: {
    type: Date,
    default: new Date(),
  },
});

module.exports = model("Admin", adminSchema);
