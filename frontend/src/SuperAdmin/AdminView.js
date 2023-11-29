import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import {  useEffect, useState } from "react";
import axios from "axios";
// import Admins from "./Admins";
// import SuperAdminHome from "./SuperHome";
import {  useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import './AdminView.css'
// import DetailsContext from "../Context/CreateContext";

export default function AdminView(){
    
    const [getOneData,setGetOneData]=useState([])
  
   
    
    useEffect(()=>{

      const empyId = localStorage.getItem('empyId')
    const key = localStorage.getItem("token");
    const headers = {
      Authorization: key
    };
    axios.get(`${process.env.REACT_APP_PROXY_URL}/superAdmin/admin/view/${empyId}`,{headers})
    .then((res) => {
      
      if (res.status === 200) {
        // console.log(res.data.data,'got');
            
           setGetOneData(res.data.data);
           setGetOneData(res.data.data);
           const encryptData = CryptoJS.AES.encrypt(
            JSON.stringify(res.data.data),
            "SuperAdminView"
          ).toString();
          localStorage.setItem("adminView", encryptData);

      }
  })
  // .catch((err) => console.log(err));
   },[])
  
  const navigate =useNavigate();
  const handleEdit =(id)=>{
    
    navigate('/v1/admin/Edit')

  }
const handleCancel = ()=>{
 localStorage.removeItem('name')
  localStorage.removeItem("address");
  localStorage.removeItem("email");
  localStorage.removeItem("phoneNumber");
  localStorage.removeItem("empyId");
  navigate('/v1/admins')
}
const handleDelete =()=>{
  // const key = localStorage.getItem("token");
  // const headers = {
  //   Authorization: key
  // };
  const empyId = localStorage.getItem('empyId')
  axios.delete(`${process.env.REACT_APP_PROXY_URL}/superAdmin/admin/delete/${empyId}`)
  .then((res) => {
    
    if (res.status === 200) {
      // console.log(res.data.data,'got');
          
       navigate('/v1/admins')

    }
})
// .catch((err) => console.log(err));
}
    return<>
   
     
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
            <ListGroup.Item className="unerLine">
              <strong>COMPANY NAME :</strong>
              <span className="name">{getOneData.CompanyName}</span>
            </ListGroup.Item>
            <ListGroup.Item className="unerLine">
              <strong>COMPANY LOCATION :</strong>
              <span className="name">{getOneData.CompanyLocation}</span>
            </ListGroup.Item>
            <ListGroup.Item className="unerLine">
              <strong>INDUSTRY :</strong>
              <span className="name">{getOneData.Industry}</span>
            </ListGroup.Item>
            <ListGroup.Item className="unerLine">
              <strong>WEBSITE :</strong>
              <span className="name">{getOneData.Website}</span>
            </ListGroup.Item>
         </div>
        
    <div className="card-btn">
    <div>
<button className="person-card-view bg-wh" onClick={()=>{handleCancel()}}>  Cancel</button>
        </div>
        <div>
<button className="person-card-view bg-blue " onClick={()=>{ handleEdit(getOneData._id)}}>Edit</button>
        </div>
        <div>
<button className="person-card-view bg-red " onClick={()=>{ handleDelete(getOneData._id)}}>Delete</button>
        </div>
    </div>
        </Card>
      </div>
       
     
    </>

}