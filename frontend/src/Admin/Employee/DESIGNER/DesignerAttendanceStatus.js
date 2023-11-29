import React, {  useEffect, useState } from "react";

import axios from "axios";
import "../../../Styles/ProjectStatus.css";
import Attendance from "../Attendance";

export default function DesignerAttendanceStatus(){
    const [data, setData] = useState([]);

  const EmplyId = localStorage.getItem("projEmId");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/admin/employe/Attendance/${EmplyId}`)
      .then((res) => {
      
        setData(res.data.data);
      });
  }, [EmplyId]);

  return (
    <>
    <Attendance data={data} />
     
    </>
  );

}