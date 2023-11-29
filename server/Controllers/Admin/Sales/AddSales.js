const addSales = require('../../../Schemas/Admin/Employees/Sales');
const Post = require('../../CRUD/POST');

const PostSales = {};
PostSales.post = async(req,res)=>{
  const  addedAdminId = req.params.id;
    try {
        
      return  Post(req,res,addSales,'SALES',addedAdminId)
        
    } catch (error) {
        return error
    }
}
module.exports = PostSales;