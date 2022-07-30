const express = require("express");
const app = express();
const StudentLogin = express.Router();
const passport = require("passport");

const Student = require("../models/Student");

StudentLogin.get("/", (req, res) => {
  res.render("studentlogin");
});

StudentLogin.post("/", (req, res) => {
  const student = new Student({
    username: req.body.username,
    password: req.body.password,
  });
  Student.findOne({ username: req.body.username }, (err, student) => {
    if (err) {
      console.log(err);
      res.redirect("/studentlogin");
    } else {
      res.redirect("/studenthome");
    }
  });
});

module.exports = StudentLogin;
