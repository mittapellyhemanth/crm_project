import React, { useContext, useState } from "react";
import ReUseForm from "../Forms/ReUseForm";
import axios from "axios";
import DetailsContext from "../Context/CreateContext";
import "../Styles/SuperHome.css";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
export default function EditAdmin() {
  // const getOneData = localStorage.getItem("empyId")
  const encryptedProjectData = localStorage.getItem("adminView");
  const decryptedProjectDatay = CryptoJS.AES.decrypt(
    encryptedProjectData,
    "SuperAdminView"
    ).toString(CryptoJS.enc.Utf8);
    const id = localStorage.getItem("empyId");
  const data = JSON.parse(decryptedProjectDatay);
  const [err, setError ] = useState("");
  const [sucess,setSucess] = useState("")
  

  const input = [
    {
      type: "text",
      placeholder: data.Name,
      name: "Name",

      required: false,
    },
    { type: "date", placeholder:data.StartDate, name: "StartDate", required: false },
    {
      type: "number",
      placeholder: data.phoneNumber,
      name: "phoneNumber",
      required: false,
    },
    {
      type: "email",
      placeholder: data.email,
      name: "email",
      required: false,
    },
    {
      type: "password",
      placeholder: "PASSWORD",
      name: "password",
      required: false,
    },
    {
      type: "text",
      placeholder:data.CompanyName,
      name: "CompanyLocation",
    
    },

    {
      type: "text",
      placeholder: data.Industry,
      name: "Industry",
    
    },
    {
      type: "text",
      placeholder: data.Website,
      name: "Website",
    
    },
  ];
  const navigate = useNavigate();
  const onSubmit = async (formData) => {
  
    const key = localStorage.getItem("token");
    const headers = {
      Authorization: key
    };
    try {
      await axios
        .put(`${process.env.REACT_APP_PROXY_URL}/superAdmin/admin/update/${id}`, formData,{headers})
        .then((res) => {
        
          if (res.data.error) {
            setSucess("")
             setError(res.data.error);
          }else{
           
            // navigate("/v1/Admins");
            // console.log(res);
            setError("")
            setSucess('Updated Sucessfully')
          }
         
        });
    } catch (error) {
      // console.log(error,'error');
    }
  };
  const remove = ()=>{
    setError('')
  }
  return (
    <>
       <div className="form-addpro">
       {err && <div className="sucess-admin slide-in error">{err}<span onClick={remove} className="remove">X</span></div>}
          {sucess && <div className="sucess-admin slide-in sucess-admin">{sucess}</div>}
        <div className="form-addpro-box">
         
          <ReUseForm
            Method="POST"
            inputs={input}
            onSubmit={onSubmit}
            btnText="Submit"
          />
        </div>
      </div>
    </>
  );
}
