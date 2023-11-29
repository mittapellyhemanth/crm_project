
const mongoose = require("mongoose");

// ProjectName:{type:String},
const SalesProjectSubmit =new  mongoose.Schema({
  Name:{type:String},
  EmployeeId:{type:String},
  clientName: { type: String },
  ProjectTitle:{ type: String },
  
  Location:{
    type: String,
    required: true,
  },
  Name:{
    type: String,
    required: true,
  },
  PhoneNum:{
    type: Number,
    required: true,
  },
  Email:{
    type: String,
    required: true,
  },
  Source:{
    type: String,
    required: true,
  },
  Enquiry:{
    type: String,
    required: true,
  },
  Remark:{
    type : String,
    required: true,
    },
  
   
  Date:{type:String},

},
{
  timestamps  : true,
}
);

const SalesPostModel = mongoose.model("SalesProjectSubmit", SalesProjectSubmit);

module.exports = SalesPostModel;
