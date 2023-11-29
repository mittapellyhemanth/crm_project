const express = require('express');
const mongoose = require('mongoose');

const SuperAdmin =new mongoose.Schema({
    Name: { type: String, required: true },
    StartDate: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    aadhaar: { type: Number, required: true},
    designation:{type:String,required:true},
    unique_id:{type:String,required:true},
  
})
const superAdminModel = mongoose.model("SuperAdmin",SuperAdmin)
module.exports = superAdminModel