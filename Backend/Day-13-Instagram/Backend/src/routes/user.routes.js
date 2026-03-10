const express = require('express')
const userController = require('../controllers/user.controller')
const identifyUser = require('../middlewares/auth.middleware')

const userRouter = express.Router();

/*
    @route POST /api/users/follow/:userid
    @description Follow a user
    @access Private
*/
userRouter.post("/follow/:username" , identifyUser ,userController.followUserController)

/*
    @route POST /api/users/unfollow/:userid
    @description Unfollow a user
    @access Private
*/
userRouter.delete("/unfollow/:username" , identifyUser , userController.unfollowUserController)

/*
    @route PATCH /api/users/followers/respond/:userid
    @description Accept or reject a follow request
    @access Private
*/
userRouter.patch("/followers/respond/:username" , identifyUser , userController.respondToFollowRequestUserController)


module.exports = userRouter;