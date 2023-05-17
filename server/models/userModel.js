const mongoose = require("mongoose");
const { Schema, model } = mongoose;


const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    max: 50,
  },
  picturePath: {
    type: String,
    default: ''
  },
  favorites: [{type:mongoose.Schema.Types.Mixed, ref:'Listing'}]
}, { timestamps: true });

const userModel = model("userModel", userSchema);

module.exports = userModel;
