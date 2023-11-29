import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import {  useEffect, useState } from "react";

import './Yourdetails.css'
import axios from "axios";

export default function Details() {
  
  // const { designation } = useContext(DetailsContext);
  


  const [getOneData, setOneData] = useState([]);

const getDetails = async(url,token)=>{
  // const key = localStorage.getItem("token");
  // const headers = {
  //   Authorization: key
  // };
  axios
    .get(url,token)
    .then((res) => {
      if (res.status === 200) {
      
        return  setOneData( res.data.data)
      ;
      }
    })
    // .catch((err) => console.log(err));

}
  useEffect(() => {
    const key = localStorage.getItem("token");
    const id = localStorage.getItem("Id");
   const type = localStorage.getItem('designation')

    const headers = {
      Authorization: key
    };
    if(type === 'SEO'){
      getDetails(`${process.env.REACT_APP_PROXY_URL}/admin/getOneSeo/${id}`,{headers})
    
    }
    if(type === 'WRITER'){
      getDetails(`${process.env.REACT_APP_PROXY_URL}/admin/getOneWriter/${id}`,{headers})
    
    }
    if(type === 'DESIGNER'){
      getDetails(`${process.env.REACT_APP_PROXY_URL}/admin/getOneDesigner/${id}`,{headers})
    
    }
    if(type === 'SALES'){
      getDetails(`${process.env.REACT_APP_PROXY_URL}/admin/getOneSales/${id}`,{headers})
    
    }
  },[setOneData]);

  return (
    <>
     
  <div className="form-addpro">
         
        <Card className="your-card-admin">
          <Card.Body className="card-body">
            <Card.Title className="your-title">{getOneData.designation}</Card.Title>
          </Card.Body>
         <div className="details-box">
         <ListGroup.Item className="unerLine">
              <strong>ID :</strong>
              <span className="name">{getOneData.unique_id}</span>
            </ListGroup.Item>
            <ListGroup.Item className="unerLine">
              <strong>NAME :</strong>
              <span className="name">{getOneData.Name}</span>
            </ListGroup.Item>
            <ListGroup.Item className="unerLine">
              <strong>EMAIL :</strong>
              <span className="name">{getOneData.email}</span>
            </ListGroup.Item>
           
            <ListGroup.Item className="unerLine">
              <strong>START DATE :</strong>
              <span className="name">{getOneData.StartDate}</span>
            </ListGroup.Item>
            <ListGroup.Item className="unerLine">
              <strong>CONTACT :</strong>
              <span className="name">{getOneData.phoneNumber}</span>
            </ListGroup.Item>
           
         </div> 
            </Card>
         </div> 
    </>
  );
}
