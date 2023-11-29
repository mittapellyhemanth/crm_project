const express = require("express");
const addSuperAdmin = require('../../Schemas/CEO/Register');
const Post = require('../../Controllers/CRUD/POST');

const PostSuperAdmin = express.Router();
PostSuperAdmin.post = async(req,res)=>{

    try {
        //here we  will send request,response,and usermodel and type,data
      return  Post(req,res,addSuperAdmin,'SUPER ADMIN')   
        
    } catch (error) {
        return error
    }
}
module.exports = PostSuperAdmin