const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const likeModel = require("../models/like.model");

// ImageKit Configuration
const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

// Create Post Controller
async function createPostController(req, res) {
  console.log(req.body, req.file);

  // Uploading the file to ImageKit
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "Cohort-20/Instagram-clone/Posts",
  });

  // Creating the Post
  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.id, // before middleware decoded.id
  });

  // Sending the Response
  res.status(201).json({
    message: "Post Created Successfully",
    post,
  });
}

// Get All Posts Controller
async function getPostController(req, res) {
  const userId = req.user.id; // before middleware decoded.id

  const posts = await postModel.find({
    user: userId,
  });

  res.status(200).json({
    message: "Posts fetched successfully",
    posts,
  });
}

// Get Post Details Controller
async function getPostDetailsController(req, res) {
  const userId = req.user.id; // before middleware decoded.id
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post Not Found!",
    });
  }

  // Twisting[Object to string ] becz of type mismatch in mongodb
  const isValiduser = post.user.toString() == userId;

  // 403 is used for forbidden access when the user is not the owner of the post

  if (!isValiduser) {
    return res.status(403).json({
      message: "Forbidden Content",
    });
  }

  return res.status(200).json({
    message: "Post Fetched Successfully🎉",
    post,
  });
}

// Like Post Controller
async function likePostController(req , res){
    const username = req.user.username;
    const postId = req.params.postId;

    // Find the post
    const post = await postModel.findById(postId)

    if(!post){
      return res.status(404).json({
        message : "Post Not Found!"
      })
    }

    // Check if the user has alredy liked the post
    const isUserLiked = await likeModel.findOne({
      postId : postId,
      user : req.user.id
    })

    if(isUserLiked){
      return res.status(400).json({
        message : "You have already liked this post"
      })
    }

    // Create the like
    const like = await likeModel.create({
      post : postId,
      user : req.user.id
    })

    return res.status(200).json({
      message : "Post Liked Successfully",
      like
    })
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
  likePostController,
};
