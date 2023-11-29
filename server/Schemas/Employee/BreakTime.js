const mongoose = require("mongoose");

const Break =new mongoose.Schema({
  
   EmployeeId:{type:String},
   Date:{type:String},
   BreakTaken:{type:String,required:true},
  
})

const BreakModel = mongoose.model("Break", Break);

module.exports = BreakModel;