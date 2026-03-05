const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const identifyUser = require("../middlewares/auth.middleware");

/*
    POST api/posts [protected]
    - req.body = {caption,image-file}
    api/posts/

*/
postRouter.post(
  "/",
  upload.single("image"),
  identifyUser,
  postController.createPostController,
);

/*
    GET api/posts [protected]
    - return all the posts
*/
postRouter.get("/", identifyUser, postController.getPostController);

/*
    GET api/posts/details/:postid [protected]
    - return an detail about specipic post with the id .
    - Also check wether the post belong to the user ie request come form 
*/
postRouter.get(
  "/details/:postId",
  identifyUser,
  postController.getPostDetailsController,
);

module.exports = postRouter;
