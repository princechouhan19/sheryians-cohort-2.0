const e = require("express");
const mongoose = require("mongoose");
const express = require("express");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username already exists"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
  },
  password: { type: String, required: true },
  profile_image: {
    type: String,
    default:
      "https://ik.imagekit.io/princechouhan/Default_user720.webp?updatedAt=1772129479200",
  },
  bio: { type: String, default: "" },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
