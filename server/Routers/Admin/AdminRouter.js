const express = require("express");
const auth = require("../../Authentication/Auth");
const AddProject = require("../../Schemas/Admin/AddProjects");
const AdminRouter = express.Router();
const getEmployee = require("../../Controllers/Admin/SEO/GetSeo"); // get SEO
const getDesginer = require("../../Controllers/Admin/Designer/GetDesigner"); //get Designer
const getWriter = require("../../Controllers/Admin/Writer/getWriter"); //get Writer
require("dotenv").config();

const AddAdminModel = require("../../Schemas/SuperAdmin/AddAdmin");
//..................LOGIN ADMIN .................................................................................
const LoginDetails = require("../Login/Login");

AdminRouter.post("/login", async (req, res) => {
  const loginCred = req.body;
  // console.log(loginCred, "adminlog");
  AddAdminModel.findOne({ email: loginCred.email })
    .then((user) => {
      // console.log(req.body, "login");

      LoginDetails(req, res, user);
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).json({
        message: "Internal server Error!!",
      });
    });
});

//..................Add project .................................................................................
AdminRouter.post("/addProject/:id", auth, async (req, res) => {
  try {
    const {
      projectName,
      websiteAddress,
      clientName,
      startDate,
      monthlyPrice,
      empyDesignation,
      employeeAlloted,
      employID,
    } = req.body;
    
if ( req.body.projectName && req.body.clientName && req.body.employeeAlloted && employID) {
  req.body.projectName = req.body.projectName.toUpperCase();
  req.body.employeeAlloted = req.body.employeeAlloted.toUpperCase();
  req.body.clientName =req.body.clientName.toUpperCase();
  req.body.employID =req.body.employID.toUpperCase();
}
   
      const AddedprojectData = new AddProject({
        addedAdminId: req.params.id,
       ...req.body,
        date: new Date().toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      });
      if (empyDesignation) {
        await AddedprojectData.save();
        res.status(200).json({
          message: "AddedprojectData saved sucessfully",
        });
      } else {
        res.status(400).json({
          message: "please check details",
        });
      }
   
    
  } catch (err) {
    res.status(500).json({
      message: "unable to save AddedprojectData",
      // detail: err   //this line to be used to check error
    });
    // console.log(err);
  }
});






//..................get PROJECTS .................................................................................
const getProjects = require("../../Controllers/Admin/getProject");
AdminRouter.get("/getProject/:id", auth, getProjects.get);
AdminRouter.get("/getProject/:addedAdminId/:projectName", getProjects.getOne);

const getProject = async(req,res,Model)=>{
  const name = req.params.projectName.toUpperCase()
  try {
    let result;
    if(req.params.id){

       result =  await Model.findOne({projectName:name,employID:req.params.id})
    }
    else{
      result =  await Model.findOne({projectName:name})
    }
    if(result){
      res.status(200).json({
        data:result
      })
      // console.log(result);
    }
    else{
     
      res.status(400).json({
        err:"Enter Correct Name"
      })
    }
  } catch (error) {
    // console.log('eeeee');
    res.status(500).json({
      err:"Internal Server Error"
    })
  }
}


AdminRouter.get("/oneProject/:id/:projectName",async(req,res)=>{    // search
  await getProject(req,res,AddProject)
})
AdminRouter.get("/oneProject/:projectName",async(req,res)=>{    // search
  await getProject(req,res,AddProject)
})
//.....SEO PROJECTs STATUS 

