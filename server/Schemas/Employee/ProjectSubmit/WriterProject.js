const mongoose = require("mongoose");

const WriterProjectSubmit =new mongoose.Schema({
  Name:{type:String},
    EmployeeId:{type:String},
    ProjectTitle:{ type: String },
    clientName: { type: String, required: true },
    ContentTitle: { type: String},
    ContentLink: { type: String},
    Type: { type: String},
    Plagiarism: { type: Number },
    Ai: { type: Number },
    WordCount: { type: Number },
    Date:{type:String},
    
    },
    {
      timestamps  : true,
    })

const WriterProjectsModel = mongoose.model("WriterProjectSubmit", WriterProjectSubmit);

module.exports = WriterProjectsModel;