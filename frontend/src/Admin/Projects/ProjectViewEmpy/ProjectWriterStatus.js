
import CryptoJS from "crypto-js";
import WriterStatus from "../../ProjectStatus/WriterStatus";
import WriterFilter from "../../../Filters/WriterFilter";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ProjectWriterStatus(){
  const [ProjectData,setProjectData] = useState([])
  const EmplyId =localStorage.getItem('projEmId')
  const decryptedProjectEmId = CryptoJS.AES.decrypt(EmplyId, "projectEmplyIdsecretKey").toString(CryptoJS.enc.Utf8);
  const projectEmplyId = JSON.parse(decryptedProjectEmId);

 const projeName =  localStorage.getItem('projName')
 const decryptedProjectName = CryptoJS.AES.decrypt(projeName, "projectNamesecretKey").toString(CryptoJS.enc.Utf8);
 const projectName = JSON.parse(decryptedProjectName);

 useEffect(()=>{

   axios
   .get(`${process.env.REACT_APP_PROXY_URL}/admin/WriterOneProject/${projectEmplyId}/${projectName}`)
   .then((res) => {
     
     setProjectData(res.data.data)
   
   });
 },[projectEmplyId,projectName])

  const navigate = useNavigate('')
 
  const onSearchGet=(searchData)=>{
    const result = searchData
    const encryptData = CryptoJS.AES.encrypt(JSON.stringify(result),"employeewriterSearch").toString()
    localStorage.setItem("writerSearch",encryptData)
   navigate('/v2/das/writer/search/results')
  
  }
    return<>
     <div className="project-status">
     <div className="filters">
         <WriterFilter searchGet = {onSearchGet} comesFrom='ProjectWriter' />
        </div>
      <WriterStatus data={ProjectData}/>
     </div>
    </>
}