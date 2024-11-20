// require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
// const Router = require("router");
const userRouter = require("./routes/user")
// const router = Router();

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use("/", userRouter.router);



app.listen(5000, () => {
  console.log("BE started at port 5000");
});