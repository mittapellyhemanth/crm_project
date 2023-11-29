import axios from "axios";
import { useState } from "react";

export default function ViewLeaves({ data }) {
  const [status, setStatus] = useState("");
  const handleGoBack = () => {
    window.history.back(); // Go back to the previous page
  };

  const statusUpdate = async (_id, emplyId, status) => {
    let URL = ``;
    if (emplyId === "SE") {
      URL = `${process.env.REACT_APP_PROXY_URL}/leave/seo/status/${_id}`;
    }
    if (emplyId === "DE") {
      URL = `${process.env.REACT_APP_PROXY_URL}/leave/designer/status/${_id}`;
    }
    if (emplyId === "SA") {
      URL = `${process.env.REACT_APP_PROXY_URL}/leave/sales/status/${_id}`;
    }
    if (emplyId === "WR") {
      URL = `${process.env.REACT_APP_PROXY_URL}/leave/writer/status/${_id}`;
    }

    const send = await axios.put(URL, { Status: status });
    return send;
  };

  const handleApprove = async (_id, employeeId) => {
    const emplyId = employeeId.substring(0, 2);
    const result = await statusUpdate(_id, emplyId, "Approved");
    if (result) {
      setStatus("Leave Approved");
    }
  };

  const handleRejected = async (_id, employeeId) => {
    const emplyId = employeeId.substring(0, 2);
    const result = await statusUpdate(_id, emplyId, "Rejected");
    if (result) {
      setStatus("Leave Rejected");
    }
  };

  return (
    <>
      <div className="project-status">
        <div className="project-view">
          {status && <h2 className="sucess">{status}</h2>}
          <h2>LEAVE DETAILS</h2>

          <div className="project-details">
            <div className="project-content-box">
              <div className="project-matter">
                <label>
                  <strong>EMPLOYEE NAME : </strong>
                </label>
                <div className="proj-date">{data.EmployeeName}</div>
              </div>
              <div className="project-matter">
                <label>
                  <strong>EMPLOYEE ID : </strong>
                </label>
                <div className="proj-date">{data.employeeId}</div>
              </div>
              <div className="project-keyword">
                <label>
                  <strong>REASON :</strong>{" "}
                </label>
                <div className="project-link proj-link">
                  {data.ReasonForAbsent}
                </div>
              </div>

              <div className="project-keyword">
                <label>
                  <strong> START DATE :</strong>{" "}
                </label>
                <div className=" proj-keyword">{data.ChooseDate}</div>
              </div>
              <div className="project-matter">
                <label>
                  <strong>NUM OF DAYS :</strong>{" "}
                </label>
                <div className="proj-type">{data.NoOfDays}</div>
              </div>
            </div>
            {status ? (
              <>
                {" "}
                <button className="cancel-btn" onClick={handleGoBack}>
                  Go Back
                </button>
              </>
            ) : (
              <>
                <button
                  className="cancel-btn"
                  onClick={() => handleRejected(data._id, data.employeeId)}
                >
                  REJECT
                </button>
                <button
                  className="cancel-btn "
                  onClick={() => handleApprove(data._id, data.employeeId)}
                >
                  APPROVE
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
