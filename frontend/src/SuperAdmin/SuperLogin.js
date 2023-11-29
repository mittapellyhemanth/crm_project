import React, { useContext, useEffect } from "react";
import Login from "../components/Login_SignUp/Login";
import DetailsContext from "../Context/CreateContext";

export default function SuperLogin(){
    const {setPersonLogin,personLogin} = useContext(DetailsContext)
       
    useEffect(() => {
            if (personLogin !== 'SuperAdmin') {
                setPersonLogin('SuperAdmin');
            }
            // eslint-disable-next-line
          }, [personLogin]);
         
          
    return<>
    
    
    <div>
   <Login/>
    </div>
    </>
}