import CryptoJS from "crypto-js";

import Card from "react-bootstrap/Card";

import Row from "react-bootstrap/Row";




export default function DesignerProjectStatusView() {
  const encryptedProjectData = localStorage.getItem("designerOneProject");
  const decryptedProjectDatay = CryptoJS.AES.decrypt(
    encryptedProjectData,
    "employeeDesignerProjects"
  ).toString(CryptoJS.enc.Utf8);
  const projectStatusData = JSON.parse(decryptedProjectDatay);

  const handleGoBack = () => {
    window.history.back(); // Go back to the previous page
  };
  return (
    <>
      <div className="project-status">
        <Row className="g-3 img-box">
          <div className="col-container-view">
            <Card className="card-oneView">
              <h2>{projectStatusData.ProjectTitle}</h2>
              <Card.Img
                variant="top"
                className="one-img-size"
                src={`${process.env.REACT_APP_PROXY_URL}/designer/images/${projectStatusData.PostImage}`}
                alt="user-img"
              />
              <Card.Body>
                <div className="project-matter">
                  <label>
                    <strong>EMPLOYEE NAME : </strong>
                  </label>
                  <div className="proj-date">{projectStatusData.Name}</div>
                </div>
                <div className="project-matter">
                  <label>
                    <strong>IMAGE TITLE : </strong>
                  </label>
                  <div className="proj-date">{projectStatusData.ImgTitle}</div>
                </div>
                <div className="project-matter">
                  <label>
                    <strong>SUBMIT DATE : </strong>
                  </label>
                  <div className="proj-date">{projectStatusData.Date}</div>
                </div>
                <div className="project-matter">
                  <label>
                    <strong>TYPE :</strong>{" "}
                  </label>
                  <div className="proj-type">{projectStatusData.Type}</div>
                </div>
                <div className="project-keyword">
                  <label>
                    <strong>DESCRIPTION :</strong>{" "}
                  </label>
                  <div className=" proj-keyword">
                    {projectStatusData.description}
                  </div>
                </div>

                <div className="project-matter">
                  <label>
                    <strong>CLIENT NAME : </strong>
                  </label>
                  <div className="proj-date">
                    {projectStatusData.clientName}
                  </div>
                </div>
              </Card.Body>
              <button className="cancel-btn" onClick={handleGoBack}>
                CANCEL
              </button>
            </Card>
          </div>
        </Row>
      </div>
    </>
  );
}
