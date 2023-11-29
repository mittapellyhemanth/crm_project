const mongoose = require("mongoose");

const AdminModel =new mongoose.Schema({
    addedAdminId:{type: String, required: true},
    Name: { type: String, required: true },
    StartDate: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    aadhaar: { type: Number, required: true},
    designation:{type:String,required:true},
    unique_id:{type:String,required:true},
    CompanyName:{type:String,required:true},
    CompanyLocation:{type:String,required:true},
    Industry:{type:String,required:true},
    Website:{type:String,required:true},
})




const superAdminModel = mongoose.model("AdminModel", AdminModel);

module.exports = superAdminModel;
