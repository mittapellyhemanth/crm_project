import CryptoJS from "crypto-js";


export default function SalesProjectStatusView() {
  const encryptedProjectData = localStorage.getItem("SalesOneProject");
  const decryptedProjectDatay = CryptoJS.AES.decrypt(
    encryptedProjectData,
    "employeeSalesProjects"
  ).toString(CryptoJS.enc.Utf8);
  const projectStatusData = JSON.parse(decryptedProjectDatay);
 
  const handleGoBack = () => {
    window.history.back(); // Go back to the previous page
  };
  return (
    <>
      <div className="project-status">
        <div className="project-view">
          <h2 className="title-proj">{projectStatusData.ProjectTitle}</h2>
          <div className="project-details">
            <div className="project-content-box">
              <div className="project-matter">
                <label>
                  <strong>SUBMIT DATE : </strong>
                </label>
                <div className="proj-date">{projectStatusData.Date}</div>
              </div>
              <div className="project-keyword">
                <label>
                  <strong>Name :</strong>{" "}
                </label>
                <div className="project-link proj-link">
                  {projectStatusData.Name}
                </div>
              </div>

              <div className="project-keyword">
                <label>
                  <strong>CONTACT :</strong>{" "}
                </label>
                <div className=" proj-keyword">
                  {projectStatusData.PhoneNum}
                </div>
              </div>
              <div className="project-keyword">
                <label>
                  <strong>EMAIL :</strong>{" "}
                </label>
                <div className=" proj-keyword">{projectStatusData.Email}</div>
              </div>
              <div className="project-keyword">
                <label>
                  <strong>LOCATION :</strong>{" "}
                </label>
                <div className="proj-keyword">{projectStatusData.Location}</div>
              </div>

              <div className="project-keyword">
                <label>
                  <strong>SOURCE :</strong>{" "}
                </label>
                <div className="proj-keyword">{projectStatusData.Source}</div>
              </div>
              <div className="project-keyword">
                <label>
                  <strong>ENQUIRY :</strong>{" "}
                </label>
                <div className="proj-keyword">{projectStatusData.Enquiry}</div>
              </div>
              <div className="project-keyword">
                <label>
                  <strong>REMARK :</strong>{" "}
                </label>
                <div className="proj-keyword">{projectStatusData.Remark}</div>
              </div>
            </div>
            <button className="cancel-btn" onClick={handleGoBack}>
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
