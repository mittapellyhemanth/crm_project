const addDesginer = require('../../../Schemas/Admin/Employees/Designer');
const Post = require('../../CRUD/POST');

const PostDesigner = {};
PostDesigner.post = async(req,res)=>{
  const  addedAdminId = req.params.id;
    try {
        
      return  Post(req,res,addDesginer,'DESIGNER',addedAdminId)
        
    } catch (error) {
        return error
    }
}
module.exports = PostDesigner