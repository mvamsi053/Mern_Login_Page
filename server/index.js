const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;
mongoose.connect("mongodb://localhost:27017/userDB");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connecting MongoDB

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  userName: String,
  password: String,
});
userSchema.plugin(uniqueValidator);
const User = new mongoose.model("User", userSchema);

app.get("/", function (req, res) {
  User.find(function (err, foundUser) {
    res.send(foundUser);
  });
});
app.post("/", function (req, res) {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hash,
    });
    newUser.save(function (err) {
      if (err) {
        res.send({ status: 400, message: "user already exist" });
        console.log(err);
      } else {
        res.send({
          status: 200,
          message: "Register Success",
        });
        console.log({
          status: 200,
          message: "Register Success",
          data: newUser,
        });
      }
    });
  });
});
app.post("/login", function (req, res) {
  const checkEmail = req.body.email;
  const checkPassword = req.body.password;
  //   console.log(checkPassword);
  User.find({ email: { $eq: checkEmail } }, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser.length) {
        const hashpwd = foundUser[0].password;
        // console.log(foundUser[0].email);
        bcrypt.compare(checkPassword, hashpwd, function (err, result) {
          if (err) {
            console.log(err);
          } else {
            if (result == true) {
              res.send({
                status: 200,
                message: "password matched",
                data: foundUser[0],
              });

              console.log("match");
            } else {
              res.send({
                status: 403,
                message: "incorrect password",
                data: {},
              });
              console.log("wrong");
            }
          }
        });
      } else {
        res.send({ status: 404, message: "user not found", data: {} });
        console.log("user not found");
      }
    }
  });
});
app.put("/update", function (req, res) {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    User.findOneAndUpdate(
      {
        _id: req.body.id,
      },
      {
        $set: {
          userName: req.body.userName,
          password: hash,
        },
      },
      {
        overwrite: true,
      },
      function (err) {
        if (!err) {
          res.send("Successfully Updated");
          console.log("Successfully Updated");
        } else {
          res.send("Error in updating");
          console.log(err);
        }
      }
    );
  });
});

app.listen(3001, function () {
  console.log("server running on port 3001");
});