const seoProjectOne = require('../../Schemas/Employee/ProjectSubmit/SeoProject')
AdminRouter.get("/SeoOneProject/:id/:projectName",async(req,res)=>{    // search
 
  try {
    await seoProjectOne.find({EmployeeId:req.params.id,ProjectTitle:req.params.projectName}).then((result)=>{
      res.status(200).json({
        data:result
      })
      // console.log(result);
    })
  } catch (error) {
    
  }
})
const WriterProjectOne = require('../../Schemas/Employee/ProjectSubmit/WriterProject')
AdminRouter.get("/WriterOneProject/:id/:projectName",async(req,res)=>{    // search
 
  try {
    await WriterProjectOne.find({EmployeeId:req.params.id,ProjectTitle:req.params.projectName}).then((result)=>{
      res.status(200).json({
        data:result
      })
      // console.log(result);
    })
  } catch (error) {
    
  }
}) 
const DesignerProjectOne = require('../../Schemas/Employee/ProjectSubmit/DesignerProject')
AdminRouter.get("/DesignerOneProject/:id/:projectName",async(req,res)=>{    // search
  
  try {
    await DesignerProjectOne.find({EmployeeId:req.params.id,ProjectTitle:req.params.projectName}).then((result)=>{
      res.status(200).json({
        data:result
      })
      // console.log(result);
    })
  } catch (error) {
    
  }
}) 
const SalesProjectOne = require('../../Schemas/Employee/ProjectSubmit/SalesProject')
AdminRouter.get("/SalesOneProject/:id/:projectName",async(req,res)=>{    // search

  try {
    await SalesProjectOne.find({EmployeeId:req.params.id,ProjectTitle:req.params.projectName}).then((result)=>{
      res.status(200).json({
        data:result
      })
      // console.log(result);
    })
  } catch (error) {
    
  }
}) 

//..................Add,Get seo Employee .................................................................................
const postEmployee = require("../../Controllers/Admin/SEO/AddSeo");
AdminRouter.post("/addSeo/:id", auth, postEmployee.post);
//....get Employee .....

AdminRouter.get("/getSeo/:id", auth, getEmployee.get);//getting with id

// const getOneEmployee = require('../../Controllers/Admin/SEO/GetSeo')
const getEmployeeSeo = require('../../Schemas/Admin/Employees/SEO')
AdminRouter.get("/oneEmpy/getSeo/:Name",async(req,res)=>{
  try {
    const name = req.params.Name.toUpperCase()
    // console.log(name);
 const result =    await getEmployeeSeo.findOne({Name:name})
    if(result){
      res.status(200).json({
        data:result
      })
      // console.log(result);
    }
    else{
     
      res.status(400).json({
        err:"Enter Correct Name"
      })
    }
  } catch (error) {
    console.log('eeeee');
    res.status(500).json({
      err:"Internal Server Error"
    })
  }
});//getting only employee name
const seoProjectDetails = require("../../Controllers/Admin/SEO/GetSeo");
AdminRouter.get("/search/date", seoProjectDetails.getSeoProject);


//..................Add,Get DESIGNER .................................................................................
const addDesigner = require("../../Controllers/Admin/Designer/AddDesigner");
AdminRouter.post("/addDesigner/:id", auth, addDesigner.post);
//GET designer

AdminRouter.get("/getDesigner/:id", getDesginer.get);

const getOneDesginer = require("../../Controllers/Admin/Designer/GetDesigner");
AdminRouter.get("/getOneDesigner/:id", auth, getOneDesginer.getOne);


const DesignerProjectDetails = require("../../Controllers/Admin/Designer/GetDesigner");
AdminRouter.get("/designer/search/date",  DesignerProjectDetails.getDesignerProject);


const getEmployeeDesigner = require('../../Schemas/Admin/Employees/Designer')
AdminRouter.get("/oneEmpy/getDesigner/:Name",async(req,res)=>{
  const name = req.params.Name.toUpperCase()
  try {
   const result = await getEmployeeDesigner.findOne({Name:name})
      if(result){
        res.status(200).json({
          data:result
        })
        // console.log(result);
      }
      else{
       
        res.status(400).json({
          err:"Enter Correct Name"
        })
      }
    } catch (error) {
      console.log('eeeee');
      res.status(500).json({
        err:"Internal Server Error"
      })
    }
});//getting only employee name


//..................Add,Get Writer .................................................................................
const addWriter = require("../../Controllers/Admin/Writer/addWriter");
AdminRouter.post("/addWriter/:id", auth, addWriter.post);


AdminRouter.get("/getWriter/:id", auth, getWriter.get);

const getOneWriter = require("../../Controllers/Admin/Writer/getWriter");
AdminRouter.get("/getOneWriter/:id", auth, getOneWriter.getOne);

const getOneSeo = require("../../Controllers/Admin/SEO/GetSeo");
AdminRouter.get("/getOneSeo/:id", auth, getOneSeo.getOne);

