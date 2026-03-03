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

  // Check Token
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token not provide , Unauthorized Access",
    });
  }

  // Decoding the Token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: "Token is invalid , Unauthorized Access",
    });
  }

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
    user: decoded.id,
  });

  // Sending the Response
  res.status(201).json({
    message: "Post Created Successfully",
    post,
  });
}

module.exports = {
  createPostController,
};
