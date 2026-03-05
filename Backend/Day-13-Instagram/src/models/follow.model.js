const mongoose = require("mongoose");

// Edge collection
const followSchema = new mongooseSchema(
  {
    // who is following
    follower: {
      type: mongoose.Schema.Types.objectId,
      ref: "users",
      required: [true, "Follower is required"],
    },
    // who is being followed
    following: {
      type: monghoose.Schema.Types.ojectId,
      ref: "users",
      required: [true, "Following is required"],
    },
  },
  {
    // createdAt, updatedAt
    timestamps: true,
  },
);

const followModel = mongoose.model("follows", followSchema);

module.exports = followModel;
