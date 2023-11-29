import React, { useEffect, useState } from "react";

import axios from "axios";
import "../../../Styles/ProjectStatus.css";
import DesignerStatus from "../../ProjectStatus/DesignerStatus";
import { useNavigate } from "react-router-dom";
import DesignerFilter from "../../../Filters/DesignerFilter";
import CryptoJS from "crypto-js";
export default function DesignerProjectStatus() {
  const [data, setData] = useState([]);

  const projectEmplyId = localStorage.getItem("projEmId");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/designer/getPosts/${projectEmplyId}`)
      .then((res) => {
        // console.log(res.data.result, "emply res");
        setData(res.data.result);
      });
  }, [projectEmplyId]);

  const navigate = useNavigate("");
  const onSearchGet = (searchData) => {
    const result = searchData;
    const encryptData = CryptoJS.AES.encrypt(
      JSON.stringify(result),
      "employeeDesignerSearch"
    ).toString();
    localStorage.setItem("DesignerSearch", encryptData);
    navigate("/v2/design/search/results");
  };
  return (
    <>
      <div className="project-status">
        <div className="filters">
          <DesignerFilter searchGet={onSearchGet} />
        </div>

        <DesignerStatus data={data} />
      </div>
    </>
  );
}
