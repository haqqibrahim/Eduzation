const express = require("express");
const app = express();
const StudentRegister = express.Router();
const passport = require("passport");

const Student = require("../models/Student");

app.use(passport.initialize());
app.use(passport.session());
passport.use(Student.createStrategy());
passport.serializeUser(Student.serializeUser());
passport.deserializeUser(Student.deserializeUser());

StudentRegister.get("/", (req, res) => {
  res.render("studentregister");
});

StudentRegister.post("/", (req, res) => {
  const student = new Student({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    matricNumber: req.body.matricNumber,
    department: req.body.department,
    timetable: [],
    assignment: [],
    ranking: [],
  });
  //  Student.register(student, req.body.password, (err, student) => {
  //   if(err) {
  //     console.log(err);
  //     res.redirect("/studentregister");
  //   } else {
  //     console.log("Student Registered");
  //     console.log(student);
  //     res.redirect("/studenthome")
  //   }
  //  })
  student.save((err, student) => {
    if (err) {
      console.log(err);
      res.redirect("/studentregister");
    } else {
      console.log("Student Registered");
      res.redirect("/studenthome");
    }
  });
});

module.exports = StudentRegister;
