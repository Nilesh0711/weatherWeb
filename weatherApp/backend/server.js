const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./userModel");
const jwt = require("jsonwebtoken");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

const jsonWeb = "wkjerhuehoigqhoiwejho12u3484971928eyd7hf0q923103812830jef";

const mongoDb =
  "mongodb+srv://nilesh123:nilesh123@cluster0.cmm2mng.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(mongoDb)
  .then(() => {
    console.log("Successfully connected");
  })
  .catch(() => {
    console.log("failed to connect");
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email: email });
  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      return res.send(user);
    }
  }
  return res.send("No existing user");
});

app.post("/create", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  let password = req.body.password;

  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ status: "1", message: "User already registered" });
    } else {
      bcrypt.hash(password, 10).then((data) => {
        const registerUser = new User({
          username: username,
          email: email,
          password: data,
        });
        registerUser
          .save()
          .then((data) => {
            res.send({
              status: 2,
              message: `User with name ${username} has been added`,
            });
          })
          .catch((error) => {
            res.send({ status: 3, message: `Some error occured` });
          });
      });
    }
  });
});

app.listen(3000, () => {
  console.log("http://127.0.0.1:3000");
});
