const mongoose = require("mongoose");

const { Schema } = mongoose;
const boardSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    author:{
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
      unique: true
    },
    number:{
      type: String,
      required: true,
      unique: true,
    },
    contents:{
      type: String,
      required: true,
      unique: true,
    }
});

module.exports = mongoose.model("Board", boardSchema);