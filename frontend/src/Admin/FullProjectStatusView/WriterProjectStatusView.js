import CryptoJS from "crypto-js";

export default function WriterProjectStatusView() {
  const encryptedProjectData = localStorage.getItem("writerOneProject");
  const decryptedProjectDatay = CryptoJS.AES.decrypt(
    encryptedProjectData,
    "employeewriterProjects"
  ).toString(CryptoJS.enc.Utf8);
  const projectStatusData = JSON.parse(decryptedProjectDatay);
  const handleGoBack = () => {
    window.history.back(); // Go back to the previous page
  };
  return (
    <>
      <div className="project-status">
        <div className="project-view">
          <h2>{projectStatusData.ProjectTitle}</h2>
          <div className="project-details">
            <div className="project-content-box">
              <div className="project-matter">
                <label>
                  <strong>SUBMIT DATE : </strong>
                </label>
                <div className="proj-date">{projectStatusData.Date}</div>
              </div>
              <div className="project-matter">
                <label>
                  <strong>CONTENT TITLE : </strong>
                </label>
                <div className="proj-date">
                  {projectStatusData.ContentTitle}
                </div>
              </div>
              <div className="project-keyword">
                <label>
                  <strong>CONTENT LINK :</strong>{" "}
                </label>
                <div className="project-link proj-link">
                  <a
                    href={projectStatusData.ContentLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {projectStatusData.ContentLink}
                  </a>
                </div>
              </div>

              <div className="project-keyword">
                <label>
                  <strong>WORD COUNT :</strong>{" "}
                </label>
                <div className=" proj-keyword">
                  {projectStatusData.WordCount}
                </div>
              </div>
              <div className="project-matter">
                <label>
                  <strong>TYPE :</strong>{" "}
                </label>
                <div className="proj-type">{projectStatusData.Type}</div>
              </div>
              <div className="project-matter">
                <label>
                  <strong>AI :</strong>{" "}
                </label>
                <div className="proj-status">{projectStatusData.Ai}%</div>
              </div>
              <div className="project-keyword">
                <label>
                  <strong>PLAGIARISM :</strong>{" "}
                </label>
                <div className="proj-keyword">
                  {projectStatusData.Plagiarism}%
                </div>
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
