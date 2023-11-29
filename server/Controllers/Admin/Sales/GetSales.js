const getSales = require('../../../Schemas/Admin/Employees/Sales');
const Get = require('../../CRUD/GET');
const getOne = require('../../CRUD/getOne');
const getOneEmployee = require('../../CRUD/getOne')
const SalesDetails = {};
SalesDetails.get = async(req,res)=>{
    try {
        
      return  Get(req,res,getSales)
        
    } catch (error) {
        return error
    }
}

SalesDetails.getOne = async(req,res)=>{
  // console.log(req.params);
  try {
  return  getOne(req,res,getSales)
      
  } catch (error) {
      return error
  }
}
SalesDetails.getOneSales = async(req,res)=>{
  try {
  return  getOneEmployee(req,res,getSales)
      
  } catch (error) {
      return error
  }
}
const searchFilter = require('../../../Schemas/Employee/ProjectSubmit/SeoProject');
SalesDetails.getSeoProject = async(req,res)=>{
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




module.exports = SalesDetails