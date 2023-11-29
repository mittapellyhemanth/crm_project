const getDesginer = require('../../../Schemas/Admin/Employees/Designer');
const Get = require('../../CRUD/GET');
const getOne = require('../../CRUD/getOne')
const DesignerDetails = {};

DesignerDetails.get = async(req,res)=>{
    try {
        
      return  Get(req,res,getDesginer)
        
    } catch (error) {
        return error
    }
}

DesignerDetails.getOne = async(req,res)=>{
  try {
  return  getOne(req,res,getDesginer)
      
  } catch (error) {
      return error
  }
}

const searchFilter = require('../../../Schemas/Employee/ProjectSubmit/DesignerProject');
DesignerDetails.getDesignerProject = async(req,res)=>{
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
module.exports = DesignerDetails