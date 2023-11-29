const express = require("express");
const addAdmin = require('../../Schemas/SuperAdmin/AddAdmin');
const Post = require('../../Controllers/CRUD/POST');

const PostAdmin = express.Router();;
PostAdmin.post = async(req,res)=>{
  const  addedAdminId = req.params.id;
  
    try {
        //here we  will send request,response,and usermodel and type,data
      return  Post(req,res,addAdmin,'ADMIN',addedAdminId)   
        
    } catch (error) {
        return error
    }
}
module.exports = PostAdmin