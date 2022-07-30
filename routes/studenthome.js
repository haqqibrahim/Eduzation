const express = require("express");
const app = express();
const StudentHome = express.Router();
const multer = require("multer");
const fs = require("fs");

const Assignment = require("../models/Assignment");
const Ranking = require("../models/Ranking");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

StudentHome.get("/", (req, res) => {
  res.render("studenthome");
});

StudentHome.get("/studenthome-assessment", (req, res) => {
  res.render("studentassessment");
})

StudentHome.post("/studentassignment", upload.single("file"), (req, res) => {
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


StudentHome.post("/studentranking", (req, res) => {
  const rank = new Ranking({
    name: req.body.name,
    cgpa: req.body.cgpa,
    department: req.body.department,
  });
  rank
    .save()
    .then(() => {
      console.log("Ranking saved");
      res.redirect("/studenthome");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = StudentHome;
