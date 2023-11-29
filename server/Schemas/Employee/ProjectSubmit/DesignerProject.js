
const mongoose = require("mongoose");

// ProjectName:{type:String},
const designerProjectSubmit =new  mongoose.Schema({
  Name:{type:String},
  EmployeeId:{type:String},
  clientName: { type: String, required: true },
  ProjectTitle:{ type: String },
  ImgTitle:{
    type: String,
    required: true,
  },
  PostImage:{
    type: String,
    required: true,
  },
  Type :{
    type : String,
    required: true,
    },
  
  description:{
    type: String,
    required: true,
  },
  Date:{type:String},

},
{
  timestamps  : true,
}
);

const DesignerPostModel = mongoose.model("designerProjectSubmit", designerProjectSubmit);

module.exports = DesignerPostModel;
