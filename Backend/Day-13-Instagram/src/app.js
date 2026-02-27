const express = require("express");
const cookirParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes");

const app = express();

app.use(express.json());
app.use(cookirParser());
app.use("/api/auth" , authRouter);
module.exports = app;
