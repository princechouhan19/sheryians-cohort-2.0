const express = require("express");
const cookieParser = require("cookie-parser");


const app = express();

app.use(express.json());
app.use(cookieParser());

//Require Routes
const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes")
const userRouter = require("./routes/user.routes")


app.use("/api/auth" , authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users" , userRouter)


module.exports = app;