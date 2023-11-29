import React, { useState } from "react";

import axios from "axios";

import ProjectSendForm from "../ProjectSendForm";

export default function WriterProjectSubmit() {
  const [sucess, setSucess] = useState("");
  const date = localStorage.getItem("date");
  const [formData, setFormData] = useState(
    // [...Array(4)].map(() => ({

    {
      ContentTitle: "",
      ContentLink: "",
      Type: "",
      Plagiarism: "",
      Ai: "",
      WordCount: "",
      Date: date,
    }
    // }
    //   ))
  );
  const inputs = [
    {
      type: "text",
      placeholder: "CONTENT TITLE",
      name: "ContentTitle",
      required: false,
    },

    {
      type: "text",
      placeholder: "CONTENT LINK",
      name: "ContentLink",
      required: false,
    },
    {
      type: "select",
      title:"TPYE",
      name: "Type",
      required: false,
      options: [
        { value: "INFOGRAPHIC", name: "Type" },
        { value: "TESTIMONIALS", name: "Type" },
        { value: "WEB CONTENT", name: "Type" },
        { value: "CASE STUDIES", name: "Type" },
        { value: "SOCIAL MEDIA", name: "Type" },
        { value: "PRESENTATION", name: "Type" },
        { value: "BLOG CONTENT", name: "Type" },
        { value: "Q&A CONTENT", name: "Type" },
        { value: "EMAIL CONTENT", name: "Type" },
        { value: "PR CONTENT", name: "Type" },
        { value: "PRODUCT CONTENT", name: "Type" },
        { value: "META CONTENT", name: "Type" },
        { value: "INTERACTIVE CONTENT", name: "Type" },
        { value: "VIDEO CONTENT", name: "Type" },
        { value: "WEBINAR CONTENT", name: "Type" },
        { value: "FAQ CONTENT", name: "Type" },
        { value: "LEGAL CONTENT", name: "Type" },
        { value: "NEWS ARTICLE", name: "Type" },
        { value: "CREATIVE WRITING", name: "Type" },
        { value: "TECHNICAL WRITING", name: "Type" },
        { value: "GHOST WRITING", name: "Type" },
        { value: "ACADEMIC WRITING", name: "Type" },
        { value: "COPY WRITING", name: "Type" },
        { value: "BRAND JOURNALISM", name: "Type" },
        { value: "SCREEN WRITING", name: "Type" }
      ],
    },

    {
      type: "number",
      placeholder: "PLAGIARISM",
      name: "Plagiarism",
      required: false,
    },
    {
      type: "number",
      placeholder: "AI",
      name: "Ai",
      required: false,
    },
    {
      type: "number",
      placeholder: "WORD COUNT",
      name: "WordCount",
      required: false,
    },
  ];
  const employID = localStorage.getItem("unique_id");
  const projectName = localStorage.getItem("ProjectName");
  const Name = localStorage.getItem("userName");
  const client = localStorage.getItem('Client')
  const URL = `${process.env.REACT_APP_PROXY_URL}/employee/writer/project/submit/${employID}/${projectName}/${Name}/${client}`;

  const onSubmit = async (formData, url) => {
 
    try {
      // Send POST request to the server
       await axios.post(url, formData);
      setSucess("Posted Sucessfully");
      // console.log("Projects successfully added:", response.data);
    } catch (error) {
      setSucess("");

      // console.error("Error adding projects:", error);
    }
  };

  return (
    <>
 <div className="form-addpro">
 {sucess && <div className="sucess-admin slide-in sucess-admin">{sucess}</div>}
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
