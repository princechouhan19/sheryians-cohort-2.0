const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}))
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