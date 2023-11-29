
const bcrypt = require('bcrypt')


const Put = async (req, res,UserModel)=>{
    // console.log("update")
    try {
        const AdminId = req.params.id; // would look into param for data
        let updatedData = req.body;
        // await  bcrypt.compare(updatedData.password, UserModel.password).then(response => { 
if(updatedData.password){
      bcrypt.hash(updatedData.password, 10).then(hashPass => { // encrypting password  times with bcrypt
        updatedData.password= hashPass
    })
}
        // })
     
        // console.log(updatedData.password,'pass');

        const updateStatus = await UserModel.findByIdAndUpdate(AdminId, updatedData, { new: true });
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
}


module.exports = Put