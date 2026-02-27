const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller");

// POST api/auth/register
authRouter.post("/register", authController.registerController);

// POST api/auth/login
authRouter.post("/login", authController.loginController);

module.exports = authRouter;
