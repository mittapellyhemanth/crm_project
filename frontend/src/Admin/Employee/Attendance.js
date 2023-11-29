import { useState } from "react";

export default function Attendance({ data }) {
  //...........pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Number of items per page
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="project-status">
        <div className="project-status-box">
          <div className="data-box-heading">
            <table className="tabel">
              <thead className="tabel-heading">
                <tr>
                  <th>DATE</th>
                  <th>LOGIN TIME</th>
                  <th>LOGOUT TIME</th>
                  <th>TOTAL BREAK</th>
                  <th>WORK TIME</th>
                </tr>
              </thead>
              <tbody className="tabel-body">
                {currentItems.map((AttendanceStatus) => (
                  <tr>
                    <td>{AttendanceStatus.Date}</td>
                    <td>{AttendanceStatus.LoginTime}</td>
                    <td>{AttendanceStatus.LogoutTime}</td>
                    <td>{AttendanceStatus.TotalBreak}</td>
                    <td>{AttendanceStatus.TotalWorkTime}</td>
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
            {/* <button onClick={handleGoBack}>Back</button> */}
          </div>
        </div>
      </div>
    </>
  );
}
