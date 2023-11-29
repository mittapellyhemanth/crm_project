import React, { useEffect, useState } from "react";

import CryptoJS from 'crypto-js';

import DesignerStatus from "../../ProjectStatus/DesignerStatus";
import DesignerFilter from "../../../Filters/DesignerFilter";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProjectDesignerStatus(){
  

  const [ProjectData,setProjectData] = useState([])
  const EmplyId =localStorage.getItem('projEmId')
  const decryptedProjectEmId = CryptoJS.AES.decrypt(EmplyId, "projectEmplyIdsecretKey").toString(CryptoJS.enc.Utf8);
  const projectEmplyId = JSON.parse(decryptedProjectEmId);

 const projeName =  localStorage.getItem('projName')
 const decryptedProjectName = CryptoJS.AES.decrypt(projeName, "projectNamesecretKey").toString(CryptoJS.enc.Utf8);
 const projectName = JSON.parse(decryptedProjectName);

 useEffect(()=>{

   axios
   .get(`${process.env.REACT_APP_PROXY_URL}/admin/DesignerOneProject/${projectEmplyId}/${projectName}`)
   .then((res) => {
    
     setProjectData(res.data.data)
  
   });
 },[projectEmplyId,projectName])
 
  const navigate = useNavigate('')
  const onSearchGet=(searchData)=>{
    const result = searchData
    const encryptData = CryptoJS.AES.encrypt(JSON.stringify(result),"employeeDesignerSearch").toString()
    localStorage.setItem("DesignerSearch",encryptData)
   navigate('/v2/das/designer/search/results')
  
  }
return<>
 <div className="project-status">
 <div className="filters">
         <DesignerFilter searchGet = {onSearchGet} comesFrom='projDesigner' />
        </div>
<DesignerStatus data={ProjectData}/>
 </div>
</>
}