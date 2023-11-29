import React, { useContext, useEffect } from "react";
import Login from "../components/Login_SignUp/Login";
import DetailsContext from "../Context/CreateContext";
export default function EmployeeLogin(){
    const {setPersonLogin,personLogin} = useContext(DetailsContext)
       
    useEffect(() => {
            if (personLogin !== 'Employee') {
                setPersonLogin('Employee');
            }
            // eslint-disable-next-line
          }, [personLogin]);
        //   console.log(personLogin);
    return<>
    
    
    <div>
   <Login/>
    </div>
    </>
}