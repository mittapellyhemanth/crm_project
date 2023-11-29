import { useNavigate } from "react-router-dom";
import SeoFilter from "../../../Filters/SeoFilter";
import SeoStatus from "../../ProjectStatus/SeoStatus";
import CryptoJS from "crypto-js";
import {  useEffect, useState } from "react";
import axios from "axios";


export default function ProjectSeoStatus(){

  
  const [ProjectData,setProjectData] = useState([])
  const EmplyId =localStorage.getItem('projEmId')
  const decryptedProjectEmId = CryptoJS.AES.decrypt(EmplyId, "projectEmplyIdsecretKey").toString(CryptoJS.enc.Utf8);
  const projectEmplyId = JSON.parse(decryptedProjectEmId);

 const projeName =  localStorage.getItem('projName')
 const decryptedProjectName = CryptoJS.AES.decrypt(projeName, "projectNamesecretKey").toString(CryptoJS.enc.Utf8);
 const projectName = JSON.parse(decryptedProjectName);

 useEffect(()=>{

   axios
   .get(`${process.env.REACT_APP_PROXY_URL}/admin/SeoOneProject/${projectEmplyId}/${projectName}`)
   .then((res) => {

     setProjectData(res.data.data)
   
   });
 },[projectEmplyId,projectName])
 
 
  const navigate = useNavigate('')
  const onSearchGet=async(searchData)=>{
    const result = searchData
   
    const encryptData = CryptoJS.AES.encrypt(JSON.stringify(result),"employeeSeoSearch").toString()
    localStorage.setItem("seoSearch",encryptData)
   navigate('/v2/das/seo/search/results')
  
  }

    return<>
       
     <div className="project-status">
   
     <div className="filters">
         <SeoFilter searchGet = {onSearchGet} comesFrom='ProjectSeo' />
        </div>
      <SeoStatus data={ProjectData} comesFrom="Seo"/>
     </div>
    </>
}