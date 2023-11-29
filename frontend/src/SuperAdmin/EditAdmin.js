import React, { useContext } from "react";
import ReUseForm from "../Forms/ReUseForm";
import axios from "axios";
import DetailsContext from "../Context/CreateContext";
import "../Styles/SuperHome.css";
import { useNavigate } from "react-router-dom";

export default function EditAdmin() {
  // const getOneData = localStorage.getItem("empyId")
 
  const { err, setError } = useContext(DetailsContext);
  const name = localStorage.getItem("name");
 
  const email = localStorage.getItem("email");
  const phoneNumber = localStorage.getItem("phoneNumber");
  const id = localStorage.getItem("empyId");

  const input = [
    {
      type: "text",
      placeholder: name,
      name: "Name",

      required: false,
    },
    { type: "date", placeholder:"START DATE", name: "StartDate", required: false },
    {
      type: "number",
      placeholder: phoneNumber,
      name: "phoneNumber",
      required: false,
    },
    {
      type: "email",
      placeholder: email,
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
      placeholder: "COMPANY LOCATION",
      name: "CompanyLocation",
    
    },

    {
      type: "text",
      placeholder: "INDUSTRY",
      name: "Industry",
    
    },
    {
      type: "text",
      placeholder: "WEBSITE",
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
            return setError(res.data.error);
          }
          localStorage.removeItem("name");
          localStorage.removeItem("address");
          localStorage.removeItem("email");
          localStorage.removeItem("phoneNumber");
          localStorage.removeItem("empyId");
          navigate("/v1/Admins");
          // console.log(res);
        });
    } catch (error) {
      // console.log(error,'error');
    }
  };

  return (
    <>
       <div className="form-addpro">
        <div className="form-addpro-box">
          <div>{err && <h6 className="error">{err}</h6>}</div>

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
