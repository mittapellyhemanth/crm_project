import { useContext, useEffect } from "react";
import DetailsContext from "../../../Context/CreateContext";

export default function WriterFullProjStatus() {
  const { projectStatusData } = useContext(DetailsContext);
  
  let data = {}
useEffect(()=>{
 data = projectStatusData
},[projectStatusData])
  return (
    <>
      <div className="project-status">
        <div className="project-view">
          <h2>{data.ProjectTitle}</h2>
          {/* <div className="project-details">
            <div className="project-content-box">
              <div className="project-matter">
                <label><strong>SUBMIT DATE : </strong></label>
                <div className="proj-date">{projectStatusData.Date}</div>
              </div>
              <div className="project-matter">
                <label><strong>CONTENT TITLE : </strong></label>
                <div className="proj-date">{projectStatusData.ContentTitle}</div>
              </div>
              <div className="project-keyword">
                <label><strong>CONTENT LINK :</strong> </label>
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
               
                <label><strong>WORD COUNT :</strong> </label>
                <div className=" proj-keyword">{projectStatusData.WordCount}</div>
              </div>
              <div className="project-matter">
                
                <label><strong>TYPE :</strong> </label>
                <div className="proj-type">{projectStatusData.Type}</div>
              </div>
              <div className="project-matter">
                
                
                <label><strong>AI :</strong> </label>
                <div className="proj-status">{projectStatusData.Ai}%</div>
              </div>
              <div className="project-keyword">
               
                <label><strong>PLAGIARISM :</strong> </label>
                <div className="proj-keyword">{projectStatusData.Plagiarism}%</div>
              </div>
              
             
            </div>
            
          </div> */}
        </div>
      </div>
    </>
  );
}
