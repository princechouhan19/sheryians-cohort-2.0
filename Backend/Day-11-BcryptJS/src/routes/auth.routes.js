const express = require("express");
const userModel = require("../models/user.model");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserPresent = await userModel.findOne({ email });

  if (isUserPresent) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  const hashedPass = crypto.createHash("md5").update(password).digest("hex");

  const user = await userModel.create({
    name,
    email,
    password: hashedPass,
  });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "User Registered Successfully",
    user,
    token,
  });
});

authRouter.post("/protected", (req,res)=>{
    console.log(req.cookies);

    res.status(200).json({
        message: "Protected Route Accessed"
    })
})

authRouter.post("/login", async (req, res) => {
    // destructure email and password from req.body
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if(!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    const isPasswordMatch = user.password === crypto.createHash("md5").update(password).digest("hex");

    if(!isPasswordMatch) {
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    }

    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET);

    res.cookie("jwt_token", token);

    res.status(200).json({
        message: "Login Successful",
        user,
        token
    })
});

    

module.exports = authRouter;
