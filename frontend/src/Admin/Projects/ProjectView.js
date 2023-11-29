import { useContext } from "react";
import DetailsContext from "../../Context/CreateContext";

import { useNavigate } from "react-router-dom";
// /proj/status/:id/:projectName
export default function ProjectView() {
  
  const { ProjectData, setProjectView } =   useContext(DetailsContext);
 

  const navigate = useNavigate();
  const handleClick = (i) => {
 

    setProjectView(data[i]);
    navigate("/v2/writer/view/project/status");
  };
  return (
    <>
      <div className="project-status">
        {ProjectData.map((projectStatus, i) => (
          <>
            <div className="data-box">
              <span className="time-taken">{projectStatus.ContentTitle}</span>
              <span className="time-taken">
                {" "}
                <a href={projectStatus.ContentLink} target="_blank">
                  {projectStatus.ContentLink}
                </a>
              </span>

              <span className="time-taken view" onClick={() => handleClick(i)}>
                View
              </span>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
