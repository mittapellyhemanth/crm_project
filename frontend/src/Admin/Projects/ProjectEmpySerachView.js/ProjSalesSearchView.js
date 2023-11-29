import { useNavigate } from "react-router-dom";

import CryptoJS from "crypto-js";

import SalesStatus from "../../ProjectStatus/SalesStatus";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProjSalesSearchView() {
  const [error, setError] = useState("");

  const [projectStatusData, setProjectStatusData] = useState([]);

  useEffect(() => {
    const encryptedProjectData = localStorage.getItem("SalesSearch");
    const decryptedProjectDatay = CryptoJS.AES.decrypt(
      encryptedProjectData,
      "employeeSalesSearch"
    ).toString(CryptoJS.enc.Utf8);
    const formData = JSON.parse(decryptedProjectDatay);

    const fetchFilteredData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_PROXY_URL}/filter/sales/search`,
          { params: formData }
        );

        if (response.status === 200) {
          if (response.data.error) {
            setError(response.data.error);
          } else {
            setProjectStatusData(response.data.data);
          }
        }
      } catch (error) {
        setError("Failed to fetch data");
      }
    };

    fetchFilteredData();
  }, []);

  const navigate = useNavigate("");
  const handleGoBack = () => {
    return navigate("/v2/das/sales/pro/view");
  };

  return (
    <>
      <div className="project-status">
        <button className="cancel-btn" onClick={handleGoBack}>
          BACK
        </button>

        {error ? (
          <p className="error">{error}</p>
        ) : (
          <SalesStatus data={projectStatusData} comesFrom="Sales" />
        )}
      </div>
    </>
  );
}
