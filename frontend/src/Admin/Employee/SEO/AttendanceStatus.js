import React, {  useEffect, useState } from "react";

import axios from "axios";
import "../../../Styles/ProjectStatus.css";
import Attendance from "../Attendance";

export default function AttendanceStatus() {
  const [data, setData] = useState([]);

  const EmplyId = localStorage.getItem("projEmId");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/admin/employe/Attendance/${EmplyId}`)
      .then((res) => {
        // console.log(res.data.data, "emply res");
        setData(res.data.data);
      });
  }, [EmplyId]);

  return (
    <>
      <Attendance data={data} />
     
    </>
  );
}
