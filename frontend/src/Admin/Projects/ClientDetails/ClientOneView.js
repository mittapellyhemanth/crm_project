import axios from "axios";
import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";

export default function ClientOneView() {
  const [data, setData] = useState([]);
  const encryptedProjectData = localStorage.getItem("clientId");
  const decryptedProjectDatay = CryptoJS.AES.decrypt(
    encryptedProjectData,
    "clientsecretKey"
  ).toString(CryptoJS.enc.Utf8);
  const clientId = JSON.parse(decryptedProjectDatay);



  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/client/details/${clientId}`)
      .then((res) => {
        setData(res.data.data);
      });
  }, [clientId]);

  const handleGoBack = () => {
    window.history.back(); // Go back to the previous page
  };

  return (
    <>
      <div className="project-status">
        <div className="project-view">
          {data.map((res) => (
            <>
              <h2>{res.clientName}</h2>
              <div className="project-details">
                <div className="project-content-box">
                  <div className="project-matter">
                    <label>
                      <strong>PROJECT NAME : </strong>
                    </label>
                    <div className="proj-date">{res.projectName}</div>
                  </div>
                  <div className="project-keyword">
                    <label>
                      <strong>WEBSITE ADDRESS :</strong>{" "}
                    </label>
                    <div className="project-link proj-link">
                      <a
                        href={res.websiteAddress}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {res.websiteAddress}
                      </a>
                    </div>
                  </div>
                  <div className="project-matter">
                    <label>
                      <strong>EMPLOYEE ALLOTED: </strong>
                    </label>
                    <div className="proj-date">{res.employeeAlloted}</div>
                  </div>
                  <div className="project-matter">
                    <label>
                      <strong>EMPLOYEE ID: </strong>
                    </label>
                    <div className="proj-date">{res.employID}</div>
                  </div>
                  <div className="project-matter">
                    <label>
                      <strong>EMPLOYEE DESIGNATION: </strong>
                    </label>
                    <div className="proj-date">{res.empyDesignation}</div>
                  </div>

                  <div className="project-keyword">
                    <label>
                      <strong>WORD COUNT :</strong>{" "}
                    </label>
                    <div className=" proj-keyword">{res.startDate}</div>
                  </div>
                  <div className="project-matter">
                    <label>
                      <strong>MONTHLY PRICE :</strong>{" "}
                    </label>
                    <div className="proj-type">{res.monthlyPrice}</div>
                  </div>
                </div>
                <button className="button-back" onClick={handleGoBack}>
                  CANCEL
                </button>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
