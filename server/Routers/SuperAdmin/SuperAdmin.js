const express = require("express");
const auth = require('../../Authentication/Auth')
const SuperAdminRouter = express.Router();
const User = require('../../Schemas/CEO/Register')
require('dotenv').config();
const LoginDetails = require('../Login/Login');

const RegisterSuperAdmin = require('../Register/Register')
SuperAdminRouter.post('/Register',RegisterSuperAdmin.post)


SuperAdminRouter.post("/login", async (req, res) => {
    const loginCred =req.body;
    console.log(req);
    User.findOne({ email: loginCred.email }).then(user => {
        LoginDetails( req,res,user);
    }).catch(err => {
        // console.log(err);
        res.status(500).json({
            message: "Internal server Error!!"
        })
    })
})



const postAdmin = require('../../Controllers/superAdmin/addAdmin')
SuperAdminRouter.post('/addAdmin/:id',auth,postAdmin.post);

const getAdmins = require('../../Controllers/superAdmin/getAdmins');
SuperAdminRouter.get('/admins/:id',auth,getAdmins.get);

const getOneAdmin = require('../../Controllers/superAdmin/getAdmins');
SuperAdminRouter.get('/admin/view/:id',auth,getOneAdmin.getOne)


const updateOneAdmin = require('../../Controllers/superAdmin/getAdmins');
SuperAdminRouter.put('/admin/update/:id',auth,updateOneAdmin.update)



const DeleteOneAdmin = require('../../Controllers/superAdmin/deleteAdmin');
SuperAdminRouter.delete('/admin/delete/:id',DeleteOneAdmin.deleteOne)

module.exports = SuperAdminRouter;