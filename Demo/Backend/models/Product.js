const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  quantity: {
    type: Number,
    default:0,
    min:0
  },

  image:{
    type: String,
    default:"",
    
},


// userId:{
//   type: mongoose.Schema.Types.ObjectId,
//   ref:"User"
// }

});

module.exports = mongoose.model(
  "Product",
  productSchema
);