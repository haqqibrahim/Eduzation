const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssignmentSchema = new Schema({
  course: String,
  title: String,
  assignmentFile: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("Assignment", AssignmentSchema);
