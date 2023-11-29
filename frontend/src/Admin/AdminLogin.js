import React, { useContext, useEffect } from "react";
import Login from "../components/Login_SignUp/Login";
import DetailsContext from "../Context/CreateContext";
export default function AdminLogin(){
    const {setPersonLogin,personLogin} = useContext(DetailsContext)
       
    useEffect(() => {
            if (personLogin !== 'Admin') {
                setPersonLogin('Admin');
            }
            // eslint-disable-next-line
          }, [personLogin]);

    return<>
    
    <div>
   <Login/>
    </div>
    </>
}