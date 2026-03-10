const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const identifyUser = require("../middlewares/auth.middleware");

/*
    @routes POST api/posts [protected]
    @description create a new post with image and caption
    @req.body = {caption,image-file}
    @res = {message:"Post created successfully"}
*/
postRouter.post(
  "/",
  upload.single("image"),
  identifyUser,
  postController.createPostController,
);

/*
    @routes GET api/posts [protected]
    @description return all the posts created by the user that the request come form 
    @res = {message:"Posts fetched successfully"}
*/
postRouter.get("/", identifyUser, postController.getPostController);

/*
    @routes GET api/posts/details/:postid [protected]
    @description return an detail about specipic post with the id .
      Also check wether the post belong to the user ie request come form 
*/
postRouter.get(
  "/details/:postId",
  identifyUser,
  postController.getPostDetailsController,
);

/*
    @routes POST api/posts/like/:postid [protected]
    @description like a post with the id provided in request params
*/
postRouter.post("/like/:postId" , identifyUser , postController.likePostController)

module.exports = postRouter;
