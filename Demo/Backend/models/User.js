const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: "",
  },

googleId:{
  type: String,
  default:""
},

provider:{
  type: String,
  enum: ["local",  "google"],
  default: "local"
},
  

  mobile: {
    type: String,
    default: "",
  },

  address: {
    type: String,
    default: "",
  },

  profileImage: {
    type: String,
    default: "",
  },

});

module.exports =
  mongoose.model("User", userSchema);