const express = require("express");
const app = express();
const TeacherLogin = express.Router();
const passport = require("passport");

const Teacher = require("../models/Teacher");

TeacherLogin.get("/", (req, res) => {
  res.render("teacherlogin");
});

TeacherLogin.post("/", (req, res) => {
  const teacher = new Teacher({
    username: req.body.username,
    password: req.body.password,
  });
  req.login(teacher, (err) => {
    if (err) {
      console.log(err);
      res.redirect("/teacherlogin");
    } else {
      passport.authenticate("local")(req, res, () => {
        console.log("Teacher Logged In");
        res.redirect("/teacherhome");
      });
    }
  });
});

module.exports = TeacherLogin;
