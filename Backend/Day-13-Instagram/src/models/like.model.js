const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    post :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Post",
        required : [true , "Post id is required for like"]
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : [true , "User id is required for like"]
    }
},{timestamps : true})

likeSchema.index({post : 1 , user : 1} , {unique : true})

const likeModel = mongoose.model("like" , likeSchema)

module.exports = likeModel