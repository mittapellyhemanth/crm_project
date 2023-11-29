const addSEO = require('../../../Schemas/Admin/Employees/SEO');
const Post = require('../../CRUD/POST');

const PostSeo = {};
PostSeo.post = async(req,res)=>{
  const  addedAdminId = req.params.id;
    try {
        
      return  Post(req,res,addSEO,'SEO',addedAdminId)
        
    } catch (error) {
        return error
    }
}
module.exports = PostSeo