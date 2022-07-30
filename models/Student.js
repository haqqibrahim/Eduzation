const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const StudentSchema = new Schema({
  firstName: String,
  lastName: String,
  matricNumber: String,
  department: String,
  timetable: [
    {
      day: String,
      time: String,
      subject: String,
    },
  ],
  assignment: [
    {
      course: String,
      title: String,
      file: {
        data: Buffer,
        contentType: String,
      },
    },
  ],
  ranking: [
    {
      name: String,
      cgpa: String,
      department: String,
    },
  ],
});

StudentSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Student", StudentSchema);
