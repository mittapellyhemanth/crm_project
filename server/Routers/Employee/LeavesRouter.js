const express = require("express");

const LeavesRouter =express.Router();



//posting leave
const LeavesPost = async(req,res,LeavesModel)=>{
  try {
 
    const { ReasonForAbsent, ChooseDate, NoOfDays,TotalNumOfDays } = req.body;

    const LeaveData = new LeavesModel({
      EmployeeName:req.params.Name,
      employeeId:req.params.empyId,
      ReasonForAbsent,
      ChooseDate,
      NoOfDays,
      TotalNumOfDays
    });

    LeaveData.save();
    res.status(200).json({
      message: " Leave data saved sucessfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "unable to save Leave data",
      // detail: err   //this line to be used to check error
    });
    // console.log(err);
  }
}


const UpdateStatus = async(req,res,updateModel)=>{
    try {
        const id = req.params._id
        updatedData = req.body
        const updateStatus = await updateModel.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updateStatus) {
            res.status(400).json({
                message: "No such Id found"
            })
        }
        res.status(200).json(updateStatus) // would return updated data
        // console.log(updateStatus)
    }
    catch (err) {
        // console.log(err);
        res.status(500).json({
            message: "internal server error"
        })
    }
      // console.log(err);
    
  }
  
const getLeaves = async(req,res,getModel)=>{
    try {
    
        const result =  await getModel.find()
        if(result){
         res.status(200).json({
           data:result
         })
        }else{
         res.status(400).json({
           err:"Unable to fetch data"
         })
        }
       } catch (error) {
         res.status(500).json({
           message: "unable to save Leave data",
           // detail: err   //this line to be used to check error
         });
         // console.log(err);
       }
}

const getOneLeave = async(req,res,getModel)=>{
    try {
    const id =req.params._id;
  
    const result =  await getModel.findOne({_id:id})
    if(result){
     res.status(200).json({
       data:result
     })
    }else{
     res.status(400).json({
       err:"Unable to fetch data"
     })
    }
   } catch (error) {
     res.status(500).json({
       message: "unable to save Leave data",
       // detail: err   //this line to be used to check error
     });
     // console.log(err);
   }
}


// ..........................................GET,POST,GETONE,update LEAVES OF SEO ..................................................................................
const SeoLeavesPost = require('../../Schemas/Employee/LeaveSubmission/SeoLeaves')
LeavesRouter.post("/seo/:empyId/:Name", async (req, res) => {

    await LeavesPost(req,res,SeoLeavesPost) 

});



LeavesRouter.get("/seo/getleaves", async(req,res)=>{
    await getLeaves(req,res,SeoLeavesPost) 
})

LeavesRouter.get("/seo/getOneleave/:_id", async(req,res)=>{
    await getOneLeave(req,res,SeoLeavesPost) 
})

LeavesRouter.put("/seo/status/:_id", async(req,res)=>{
    await UpdateStatus(req,res,SeoLeavesPost) 
})
// ..........................................GET,POST,GETONE,UPDATE LEAVES OF WRITER ..................................................................................

const WriterLeavesPost = require('../../Schemas/Employee/LeaveSubmission/WriterLeaves')
LeavesRouter.post("/writer/:empyId/:Name", async (req, res) => {
  await LeavesPost(req,res,WriterLeavesPost) 
});
LeavesRouter.get("/writer/getleaves", async(req,res)=>{
    await getLeaves(req,res,WriterLeavesPost) 
})

LeavesRouter.get("/writer/getOneleave/:_id", async(req,res)=>{
  await getOneLeave(req,res,WriterLeavesPost) 
})

LeavesRouter.put("/writer/status/:_id", async(req,res)=>{
  await UpdateStatus(req,res,WriterLeavesPost) 
})

// ..........................................GET,POST,GETONE,UPDATE LEAVES OF DESIGNER ..................................................................................


const DesignerLeavesPost = require('../../Schemas/Employee/LeaveSubmission/DesignerLeaves')
LeavesRouter.post("/designer/:empyId/:Name", async (req, res) => {
  await LeavesPost(req,res,DesignerLeavesPost) 
});

LeavesRouter.get("/designer/getleaves", async(req,res)=>{
    await getLeaves(req,res,DesignerLeavesPost) 
})


LeavesRouter.get("/designer/getOneleave/:_id", async(req,res)=>{
  await getOneLeave(req,res,DesignerLeavesPost) 
})

LeavesRouter.put("/designer/status/:_id", async(req,res)=>{
  await UpdateStatus(req,res,DesignerLeavesPost) 
})

// ..........................................GET,POST,GETONE,UPDATE LEAVES OF SALES ..................................................................................
const SalesLeavesPost = require('../../Schemas/Employee/LeaveSubmission/SalesLeaves');

LeavesRouter.post("/sales/:empyId/:Name", async (req, res) => {
  await LeavesPost(req,res,SalesLeavesPost) 
});
LeavesRouter.get("/sales/getleaves", async(req,res)=>{
    await getLeaves(req,res,SalesLeavesPost) 
})
LeavesRouter.get("/sales/getOneleave/:_id", async(req,res)=>{
  await getOneLeave(req,res,SalesLeavesPost) 
})

LeavesRouter.put("/sales/status/:_id", async(req,res)=>{
  await UpdateStatus(req,res,SalesLeavesPost) 
})


module.exports = LeavesRouter;