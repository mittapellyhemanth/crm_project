import React, { useContext } from "react";
import ReUseForm from "../../Forms/ReUseForm";
import "./Project.css";

import UserName from "../../Functions/UserName";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import DetailsContext from "../../Context/CreateContext";

export default function AddProjects() {
  UserName();
  const { err, setError } = useContext(DetailsContext);
  const input = [
    {
      type: "text",
      placeholder: "PROJECT NAME",
      name: "projectName",
      required: true,
    },
    {
      type: "text",
      placeholder: "WEBSITEADDRESS",
      name: "websiteAddress",
      required: true,
    },
    {
      type: "text",
      placeholder: "CLIENT NAME",
      name: "clientName",
      required: true,
    },
    {
      type: "date",
      placeholder: "START DATE",
      name: "startDate",
      required: true,
    },
    {
      type: "number",
      placeholder: "MONTHLY PRICE",
      name: "monthlyPrice",
      required: true,
    },
    {
      type: "select",
      // placeholder: "EMPLOYEE ALLOTED",
     name:"empyDesignation",
      required: true,
      options:[
        { value: "SEO", name: "empyDesignation"},
        { value: "WRITER", name: "empyDesignation", },
        { value: "DESIGNER", name: "empyDesignation",},
        { value: "SALES", name: "empyDesignation",}
      ]
    },
    {
      type: "text",
      placeholder: "EMPLOYEE ALLOTED",
      name: "employeeAlloted",
      required: true,
    },
    {
      type: "text",
      placeholder: "EMPLOYEE ID",
      name: "employID",
      required: true,
    },
  ];
 
  
const navigate = useNavigate()

  const onSubmit = async( formData ) => {
   
    const key = localStorage.getItem("token");
    const headers = {
      Authorization: key
    };
    const adminId = localStorage.getItem('unique_id')
    try {
      await axios
        .post(`${process.env.REACT_APP_PROXY_URL}/admin/addProject/${adminId}`, formData,{headers})
        .then((res) => {
          
          if (res.data.error) {
           return setError(res.data.error);
          }
          navigate('/v2/das/proj')
          
        });
    } catch (error) {
      return setError('check details');
    }
  };
  return (
    <>

<div className="form-addpro">
  <div className="form-addpro-box">
    <div>

      {err && <h6 className="error">{err}</h6>}
  </div>
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
