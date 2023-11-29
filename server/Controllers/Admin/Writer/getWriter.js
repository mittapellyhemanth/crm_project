const getWriter = require('../../../Schemas/Admin/Employees/Writer');
const Get = require('../../CRUD/GET');
const getOne = require('../../CRUD/getOne');

const WriterDetails = {};
WriterDetails.get = async(req,res)=>{
    try {
        
      return  Get(req,res,getWriter)
        
    } catch (error) {
        return error
    }
}

WriterDetails.getOne = async(req,res)=>{
  try {
  return  getOne(req,res,getWriter)
      
  } catch (error) {
      return error
  }
}


const searchFilter = require('../../../Schemas/Employee/ProjectSubmit/WriterProject');
WriterDetails.getWriterProject = async(req,res)=>{
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


module.exports = WriterDetails