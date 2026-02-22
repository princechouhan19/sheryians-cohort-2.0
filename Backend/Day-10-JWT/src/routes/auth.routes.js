const express = require("express");
const userModel = require("../models/user.model");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
/*
Route: /api/auth/register
Method: POST
*/

authRouter.post("/register" , async(req,res)=>{
    const {name,email,password} = req.body

    // check if user is already present
    const isUserPresent = await userModel.findOne({email});

    if (isUserPresent){
        return res.status(400).json({
            message:"email already exists with this email"
        })
    }
    // create user
    const user = await userModel.create({
        name,email,password
    })
    // create token
    const token = jwt.sign(
        {
            id:user._id,
            email:user.email
        },
        process.env.JWT_SECRET
    )
    // set cookie
    res.cookie("jwt_token", token)  
    
    // send response
    res.status(201).json({
        message:"user Registered successfully",
        user,
        token
    })
})

module.exports = authRouter