const mongoose = require("mongoose");

const { Schema } = mongoose;
const boardSchema = new Schema({
    title: {
        type: String,
        required: true,
        
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
      type: Date,
      required: true,
      
    },
    // number:{
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    contents:{
      type: String,
      required: true,
     
    }
});

module.exports = mongoose.model("Board", boardSchema);