const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

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

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
};
