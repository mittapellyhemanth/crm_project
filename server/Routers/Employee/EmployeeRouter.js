const express = require("express");
const projectSchema = require("../../Schemas/Employee/Projects"); //schema

const Seo = require("../../Schemas/Admin/Employees/SEO");
const Designer = require("../../Schemas/Admin/Employees/Designer");
const Writer = require("../../Schemas/Admin/Employees/Writer");
const Sales = require("../../Schemas/Admin/Employees/Sales");
const LoginDetails = require("../Login/Login");
const getProjects = require("../../Schemas/Admin/AddProjects");

const EmployeeRouter = express.Router();
const auth = require("../../Authentication/Auth");
require("dotenv").config();




EmployeeRouter.post("/login", async (req, res) => {
  const loginCred = req.body;
  try {
    const SeoEmployee = await Seo.findOne({ email: loginCred.email });
    if (SeoEmployee) {
      return LoginDetails(req, res, SeoEmployee);
    }
    const DesignerEmployee = await Designer.findOne({ email: loginCred.email });

    if (DesignerEmployee) {
      return LoginDetails(req, res, DesignerEmployee);
    }
    const WriterEmployee = await Writer.findOne({ email: loginCred.email });
    if (WriterEmployee) {
      return LoginDetails(req, res, WriterEmployee);
    }
    const SalesEmployee = await Sales.findOne({ email: loginCred.email });
    if (SalesEmployee) {
      return LoginDetails(req, res, SalesEmployee);
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error!!",
      error: err,
    });
  }
});

EmployeeRouter.post("/project", auth, async (req, res) => {
  try {
    const { BackLink, Keyword, Type, Status, Remark, TimeTaken } = req.body;

    const projectData = new projectSchema({
      BackLink,
      Keyword,
      Type,
      Status, //need to get the conditions
      Remark,
      TimeTaken,
      date: new Date().toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    });

    projectData.save();
    res.status(200).json({
      message: "data saved sucessfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "unable to save data",
      // detail: err   //this line to be used to check error
    });
    // console.log(err);
  }
});




// get projects
EmployeeRouter.get("/details/:id", async (req, res) => {
  // console.log(req);
  try {
    const data = await getProjects.find({ employID: req.params.id }).sort({ createdAt: -1 });;
    res.status(200).json(data);
    // console.log(data, "data");
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      err: error,
    });
  }
});

///project seo submit

const SeoProjectSubmit = require("../../Schemas/Employee/ProjectSubmit/SeoProject");

