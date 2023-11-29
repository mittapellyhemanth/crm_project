import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";
import "./addEmpy.css";

export default function GetLeaves({ data, comesFrom }) {
  // localStorage.removeItem('getLeave')
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleClick = async (_id, emplyId) => {
    try {
      const firstTwoLetters = emplyId.substring(0, 2);
      let url = ``;
     let navigateUrl = ''
      if (firstTwoLetters === "SE") {
         url = `${process.env.REACT_APP_PROXY_URL}/leave/seo/getOneleave/${_id}`;
         navigateUrl = "/v2/em/view/leave"
      }
      if (firstTwoLetters === "DE") {
         url = `${process.env.REACT_APP_PROXY_URL}/leave/designer/getOneleave/${_id}`;
         navigateUrl = "/v2/design/view/leave"
      }
      if (firstTwoLetters === "SA") {
         url = `${process.env.REACT_APP_PROXY_URL}/leave/sales/getOneleave/${_id}`;
         navigateUrl = "/v2/sales/view/leave"
      }
      if (firstTwoLetters === "WR") {
         url = `${process.env.REACT_APP_PROXY_URL}/leave/writer/getOneleave/${_id}`;
         navigateUrl = "/v2/writer/view/leave"
      }
      const res = await axios.get(url);
      const result = res.data.data;
      const encryptSeo = CryptoJS.AES.encrypt(
        JSON.stringify(result),
        "leaveKey"
      ).toString();
      localStorage.setItem("getLeave", encryptSeo);
      navigate(navigateUrl);
    } catch (error) {
      // console.error("Error fetching data:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="project-status-box">
      <div className="data-box-heading">
        <table className="tabel">
          <thead className="tabel-heading">
            <tr>
              <th>NAME</th>
              <th>EMPLOYEE ID</th>
              <th>LEAVE DATE</th>
              <th>NO OF DAYS</th>
              <th>DETAILS</th>
            </tr>
          </thead>
          <tbody className="tabel-body">
            {currentItems.map((projectStatus, index) => (
              <tr key={index}>
                <td>{projectStatus.EmployeeName}</td>
                <td>{projectStatus.employeeId}</td>
                <td>{projectStatus.ChooseDate}</td>
                <td>{projectStatus.NoOfDays}</td>
                {projectStatus.Status === "Approved" ? (
                  <td className="Approved">{projectStatus.Status}</td>
                ) : projectStatus.Status === "Rejected" ? (
                  <td className="Rejected">{projectStatus.Status}</td>
                ) : (
                  <td
                    className="tabel-view"
                    onClick={() =>
                      handleClick(projectStatus._id, projectStatus.employeeId)
                    }
                  >
                    View
                  </td>
                )}
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
  );
}