const getOneSales = require("../../Controllers/Admin/Sales/GetSales");
AdminRouter.get("/getOneSales/:id", auth, getOneSales.getOne);

const WriterProjectDetails = require("../../Controllers/Admin/Writer/getWriter");
AdminRouter.get("/writer/search/date",  WriterProjectDetails.getWriterProject);
// tracking attendance


const getEmployeeWriter = require('../../Schemas/Admin/Employees/Writer')
AdminRouter.get("/oneEmpy/getWriter/:Name",async(req,res)=>{
  const name = req.params.Name.toUpperCase()
  try {
   const result =  await getEmployeeWriter.findOne({Name:name})
   if(result){
    res.status(200).json({
      data:result
    })
    // console.log(result);
  }
  else{
   
    res.status(400).json({
      err:"Enter Correct Name"
    })
  }
} catch (error) {
  // console.log('eeeee');
  res.status(500).json({
    err:"Internal Server Error"
  })
}
});//getting only employee name


//..................Add,Get SALES .................................................................................


const postSales = require("../../Controllers/Admin/Sales/AddSales");
AdminRouter.post("/addSales/:id", postSales.post);

const getSales = require('../../Controllers/Admin/Sales/GetSales');
AdminRouter.get("/getSales/:id", getSales.get);

const Sales = require('../../Schemas/Admin/Employees/Sales');
AdminRouter.get("/sales/oneEmpy/getSales/:Name", async(req,res)=>{
  // console.log(req.params.Name,"params");
  const name = req.params.Name.toUpperCase()
  try {
   const result = await Sales.findOne({Name:name})
      if(result){
        res.status(200).json({
          data:result
        })
        // console.log(result);
      }
      else{
       
        res.status(400).json({
          err:"Enter Correct Name"
        })
      }
    } catch (error) {
      // console.log('eeeee');
      res.status(500).json({
        err:"Internal Server Error"
      })
    }
});//getting only employee name;
//....................................................................................project view 
const ProjectOneView = async(req,res,model)=>{
  try {
    await model.findById(req.params._id).then((result)=>{
      res.status(200).json({
        data:result
      })
      // console.log(result);
    })
  } catch (error) {
    
    res.status(500).json({
      message: "Internal server error",
      err: error
    });
  }
}

const GetoneSalesProjectView = require('../../Schemas/Employee/ProjectSubmit/SalesProject')
AdminRouter.get("/salesProject/One/View/:_id",async(req,res)=>{
 
 await ProjectOneView(req,res,GetoneSalesProjectView);
})


const GetoneSeoProjectView = require('../../Schemas/Employee/ProjectSubmit/SeoProject')
AdminRouter.get("/seoProject/One/View/:_id",async(req,res)=>{

 await ProjectOneView(req,res,GetoneSeoProjectView);
})

const GetoneWriterProjectView = require('../../Schemas/Employee/ProjectSubmit/WriterProject')
AdminRouter.get("/writerProject/One/View/:_id",async(req,res)=>{

 await ProjectOneView(req,res,GetoneWriterProjectView);
})


const GetoneDesignerProjectView = require('../../Schemas/Employee/ProjectSubmit/DesignerProject')
AdminRouter.get("/designerProject/One/View/:_id",async(req,res)=>{
 
 await ProjectOneView(req,res,GetoneDesignerProjectView);
})







const AttendanceOfEmployee = require("../../Schemas/Admin/Employees/Attendance");
AdminRouter.post("/trackAttendance/:id", async (req, res) => {
  try {
    const { Date, LoginTime, LogoutTime, TotalBreak, TotalWorkTime } = req.body;

    const TrackAttendance = new AttendanceOfEmployee({
      EmployeeId: req.params.id,
      Date,
      LoginTime,
      LogoutTime,
      TotalBreak,
      TotalWorkTime,
    });

    await TrackAttendance.save()
    
  } catch (err) {
   
    // console.log(err);
  }
});

AdminRouter.get("/employe/Attendance/:id",async(req,res)=>{
    try {
        await AttendanceOfEmployee.find({EmployeeId:req.params.id}).then((result)=>{
         res.status(200).json({
            data:result
         })
        })
    } catch (error) {
        // console.log(error)
    }
})






module.exports = AdminRouter;
