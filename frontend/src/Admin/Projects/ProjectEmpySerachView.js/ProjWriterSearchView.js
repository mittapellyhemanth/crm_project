import { useNavigate } from "react-router-dom";
import WriterStatus from "../../ProjectStatus/WriterStatus";
import CryptoJS from "crypto-js";
import {  useEffect, useState } from "react";
import axios from "axios";

export default function ProjWriterSearchView() {
  const [error, setError] = useState("");

  const [projectStatusData, setProjectStatusData] = useState([]);

  useEffect(() => {
    const encryptedProjectData = localStorage.getItem("writerSearch");
    const decryptedProjectDatay = CryptoJS.AES.decrypt(
      encryptedProjectData,
      "employeewriterSearch"
    ).toString(CryptoJS.enc.Utf8);
    const formData = JSON.parse(decryptedProjectDatay);

    const fetchFilteredData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_PROXY_URL}/filter/writer/search`,
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
    return navigate("/v2/das/writer/pro/view");
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
          <WriterStatus data={projectStatusData} comesFrom="writer" />
        )}
      </div>
    </>
  );
}
