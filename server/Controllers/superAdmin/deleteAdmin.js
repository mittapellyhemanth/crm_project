const AdminsSchema = require('../../Schemas/SuperAdmin/AddAdmin')
const Delete = require('../CRUD/Delete')

const deleteAdmin ={};

deleteAdmin.deleteOne = async(req,res)=>{
    try {
        
      return  Delete(req,res,AdminsSchema)
        
    } catch (error) {
        return error
    }
  }

 module.exports = deleteAdmin