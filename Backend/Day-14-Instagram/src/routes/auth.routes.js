const express = require("express");
const authRouter = express.Router();
const userModel = require("../models/user.model");
const crypto = require("crypto");

authRouter.post("/register", async (req, res) => {
  const { username, email, password, bio, profile_image } = req.body;

  /* We need to check the user existence in database before registering the user . We can check the user existence by email or username . less Efficient way to check the user existence in database . We need to make two queries to check the user existence by email and username .
    // const isUserExistsByEmail = await userModel.findOne({email});

    // if(isUserExistsByEmail){
    //     return res.status(409).json({
    //         message: "User with this email already exists"
    //     })
    // }

    // const isuserExistsByUsername = await userModel.findOne({username});

    // if(isuserExistsByUsername){
    //     return res.status(409).json({
    //         message: "User with this username already exists"
    //     })
    } */

  // We can also check the user existence by email and username in a single query using $or operator . More efficient way to check the user existence in database .
  const isUserAlredyExists = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isUserAlredyExists) {
    return res.status(409).json({
      message:
        "User alredy exists" +
        (isUserAlredyExists.email === email
          ? "with this email"
          : "with this username"),
    });
  }

  const hashPassword = crypto.createHash("md5").update(password).digest("hex");

  const user = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    profile_image,
  });

  res.status(201).json({
    message: "User registered successfully",
    user,
  });
});

module.exports = authRouter;
