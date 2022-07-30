const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const TeacherSchema = new Schema({
  firstName: String,
  lastName: String,
  teachersId: String,
  course: String,
  timetable: [],
  assignment: [],
  attendance: [
    {
      date: String,
      name: String,
      matricNumber: String,
    },
  ],
});

TeacherSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Teacher", TeacherSchema);
