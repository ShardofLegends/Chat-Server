const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./model/user.cjs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const JWT_SECRET =
  "sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk";

mongoose.connect(
  "mongodb+srv://manuel:px6GTna4g6jM8IVx@cluster0.hcanky9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

const app = express();
app.use("/", express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());
app.use(cors());

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).lean(); //lean = umwandeln in JSON

  if (!user) {
    return res.json({ status: "error", error: "Invalid username/password" });
  }

  if (await bcrypt.compare(password, user.password)) {
    // the username, password combination is successful

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      JWT_SECRET
    );

    return res.json({ status: "ok", data: token });
  }

  res.json({ status: "error", error: "Invalid username/password" });
});

app.post("/api/register", async (req, res) => {
  const { username, password: plainTextPassword } = req.body;

  if (!username || typeof username !== "string") {
    return res.json({ status: "error", error: "Invalid username" });
  }

  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }

  if (plainTextPassword.length < 7) {
    return res.json({
      status: "error",
      error: "Password too small. Should be atleast 8 characters",
    });
  }

  const password = await bcrypt.hash(plainTextPassword, 10);

  try {
    const response = await User.create({
      username,
      password,
    });
    console.log("User created successfully: ", response);
  } catch (error) {
    if (error.code === 11000) {
      return res.json({
        status: "error",
        error: "Username: " + username + " already in use",
      });
    }
    throw error;
  }

  res.json({ status: "ok" });
});

app.listen(9999, () => {
  console.log("Server up at 9999");
});
