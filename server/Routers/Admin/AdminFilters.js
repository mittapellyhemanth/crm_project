const express = require("express");
const auth = require("../../Authentication/Auth");

const AdminFiltersRouter = express.Router();

const salesProjectFilter = require("../../Schemas/Employee/ProjectSubmit/SalesProject");
const seoProjectFilter = require("../../Schemas/Employee/ProjectSubmit/SeoProject");
const writerProjectFilter = require("../../Schemas/Employee/ProjectSubmit/WriterProject");
const designerProjectFilter = require("../../Schemas/Employee/ProjectSubmit/DesignerProject");


const searchQuery =async(req,res,Model)=>{
    try {
        const { Date, Type,Status, clientName, ProjectTitle, Name } = req.query;
        // console.log(Name, "name");
        const query = {};
        // Add parameters to the query object if they exist
        if (Date) query.Date = Date;
        if (Type) query.Type = Type;
    
        if (clientName) query.clientName = clientName.toUpperCase();
        if (ProjectTitle) query.ProjectTitle = ProjectTitle.toUpperCase();
        if (Name) query.Name = Name.toUpperCase();
        if (Status) query.Status = Status;
    
        const providedParamsCount = Object.values(query).filter(
          (val) => val !== undefined
        ).length;
    
        if (providedParamsCount !== 0) {
          await Model.find(query).then((result) => {
            if (result.length === 0) {
              res.json({
                error: "NO DATA AVAILABLE",
              });
            } else {
                // console.log(result,"sales");
              res.status(200).json({ data: result });
            }
          });
        }
      } catch (err) {
        res.json({ error: "Internal server error" });
      }
} 




AdminFiltersRouter.get( "/seo/search",async (req, res) => {
    return await searchQuery(req,res,seoProjectFilter)
});

AdminFiltersRouter.get("/writer/search", async (req, res) => {
  return await searchQuery(req,res,writerProjectFilter)

});
AdminFiltersRouter.get("/designer/search", async (req, res) => {
    return await searchQuery(req,res,designerProjectFilter)
  
  });
  AdminFiltersRouter.get("/sales/search", async (req, res) => {
    return await searchQuery(req,res,salesProjectFilter)
  
  });
module.exports = AdminFiltersRouter;
