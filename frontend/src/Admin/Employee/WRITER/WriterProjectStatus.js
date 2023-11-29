import React, {  useEffect, useState } from "react";

import axios from "axios";
import "../../../Styles/ProjectStatus.css";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import WriterStatus from "../../ProjectStatus/WriterStatus";
import WriterFilter from "../../../Filters/WriterFilter";

export default function WriterProjectStatus() {
 
  const [data, setData] = useState([]);

  const projectEmplyId = localStorage.getItem("projEmId");

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_PROXY_URL}/employee/writer/proj/status/${projectEmplyId}`
      )
      .then((res) => {
       
        setData(res.data.data);
      });
  }, [projectEmplyId]);

  const navigate = useNavigate("");
  const onSearchGet = (searchData) => {
    const result = searchData;
    const encryptData = CryptoJS.AES.encrypt(
      JSON.stringify(result),
      "employeewriterSearch"
    ).toString();
    localStorage.setItem("writerSearch", encryptData);
    navigate("/v2/writer/search/results");
  };

  return (
    <>
      <div className="project-status">
        <div className="filters">
          <WriterFilter searchGet={onSearchGet} />
        </div>
        <WriterStatus data={data} />
      </div>
    </>
  );
}
