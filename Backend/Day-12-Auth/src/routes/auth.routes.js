const express = require("express");
const authRouter = express.Router();
const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

/*
    POST /api/auth/register
*/
authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserPresent = await userModel.findOne({ email });

  if (isUserPresent) {
    return res.status(409).json({
      message: "User already exists, please login",
    });
  }

  const user = await userModel.create({
    name,
    email,
    password: crypto.createHash("md5").update(password).digest("hex"),
  });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,{ expiresIn: "1h" }
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user,
    token,
  });
});

/*
    GET /api/auth/get-me
*/
authRouter.get("/get-me", async (req, res) => {
  const token = req.cookies.token;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  console.log(decoded);
  const user = await userModel.findById(decoded.id);
  res.json({
    name: user.name,
    email: user.email,
  })
});

/*
    POST /api/auth/login
*/
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if(!user){
    res.status(404).json({
        message:"User not found, please register"
    })
  }

  const hashedPassword = crypto.createHash("md5").update(password).digest("hex");

  if(user.password !== hashedPassword){
    return res.status(401).json({
        message:"Invalid credentials"
    })
  }

    const token = jwt.sign( 
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,{ expiresIn: "1h" }
    );

    res.cookie("token", token);

    res.status(200).json({
      message: "Login successful",
      token,
    });
});

module.exports = authRouter;
