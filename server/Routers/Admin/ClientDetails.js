
const express = require('express');

const clientRouter = express.Router();

const getClients = require('../../Schemas/Admin/AddProjects');

clientRouter.get('/details/:id',async(req,res)=>{
    try {
        const clientId = req.params.id
        const result = await getClients.find({_id:clientId})
        if(result){
            res.status(200).json({
                data:result
            })
        }else{
            res.status(400).json({
                err:"Check The Deatils"
            })
        }
    } catch (error) {
        res.status(500).json({
            err:"Internal Server Error"
        })
        // console.log(error)
    }
})

clientRouter.get('/search/:ClientName',async(req,res)=>{
    try {
        const Name = req.params.ClientName.toUpperCase()
     
        const result = await getClients.findOne({clientName:Name})
    
        if(result){
            res.status(200).json({
              data:result
            })
            // console.log(result);
          }
          else{
           
            res.json({
              err:"Enter Correct Name"
            })
          }
        } catch (error) {
          res.status(500).json({
            err:"Internal Server Error"
          })
        }
})
module.exports = clientRouter;