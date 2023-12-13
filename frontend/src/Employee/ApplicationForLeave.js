import { useContext, useState } from "react";
import Col from "react-bootstrap/Col";
import axios from "axios";


import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import DetailsContext from "../Context/CreateContext";


import "./AppLeave.css";

export default function Application() {
  // console.log(url,'url');

  const { err, setError } = useContext(DetailsContext);

  let inputs = [];

 
  inputs.push(
    {
      type: "text",
      placeholder: "REASON FOR ABSENT",
      name: "ReasonForAbsent",
      required: true,
    },

    {
      type: "date",
      placeholder: "CHOOSE DATE",
      name: "ChooseDate",
      required: true,
    },
    {
      type: "number",
      placeholder: "NO OF DAYS",
      name: "NoOfDays",
      required: true,
    },
    {
      type: "number",
      placeholder: "TOTAL NO. OF DAYS",
      name: "TotalNumOfDays",
      required: true,
    }
  );


  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // const key = localStorage.getItem("token");
    const emplyId = localStorage.getItem("unique_id")
    const type = localStorage.getItem("designation")
    const Name = localStorage.getItem("userName")
    const adminId = localStorage.getItem("adminId")
    
    // const headers = {
    //   Authorization: key,
    // };
    // 

    const PostData = async(URL,formData)=>{
     await axios.post(URL, { ...formData }).then((res) => {
          if (res.data.error) {
            setError(res.data.error);
          } else {
            setError("Posted sucessfully");
              }
         });
      }

    try {
      if(type === 'SEO'){
        const URL =`${process.env.REACT_APP_PROXY_URL}/leave/seo/${emplyId}/${Name}/${adminId}`
        PostData(URL,formData)
      }
      if(type === 'SALES'){
        const URL =`${process.env.REACT_APP_PROXY_URL}/leave/sales/${emplyId}/${Name}/${adminId}`
        PostData(URL,formData)
      }
      if(type === 'DESIGNER'){
        const URL =`${process.env.REACT_APP_PROXY_URL}/leave/designer/${emplyId}/${Name}/${adminId}`
        PostData(URL,formData)
      
      }
      if(type === 'WRITER'){
        const URL =`${process.env.REACT_APP_PROXY_URL}/leave/writer/${emplyId}/${Name}/${adminId}`
        PostData(URL,formData)
      
      }
    } catch (error) {
      // console.log(error,'error');
    }
  };

  return (
    <>
      <div className="form-addpro">
      
          <div>{err && <h6 className="error">{err}</h6>}</div>

          <Form  method="POST" onSubmit={onSubmit} encType="multipart/form-data">
            
              
          
 <Row className="mb-3">
 {inputs.map((input) => (

   <Form.Group as={Col} controlId="formGridCity">
     <Form.Control
      type={input.type}
      placeholder={input.placeholder}
      name={`${input.name}`} // to keep name as unique added index
      required={input.required}
      value={formData[`${input.name}`] || ''}
      onChange={handleChange}
     />
   </Form.Group>

 ))}
</Row>
          
           
          

            <button  type="submit" className="submit-btn">
              Submit
            </button>
          </Form>
        </div>
   
    </>
  );
}