EmployeeRouter.post("/project/submit/:id/:projectName/:Name/:clientName", async (req, res) => {
  // console.log(req.body,req.params);
  try {
    const emplyId = req.params.id.toUpperCase();

   
    // console.log(formDataArray, "formDataArray");

    // Iterating through form data array and creating new project documents
  const {BackLink,Keyword,Type,Status,Remark,TimeTaken} = req.body

        if (BackLink && Keyword && Type && Status && Remark && TimeTaken) {
          const project = new SeoProjectSubmit({
            clientName:req.params.clientName,
            Name:req.params.Name,
            EmployeeId: emplyId,
            ProjectTitle:req.params.projectName,
            ...req.body
           
          });
        
          await project.save();
          res.status(200).json({
            data:project
          });
        }
      
    
  } catch (error) {
    // console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
//....................................................get project status function   ProjectStatus()
async function ProjectStatus(req,res,Model){
  try {
    // console.log(req.params.id, "id");
    const data = await Model.find({ EmployeeId: req.params.id }).sort({ createdAt: -1 });
    // console.log(data);
   return res.status(200).json({
      data: data,
      message: "got the status",
    });
  } catch (error) {
    return error
  }
}
EmployeeRouter.get("/proj/status/:id", async (req, res) => {
  await ProjectStatus(req,res,SeoProjectSubmit)
});
//....................................................get project Admin checks status function   ProjectDetailsStatus()
async function ProjectDetailsStatus(req,res,Model){
  try {
  
    const data = await Model.find({ EmployeeId: req.params.id,ProjectTitle:req.params.projectName }).sort({ createdAt: -1 });
    
   return res.status(200).json({
      data: data,
      message: "got the status",
    });
  } catch (error) {
    return error
  }
}
//.......................................SEO......................................................................
EmployeeRouter.get("/proj/status/:id/:projectName", async (req, res) => {
  await ProjectDetailsStatus(req,res,SeoProjectSubmit)
});

EmployeeRouter.get("/proj/view/:id", async (req, res) => {
  try {
   
    await SeoProjectSubmit.findOne({_id:req.params.id}).sort({ createdAt: -1 }).then((result)=>{
       res.status(200).json({
        data: result,
        message: "got the status",
      });
    })
    
  
  } catch (error) {
    return error
  }
});
//......................................Writer project post get  ......................

const WriterProjectSubmit = require("../../Schemas/Employee/ProjectSubmit/WriterProject");
EmployeeRouter.post("/writer/project/submit/:id/:projectName/:Name/:clientName", async (req, res) => {
  try {
   
    const emplyId = req.params.id.toUpperCase();

    

    // Iterating through form data array and creating new project documents
    
        const {  ContentTitle, ContentLink, Type, Plagiarism, Ai, WordCount } = req.body;

        if (ContentTitle && ContentLink && Type && Plagiarism && Ai && WordCount) {
          const project = new WriterProjectSubmit({
            clientName:req.params.clientName,
            Name:req.params.Name,
            ProjectTitle:req.params.projectName,
            EmployeeId: emplyId,
            ...req.body
           
          });
        
          await project.save();
          res.status(200).json(project);
        }
      
    
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
// getting writer project status
EmployeeRouter.get("/writer/proj/status/:id", async (req, res) => {
  await ProjectStatus(req,res,WriterProjectSubmit)
});



//......................................Sales project post get  ......................

const SalesProjectSubmit = require("../../Schemas/Employee/ProjectSubmit/SalesProject");
EmployeeRouter.post("/sales/project/submit/:id/:projectName/:Name/:clientName", async (req, res) => {
  try {
  
    const emplyId = req.params.id.toUpperCase();
 // Iterating through form data array and creating new project documents
        const {Location,Name,PhoneNum,Email,Source, Enquiry, Remark } = req.body;

        if (Location && Name && PhoneNum && Email && Enquiry && Remark   ) {
          const project = new SalesProjectSubmit({
            Name:req.params.Name,
            ProjectTitle:req.params.projectName,
            EmployeeId: emplyId,
            clientName:req.params.clientName,
            ...req.body
           
          });
        
          await project.save();
          res.status(200).json(project);
        }
      
    
  } catch (error) {
    // console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
// getting sales project status
EmployeeRouter.get("/sales/proj/status/:id", async (req, res) => {
  await ProjectStatus(req,res,SalesProjectSubmit)
});








const breakTime = require("../../Schemas/Employee/BreakTime")
EmployeeRouter.post("/breakTime/:id",async(req,res)=>{
       try {
       
            const {Date, BreakTaken} = req.body;
          const timeData = new breakTime({
            EmployeeId:req.params.id,
            Date,
            BreakTaken
          })
          await timeData.save();
         
          res.status(200).json(timeData);
       } catch (error) {
        // console.log(error);
       }
})

EmployeeRouter.get("/previousbreakTime/:id/:date",async(req,res)=>{
  try {
  
    
     
     await breakTime.find({EmployeeId:req.params.id,Date:req.params.date} ).sort({ createdAt: -1 }).then((result)=>{

       res.status(200).json(result);
     })
    //  console.log(timeData);
  } catch (error) {
  //  console.log(error);
  }
})

EmployeeRouter.delete("/previousbreakTime/taken/:id/:date",async(req,res)=>{
  try {
  
    
     
     await breakTime.deleteMany({EmployeeId:req.params.id,Date:req.params.date} ).then((result)=>{

       res.status(200).json(result);
     })
    //  console.log(timeData);
  } catch (error) {
  //  console.log(error);
  }
})



module.exports = EmployeeRouter;
// 65449478aae261874b96830a
