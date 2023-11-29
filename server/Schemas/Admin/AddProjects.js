const mongoose = require("mongoose");

const AddProjects =new mongoose.Schema({
    addedAdminId:{type: String, required: true},
    projectName: { type: String, required: true },
    websiteAddress: { type: String, required: true },
    clientName: { type: String, required: true },
    startDate: { type: String, required: true },
    monthlyPrice: { type: String, required: true },
    empyDesignation:{type: String, required: true},
    employeeAlloted: { type: String, required: true },
    employID:{type:String,required:true},
    date : {
        type: String,
        default: Date.now
    },
})

const Admin_Add_ProjectssModel = mongoose.model("AddProjects", AddProjects);

module.exports = Admin_Add_ProjectssModel;