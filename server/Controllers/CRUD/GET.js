
// const ProjectsDetails = require("../../Schemas/Admin/AddProjects"); //schema


const GET = async (req, res,designation) => {
  try {
//     console.log("Getting the properties");
// console.log(req.params,"params");
    await designation.find({addedAdminId:req.params.id}).then((result) => {
        res.status(200).json({
          message: "Property details fetched successfully",
          data: result,
        });
      });
  } catch (error) {
    
      return error
   
  }
};

module.exports = GET;
