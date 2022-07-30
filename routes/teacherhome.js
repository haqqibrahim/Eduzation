const express = require("express");
const app = express();
const TeacherHome = express.Router();
const multer = require("multer");
const fs = require("fs");

const Assignment = require("../models/Assignment2");
const Ranking2 = require("../models/Ranking2");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

TeacherHome.get("/", (req, res) => {
  res.render("teacherhome");
});

TeacherHome.post("/teacherassignment", upload.single("file"), (req, res) => {
  const file = fs.readFileSync(req.file.path);
  const encodeFile = file.toString("base64");
  const finalFile = {
    data: new Buffer.from(encodeFile, "base64"),
    contentType: req.file.mimetype,
  };
  const newAssignment = new Assignment({
    course: req.body.course,
    title: req.body.title,
    assignmentFile: {
      data: finalFile.data,
      contentType: finalFile.contentType,
    },
  });
  newAssignment
    .save()
    .then(() => {
      console.log();
      console.log("Assignment saved");
      res.redirect("/studenthome");
    })
    .catch((err) => {
      console.log(err);
    });
});

TeacherHome.post("/teacherranking", (req, res) => {
  const rank = new Ranking2({
    name: req.body.name,
    cgpa: req.body.cgpa,
    department: req.body.department,
  });
  rank
    .save()
    .then(() => {
      console.log();
      console.log("Ranking saved");
      res.redirect("/studenthome");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = TeacherHome;
