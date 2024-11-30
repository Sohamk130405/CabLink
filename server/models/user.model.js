const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name atleast three characters long"],
    },
    lastname: {
      type: String,
      minlength: [3, "Last name atleast three characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "First name atleast three characters long"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
});

userSchema.methods.generateAuthToken = () => {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
};

userSchema.methods.comparePassword = async (password) => {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};
const User = model("User", userSchema);
module.exports = User;
