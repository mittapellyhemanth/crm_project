import React, { useState } from "react";

import Col from "react-bootstrap/Col";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import Button from "react-bootstrap/Button";

export default function ProjSend() {
  const [formData, setFormData] = useState([...Array(4)].map(() => ({
    BackLink: "",
    Keyword: "",
    Type: "",
    Status: "",
    Remark: "",
    TimeTaken: ""
  })));
  const [err, setError] = useState("");
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
      required: false,
      options: [
        { value: "num1", name: "Type" },
        { value: "num2", name: "Type" },
        { value: "num3", name: "Type" },
      ],
    },
    {
      type: "select",

      name: "Status",
      required: false,
      options: [
        { value: "num1", name: "Status" },
        { value: "num2", name: "Status" },
        { value: "num3", name: "Status" },
      ],
    },

    {
      type: "text",
      placeholder: "REMARK",
      name: "Remark",
      required: false,
    },
    {
      type: "text",
      placeholder: "TIME TAKEN",
      name: "TimeTaken",
      required: false,
    },
  ];
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const [inputName] = name.split('_');
  
    setFormData(prevState => {
      
      const newState = [...prevState];
      newState[index][inputName] = value;
   
      return newState;
    });
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    let newData = []
    for(let i=0;i<formData.length;i++){
      let obj = formData[i];
let values =  Object.values(obj)
let totalValues = 0
let emptyValues = 0
      for(let i=0;i<values.length;i++){
       
         if(values[i] !== ''){
          totalValues++
         }else{
          emptyValues++
         }
        }
       
        if(emptyValues !== 6 && emptyValues!==0){
         return setError("please Check fields")
        }
        if(emptyValues === 0 && totalValues === Object.keys(obj).length){
          newData.push(formData[i])
        }
       
}
const designation = localStorage.getItem("designation");
if(designation === 'SEO'){
  try {
    // Send POST request to the server
    const response = await axios.post(
      `${process.env.REACT_APP_PROXY_URL}/employee/project/submit`,
      formData
    );
  
   
  } catch (error) {
    // console.error("Error adding projects:", error);
    
  }
}
if(designation === 'DESIGNER'){
  try {
    // Send POST request to the server
    const response = await axios.post(
      `${process.env.REACT_APP_PROXY_URL}/employee/project/submit`,
      formData
    );
  
   
  } catch (error) {
    // console.error("Error adding projects:", error);
    
  }
}  
  };


  return (
    <>
     <div className="form-addpro">
        <div className="form-addpro-box">
          <div className="err">

          {err}
          </div>
          
          <Form method="POST" onSubmit={handleSubmit} encType="multipart/form-data">
            {formData.map((formFields, index) => (
              <Row className="mb-3" key={index}>
                {inputs.map((input) => (
                  <Form.Group as={Col} controlId={`form${input.name}_${index}`} key={input.name}>
                    {input.type === "text" && (
                      <Form.Control
                        type={input.type}
                        placeholder={input.placeholder}
                        name={`${input.name}_${index}`} // For example, "BackLink_0"
                        required={input.required}
                        value={formFields[input.name] || ""}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    )}
                    {input.type === "select" && (
                      <Form.Select
    name={`${input.name}_${index}`}
    value={formFields[input.name] || ""}
    onChange={(e) => handleInputChange(e, index)}
  >
    <option disabled value=''>Select {input.name}</option>
    {input.options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.value}
      </option>
    ))}
  </Form.Select>

                    )}
                  </Form.Group>
                ))}
              </Row>
            ))}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}
