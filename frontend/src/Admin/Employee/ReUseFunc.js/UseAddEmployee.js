import {  useState } from "react";

import axios from "axios";


import ReUseForm from "../../../Forms/ReUseForm";

import "./addEmpy.css";

export default function UseAddEmployee({ url }) {
  const [err, setError] = useState("");
  const [sucess, setSucess] = useState("");
  const inputs = [
    {
      type: "text",
      placeholder: "EMPLOYEE NAME",
      name: "Name",
      required: true,
    },
    {
      type: "date",
      placeholder: "START DATE",
      name: "StartDate",
      required: true,
    },
    {
      type: "number",
      placeholder: "PHONE NUMBER ",
      name: "phoneNumber",
      required: true,
    },
    {
      type: "email",
      placeholder: "EMAIL ADDRESS",
      name: "email",
      required: true,
    },
    {
      type: "password",
      placeholder: "PASSWORD",
      name: "password",
      required: true,
    },
    {
      type: "text",
      placeholder: "AADHAAR",
      name: "aadhaar",
      required: true,
    },
  ];
 


  const onSubmit = async ({ ...formData }) => {
    const key = localStorage.getItem("token");
    const headers = {
      Authorization: key,
    };
    // console.log({...formData},{headers},url.Url);
    try {
      await axios.post(url.Url, { ...formData }, { headers }).then((res) => {
        if (res.data.error) {
          setSucess("")
          setError(res.data.error);
        } else {
          setError("")
          setSucess("Added Sucessfully")
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
      {sucess && <div className="sucess-admin slide-in sucess-admin">{sucess}</div>}
        {err && <div className="sucess-admin slide-in error">{err}<span onClick={remove} className="remove">X</span></div>}
        <div className="form-addpro-box">
      
          <ReUseForm
            Method="POST"
            inputs={inputs}
            onSubmit={onSubmit}
            btnText="Submit"
          />
        </div>
      </div>
    </>
  );
}
