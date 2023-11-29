
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
require('dotenv').config();

const LoginDetails = async function(req,res,user){
    const loginCred =req.body;

    if (user) {  // will give response from DB

        // if user found then it will encrypt password and compare with DB password 
     return   bcrypt.compare(loginCred.password, user.password).then(response => {
     
            if (response) {  // password is correct then create web token
                const jwtToken = jwt.sign({
                    email: user.email,
                    id: user._id,

                },
                    process.env.SECRET_KEY, {
                    expiresIn: "24h"
                })
                res.status(200).json({
                    message: "Login credential matched!!",
                    Token: jwtToken,
                   user:user

                })
            } else {
                res.status(400).json({
                   message: "Email or password does not match"
                })
            }
        })
    } else {
        res.status(401).json({
            message: "User does not exist"
        })
    }
}

module.exports = LoginDetails;