const mongoose = require("mongoose");

const SeoProjectSubmit =new mongoose.Schema({
  Name:{type:String},
    EmployeeId:{type:String},
    ProjectTitle:{ type: String },
    clientName: { type: String, required: true },
    BackLink: { type: String},
    Keyword: { type: String },
    Type: { type: String },
    Status: { type: String },
    Remark: { type: String },
    TimeTaken: { type: String },
    Date:{type:String},
    
    },
    {
      timestamps  : true,
    })

const SeoProjectsModel = mongoose.model("SeoProjectSubmit", SeoProjectSubmit);

module.exports = SeoProjectsModel;