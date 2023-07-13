const mongoose = require("mongoose")

const userSchecma = new mongoose.Schema(
  {
    username: {
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
      select: 1,
      unique: true,
    },
    img: {
      type: String,
      required: true,
    },
    is_online: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user",userSchecma)