const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pgmSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("Pgm", pgmSchema);
