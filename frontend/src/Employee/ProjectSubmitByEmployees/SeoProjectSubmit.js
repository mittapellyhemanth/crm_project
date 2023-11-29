import React, { useState } from "react";

import axios from "axios";

import ProjectSendForm from "../ProjectSendForm";

export default function SeoProjectSubmit() {
  const [sucess, setSucess] = useState("");
  const date = localStorage.getItem("date");

  const [formData, setFormData] = useState(
    // [...Array(4)].map(() => ({

    {
      BackLink: "",
      Keyword: "",
      Type: "",
      Status: "",
      Remark: "",
      TimeTaken: "",
      Date: date,
    }
    // }))
  );
  const inputs = [
    {
      type: "text",
      placeholder: "BACKLINK",
      name: "BackLink",
      required: false,
    },
    {
      type: "text",
      placeholder: "KEYWORD",
      name: "Keyword",
      required: false,
    },

    {
      type: "select",
      name: "Type",
      title:"TYPE",
      required: false,
      options: [
        { value: "ARTICLE SUBMISSION", name: "Type" },
        { value: "BLOG SUBMISSION", name: "Type" },
        { value: "IMAGE SUBMISSION", name: "Type" },
        { value: "PDF SUBMISSION", name: "Type" },
        { value: "PPT SUBMISSION", name: "Type" },
        { value: "INFOGRAPHIC SUBMISSION", name: "Type" },
        { value: "QUESTIONS & ANSWER SUBMISSION", name: "Type" },
        { value: "QUORA SUBMISSION", name: "Type" },
        { value: "PODCAST SUBMISSION", name: "Type" },
        { value: "VIDEO SUBMISSION", name: "Type" },
        { value: "CLASSIFIED ADS", name: "Type" },
        { value: "SOCIAL BOOKMARKEING", name: "Type" },
        { value: "GMB POSTING", name: "Type" },
        { value: "GUEST POSTING", name: "Type" },
        { value: "PROFILE CREATION", name: "Type" },
        { value: "BLOG COMMENTING", name: "Type" },
        { value: "PRESS RELEASE", name: "Type" },
        { value: "BUSINESS LISTING", name: "Type" },
      ],
    },
    {
      type: "select",
       name: "Status",
       title:"STATUS",
      required: false,
      options: [
        { value: "ACTIVE", name: "Status" },
        { value: "PENDING", name: "Status" },
        { value: "LOST", name: "Status" },
      ],
    },

    {
      type: "text",
      placeholder: "REMARK",
      name: "Remark",
      required: false,
    },
    // {
    //   type: "text",
    //   placeholder: "TIME TAKEN",
    //   name: "TimeTaken",
    //   required: false,
    // },
  ];
  //
  const employID = localStorage.getItem("unique_id");
  const projectName = localStorage.getItem("ProjectName");
  const Name = localStorage.getItem("userName");
  const client = localStorage.getItem('Client')
  const URL = `${process.env.REACT_APP_PROXY_URL}/employee/project/submit/${employID}/${projectName}/${Name}/${client}`;

  const onSubmit = async (formData, url, TIMETAKEN) => {
  
    const dataToSend = { ...formData, TimeTaken: TIMETAKEN };
    try {
      // Send POST request to the server
      await axios.post(url, dataToSend);
      setSucess("Posted Successfully");

      // console.log("Projects successfully added:", response.data);
    } catch (error) {
      // console.error("Error adding projects:", error);
    }
  };

  return (
    <>
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
    </>
  );
}
