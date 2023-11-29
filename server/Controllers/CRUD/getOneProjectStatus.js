

const getOneProjectStatus = async (req, res,designation) => {
    // console.log(req.params.id);
      try {
           await designation.findById(req.params.id)
          .then((result)=>{
            res.status(200).json({
              data:result
            });
  
          })
          // console.log(data,'dattttttttttttttttt');
        } catch (error) {
          res.status(500).json({
              message: "Internal server error",
              err: error
            });
        }
      }
      
    
      
    
    module.exports = getOneProjectStatus;
    