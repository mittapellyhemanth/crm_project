const express = require("express");
const User = require("../../Schemas/CEO/Register");  //schema
const SuperAdminLogin = {};

const LoginDetails = require('../../Routers/Login/Login')

SuperAdminLogin.post = async (req,res)=>{
    // console.log(req);
    const loginCred =req.body;
    // console.log(loginCred.email);
    User.findOne({ email: loginCred.email }).then(user => {
       return LoginDetails( req,res,user);
    }).catch(err => {
        // console.log(err);
        res.status(500).json({
            message: "Internal server Error!!"
        })
    })
}