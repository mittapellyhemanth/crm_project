const getSeo = require('../../../Schemas/Admin/Employees/SEO');
const Get = require('../../CRUD/GET');
const getOne = require('../../CRUD/getOne');
const getOneEmployee = require('../../CRUD/getOne')
const SeoDetails = {};
SeoDetails.get = async(req,res)=>{
    try {
        
      return  Get(req,res,getSeo)
        
    } catch (error) {
        return error
    }
}

SeoDetails.getOne = async(req,res)=>{
  // console.log(req.params);
  try {
  return  getOne(req,res,getSeo)
      
  } catch (error) {
      return error
  }
}
SeoDetails.getOneSeo = async(req,res)=>{
  try {
  return  getOneEmployee(req,res,getSeo)
      
  } catch (error) {
      return error
  }
}
const searchFilter = require('../../../Schemas/Employee/ProjectSubmit/SeoProject');
SeoDetails.getSeoProject = async(req,res)=>{
  try {
    const { fromDate, toDate } = req.query; // Assuming dates are passed as query parameters
   
    await searchFilter.find({ Date: { $gte: fromDate, $lte: toDate } }).then((result)=>{
      // console.log(result,'data');
      res.json({
        data:result
      });
    })
   
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}




module.exports = SeoDetails