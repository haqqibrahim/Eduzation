const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Assignment2Schema = new Schema({
  course: String,
  title: String,
  assignmentFile: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("Assignment2", Assignment2Schema);
