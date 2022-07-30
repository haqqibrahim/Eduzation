const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Ranking2Schema = new Schema({
  name: String,
  cgpa: String,
  department: String,
});

module.exports = mongoose.model("Ranking2", Ranking2Schema);
