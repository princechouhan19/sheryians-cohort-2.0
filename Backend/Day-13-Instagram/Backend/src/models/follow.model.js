const mongoose = require("mongoose");

// Edge collection
const followSchema = new mongoose.Schema(
  {
    // who is following
    follower: {
      type: String,
      required: [true, "Follower is required"],
    },
    // who is being followed
    following: {
      type: String,
      required: [true, "Following is required"],
    },
    status : {
      type : String,
      default : "pending",
      enum :{
        values : ["pending" , "accepted" , "rejected"],
        message : "status can only be pending , accepted or rejected"
      }
    }
  },
  {
    // createdAt, updatedAt
    timestamps: true,
  },
);

followSchema.index({follower : 1 , following:1}, {unique:true})

const followModel = mongoose.model("follows", followSchema);

module.exports = followModel;
