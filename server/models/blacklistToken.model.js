const { Schema, model } = require("mongoose");

const blacklistTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400,
  },
});

// Create the model
const BlacklistToken = model("BlacklistToken", blacklistTokenSchema);

module.exports = BlacklistToken;
