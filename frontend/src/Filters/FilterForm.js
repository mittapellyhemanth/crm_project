import React from "react";


import Form from "react-bootstrap/Form";

import "./Filter.css";

export default function FilterForm({ Method, urlData, inputs, onSubmit,formData,setFormData }) {
  // const [formData, setFromData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    onSubmit(formData, urlData);
  };
  return (
    <>
      <form
        method={Method}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="form"
      >
        {/* {formData.map((formFields, index) => ( */}
      
          {inputs.map((input) => (
            <Form.Group
             
              controlId={`form${input.name}`}
              key={input.name}
             
            >
              {(input.type === "text" ||
                input.type === "number" ||
                input.type === "date"||
                input.type === "email") && (
                <input
                  className="filterPlaceHolder"
                  type={input.type}
                  placeholder={input.placeholder}
                  name={`${input.name}`} // For example, "BackLink_0"
                  required={input.required}
                  value={formData[input.name] || ""}
                  onChange={(e) => handleInputChange(e)}
                />
              )}

              {input.type === "select" && (
                <select
                className="filterPlaceHolder"
                  name={`${input.name}`}
                  value={formData[input.name] || ""}
                  onChange={(e) => handleInputChange(e)}
                >
                  <option disabled value="">
                    Select {input.name}
                  </option>
                  {input.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.value}
                    </option>
                  ))}
                </select>
              )}
            </Form.Group>
          ))}
      
        <button type="submit" className="submit-search">
          SEARCH
        </button>

      
      </form>
    </>
  );
}
