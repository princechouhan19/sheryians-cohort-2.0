const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller");
const identifyUser = require("../middlewares/auth.middleware");

/*
    @routes POST api/auth/register [public]
    @description register a new user
    @req.body = {username,email,password}
    @res = {message:"User registered successfully"}
*/
authRouter.post("/register", authController.registerController);

/*
    @routes POST api/auth/login [public]
    @description login a user
    @req.body = {username,password}
    @res = {message:"User logged in successfully"}
*/
authRouter.post("/login", authController.loginController);

/*
    @routes GET api/auth/get-me [private]
    @description get current user
    @res = {message:"User fetched successfully"}
*/
authRouter.get("/get-me", identifyUser , authController.getMeController);
module.exports = authRouter;
