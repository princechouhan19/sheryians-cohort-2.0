const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller");

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

module.exports = authRouter;
