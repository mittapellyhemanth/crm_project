import React, { useState } from "react";

import axios from "axios";

import ProjectSendForm from "../ProjectSendForm";
import "../ProjectSendForm.css";
export default function SalesProjectSubmit() {
  const [sucess, setSucess] = useState("");
  const date = localStorage.getItem("date");

  const [formData, setFormData] = useState(
    // [...Array(4)].map(() => ({

    {
      Location: "",
      Name: "",
      PhoneNum: "",
      Email: "",
      Source: "",
      Enquiry: "",
      Remark: "",

      Date: date,
    }
    // }))
  );
  const inputs = [
    {
      type: "text",
      placeholder: "LOCATION",
      name: "Location",
      required: false,
    },
    {
      type: "text",
      placeholder: "NAME",
      name: "Name",
      required: false,
    },
    {
      type: "number",
      placeholder: "CONTACT",
      name: "PhoneNum",
      required: false,
    },
    {
      type: "email",
      placeholder: "EMAIL",
      name: "Email",
      required: false,
    },
    {
      type: "text",
      placeholder: "SOURCE",
      name: "Source",
      required: false,
    },
    {
      type: "text",
      placeholder: "ENQUIRY",
      name: "Enquiry",
      required: false,
    },

    {
      type: "text",
      placeholder: "REMARK",
      name: "Remark",
      required: false,
    },
  ];
  //
  const employID = localStorage.getItem("unique_id");
  const projectName = localStorage.getItem("ProjectName");
  const Name = localStorage.getItem("userName");
  const client = localStorage.getItem('Client')
  const URL = `${process.env.REACT_APP_PROXY_URL}/employee/sales/project/submit/${employID}/${projectName}/${Name}/${client}`;

  const onSubmit = async (formData, url, TIMETAKEN) => {
   
    const dataToSend = { ...formData, TimeTaken: TIMETAKEN };
    try {
      // Send POST request to the server
      await axios.post(url, dataToSend);
      setSucess("Posted Successfully");
      setFormData("");

      // console.log("Projects successfully added:", response.data);
    } catch (error) {
      // console.error("Error adding projects:", error);
    }
  };

  return (
    <>
     <div className="form-addpro">
    {sucess && <div className="sucess-admin slide-in sucess-admin">{sucess}</div>}

      {sucess ? <div className="sucess">{sucess}</div> : ""}

      <ProjectSendForm
        Method="POST"
        inputs={inputs}
        onSubmit={onSubmit}
        btnText="submit"
        urlData={URL}
        formData={formData}
        setFormData={setFormData}
      />
      </div>
    </>
  );
}
