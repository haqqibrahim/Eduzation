const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");

const studendRegister = require("./routes/studentregister");
const studentLogin = require("./routes/studentlogin");
const teacherRegister = require("./routes/teacherregister");
const teacherLogin = require("./routes/teacherlogin");
const studentHome = require("./routes/studenthome");
const teacherHome = require("./routes/teacherhome");

const app = express();

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect(
  "mongodb+srv://haqq:haqq0000@cluster0.g42r9.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

app.get("/logout", (req, res) => {
  // LOGOUT USING PASSPORT JS
  req.logout((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});app.get("/", (req, res) => {
  res.render("home");
});
app.get("/studenthome-assessment", (req, res) => {
  res.render("studentassessment");
})
app.get("/studenthome-ranking", (req, res) => {
  res.render("studentranking");
})
app.get("/code", (req, res) => {
  res.render("code");
})
app.use("/studentregister", studendRegister);
app.use("/studentlogin", studentLogin);
app.use("/teacherregister", teacherRegister);
app.use("/teacherlogin", teacherLogin);
app.use("/studenthome", studentHome);
app.use("/teacherhome", teacherHome);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
