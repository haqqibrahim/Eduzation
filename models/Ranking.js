const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RankingSchema = new Schema({
  name: String,
  cgpa: String,
  department: String,
});

module.exports = mongoose.model("Ranking", RankingSchema);
