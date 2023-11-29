import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DetailsContext from "../../../Context/CreateContext";
import SalesStatus from "../../ProjectStatus/SalesStatus";
import SalesFilter from "../../../Filters/SalesFilter";
import CryptoJS from "crypto-js";
export default function SalesProjectStatus() {
  const [data, setData] = useState([]);


  const { setProjectStatusData } = useContext(DetailsContext);
  setProjectStatusData("");

  const projectEmplyId = localStorage.getItem("projEmId");
  

  useEffect(() => {
    fetchData(projectEmplyId);
  }, [projectEmplyId]);

  const fetchData = async (employeeId) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_PROXY_URL}/employee/sales/proj/status/${employeeId}`
      );
      setData(res.data.data);
    } catch (error) {
      // console.error("Error fetching data:", error);
    }
  };

  const navigate = useNavigate("");
  const onSearchGet = (searchData) => {
    const result = searchData;
    const encryptData = CryptoJS.AES.encrypt(
      JSON.stringify(result),
      "employeeSalesSearch"
    ).toString();
    localStorage.setItem("SalesSearch", encryptData);
    navigate("/v2/sales/search/results");
  };

  return (
    <div className="project-status">
      <div className="filters">
        <SalesFilter searchGet={onSearchGet} />
      </div>
      <SalesStatus data={data} />
    </div>
  );
}
