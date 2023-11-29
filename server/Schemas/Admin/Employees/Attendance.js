const mongoose = require("mongoose");

const AttendanceOfEmployee =new mongoose.Schema({
    EmployeeId:{type:String},
    Date: { type: String},
    LoginTime: { type: String},
    LogoutTime: { type: String},
    TotalBreak: { type: String },
    TotalWorkTime: { type: String },
  
})

const AttendanceModel = mongoose.model("AttendanceOfEmployee", AttendanceOfEmployee);

module.exports = AttendanceModel;