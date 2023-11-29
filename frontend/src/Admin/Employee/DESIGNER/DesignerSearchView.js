import { useNavigate } from "react-router-dom";

import CryptoJS from "crypto-js";

import DesignerStatus from "../../ProjectStatus/DesignerStatus";

import {  useEffect, useState } from "react";
import axios from "axios";

export default function DesignerSearchView() {
  const [error, setError] = useState("");

  const [projectStatusData, setProjectStatusData] = useState([]);

  useEffect(() => {
    const encryptedProjectData = localStorage.getItem("DesignerSearch");
    const decryptedProjectDatay = CryptoJS.AES.decrypt(
      encryptedProjectData,
      "employeeDesignerSearch"
    ).toString(CryptoJS.enc.Utf8);
    const formData = JSON.parse(decryptedProjectDatay);

    const fetchFilteredData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_PROXY_URL}/filter/designer/search`,
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
        // console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      }
    };

    fetchFilteredData();
  }, []);

  const navigate = useNavigate("");
  const handleGoBack = () => {
    return navigate("/v2/design/project/status");
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
          <DesignerStatus data={projectStatusData} />
        )}
      </div>
    </>
  );
}
