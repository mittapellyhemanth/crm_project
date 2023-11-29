const addWriter = require('../../../Schemas/Admin/Employees/Writer');
const Post = require('../../CRUD/POST');

const PostWriter = {};
PostWriter.post = async(req,res)=>{
  const  addedAdminId = req.params.id;
  // console.log(req.body);
    try {
        
      return  Post(req,res,addWriter,"WRITER",addedAdminId)
        
    } catch (error) {
        return error
    }
}
module.exports = PostWriter