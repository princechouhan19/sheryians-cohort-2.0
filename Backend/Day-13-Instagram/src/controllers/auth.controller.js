const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

async function registerController (req, res) {
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

  const hash = crypto.createHash("md5").update(password).digest("hex");

  const user = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    profile_image,
  });

  /*
    Conditions for generating the token
      - user ka data hona chaiye
      - data unique hona chaiye
    */
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      email: user.email,
      username: user.username,
      bio: user.bio,
      profile_image: user.profile_image,
    },
    token,
  });
}

async function loginController (req, res) {
  const { username, email, password } = req.body;

  /*
    User Can Login 
    - with email and password
    - with username and password
  */
  const user = await userModel.findOne({
    $or: [
      //Condition 1: Login with email 
      { username : username},
      //Condition 2: Login with username 
      { email : email},
    ],
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid Credentials",
    });
  }

  const hash = crypto.createHash("md5").update(password).digest("hex");

  const isPasswordValid = user.password === hash;

  if(!isPasswordValid){
    return res.status(401).json({
      message : "Invalid Password"
    })
  }

  const token = jwt.sign({
    id : user._id,
    username : user.username,
    email: user.email
  },process.env.JWT_SECRET)

  res.cookie("token" , token);

  res.status(200).json({
    message : "User logged in successfully",
    user : {
      email : user.email,
      username : user.username,
      bio : user.bio,
      profile_image : user.profile_image
    },
    token
  })
}

module.exports = { registerController , loginController }