const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: Number,
    },
    otp: {
      type: Number,
    },
    emailverified: {
      type: Boolean,
      default:false,
    },
    position: {
      type: String,
    },
    hireDate: {
      type: Date,
    },
  },
  { timestamps: { createdAt: "createdAt" } }
);

let User = mongoose.model("users", userSchema);
module.exports = User;
