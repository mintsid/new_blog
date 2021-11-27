const mongoose = require("mongoose");

const { Schema } = mongoose;
const boardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
    unique: false,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  contents: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Board", boardSchema);
