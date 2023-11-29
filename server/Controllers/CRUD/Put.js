
const bcrypt = require('bcrypt')


const Put = async (req, res,UserModel)=>{
    
    try {
        const AdminId = req.params.id; // would look into param for data
        let updatedData = req.body;
       
       if(Object.keys(updatedData).length === 0){
        return res.json({ error: "No updates has been taken place" });
       }
        // await  bcrypt.compare(updatedData.password, UserModel.password).then(response => { 
        //     
            if (
                updatedData. phoneNumber.toString().length !== 10
              ) {
                return res.json({ error: "Phone number must be 10 digits" });
              }
            
           
            
              if (updatedData.Name) {
                updatedData.Name = updatedData.Name.toUpperCase();
              }

        if(updatedData.password){
            const minLength = 8; // Minimum password length requirement
            const specialCharacters = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/; // Regular expression for special characters
           
           if (updatedData.password.length < minLength && updatedData.password ) {
            
                return res.json({ error: "Password must be at least eight characters long" });
            }
            
            if (updatedData.password.length >= minLength && !specialCharacters.test(updatedData.password)) {
                return res.json({
                    error: "Password must contain at least one special character",
                });
            }else{

                bcrypt.hash(updatedData.password, 10).then(hashPass => { // encrypting password  times with bcrypt
                  updatedData.password= hashPass
              })
            }
}
     

        const updateStatus = await UserModel.findByIdAndUpdate(AdminId, updatedData, { new: true });
        if (!updateStatus) {
            res.status(400).json({
                message: "No such Id found"
            })
        }
        res.status(200).json(updateStatus) // would return updated data
        
    }
    catch (err) {
        
        res.status(500).json({
            message: "internal server error"
        })
    }
}


module.exports = Put






