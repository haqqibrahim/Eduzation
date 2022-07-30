const express = require("express");
const app = express();
const TeacherRegister = express.Router();
const passport = require("passport");

const Teacher = require("../models/Teacher");

app.use(passport.initialize());
app.use(passport.session());
passport.use(Teacher.createStrategy());
passport.serializeUser(Teacher.serializeUser());
passport.deserializeUser(Teacher.deserializeUser());

TeacherRegister.get("/", (req, res) => {
  res.render("teacherregister");
});

TeacherRegister.post("/", (req, res) => {
  Teacher.register(
    new Teacher({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      teachersId: req.body.teachersId,
      course: req.body.course,
      timetable: [],
      assignment: [],
      attendance: [],
    }),
    req.body.password,
    (err, teacher) => {
      if (err) {
        console.log(err);
        res.redirect("/teacherregister");
      } else {
        passport.authenticate("local")(req, res, () => {
          console.log("Teacher Registered");
          res.redirect("/teacherhome");
        });
      }
    }
  );
});

module.exports = TeacherRegister;
