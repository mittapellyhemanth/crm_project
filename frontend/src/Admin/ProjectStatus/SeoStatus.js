import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";

export default function SeoStatus({ data,comesFrom }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = [];

  currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const navigate = useNavigate("");
  const handleClick = async (_id) => {
    
    await axios
      .get(`${process.env.REACT_APP_PROXY_URL}/admin/seoProject/One/View/${_id}`)
      .then((res) => {
        const result = res.data.data;
        const encryptSeo = CryptoJS.AES.encrypt(
          JSON.stringify(result),
          "employeeSeoProjects"
        ).toString();
        localStorage.setItem("SeoOneProject", encryptSeo);
        // setProjectStatusData(res.data.data)
      });
      if(comesFrom){
        navigate("/v2/das/seo/one/view");
      }
      else{

        navigate("/v2/em/view/project/status");
      }
  };
  return (
    <>
      <div className="project-status-box">
        <div className="data-box-heading">
          <table className="tabel">
            <thead className="tabel-heading">
              <tr>
                <th>TITLE</th>
                <th>BACKLINK</th>
                <th>TIME TAKEN</th>
                <th>VIEW</th>
              </tr>
            </thead>
            <tbody className="tabel-body">
              {currentItems.map((projectStatus, index) => (
                <tr key={index}>
                  <td>{projectStatus.ProjectTitle}</td>

                  <td className="backlink">
                    {" "}
                    <a href={projectStatus.BackLink} target="_blank" rel="noreferrer">
                      {projectStatus.BackLink}
                    </a>
                  </td>

                  <td>{projectStatus.TimeTaken}</td>
                  <td
                    className="tabel-view"
                    onClick={() => handleClick(projectStatus._id)}
                  >
                    View
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <button
            className="prevbtn"
            onClick={() => handlePagination(currentPage - 1)}
            disabled={currentPage === 1}
          >
            PREVIOUS
          </button>
          {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map(
            (_, index) => (
              <button
                className="numbtn"
                key={index}
                onClick={() => handlePagination(index + 1)}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </button>
            )
          )}
          <button
            className="Nextbtn"
            onClick={() => handlePagination(currentPage + 1)}
            disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
          >
            NEXT
          </button>
        </div>
      </div>
    </>
  );
}
