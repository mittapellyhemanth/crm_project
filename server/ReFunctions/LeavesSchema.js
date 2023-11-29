const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function LeaveSchema(AddModel) {
    const schema = new Schema({
        EmployeeName:{type:String},
        employeeId:{type:String},
        ReasonForAbsent: { type: String},
        ChooseDate: { type: String},
        NoOfDays: { type: Number},
        TotalNumOfDays:{type: Number},
        Status:{type:String},
      
        });

    return mongoose.model(AddModel, schema);
}

module.exports = LeaveSchema
