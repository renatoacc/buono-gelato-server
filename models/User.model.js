const { Schema, model } = require("mongoose");
// user model

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      default: "client",
    },
    cart: [],
    favourites: [],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
