import axios from "axios";
import React, { useState, useEffect } from "react";

import Card from "react-bootstrap/Card";

import "../Styles/EmpyCards.css";

import { useNavigate } from "react-router-dom";
export default function Admins() {
  const [data, setData] = useState([]);
  

  useEffect(() => {
    const key = localStorage.getItem("token");
    const headers = {
      Authorization: key,
    };
    const superAdminId = localStorage.getItem("unique_id");
   
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/superAdmin/admins/${superAdminId}`, {
        headers,
      })
      .then((res) => {
       
        if (res.status === 200) {
         
          setData(res.data.data);
        }
      })
      // .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();

  const handleClick = (id) => {
    localStorage.setItem("empyId", id);
    navigate("/v1/admin/view");
  };
//pagination
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
      <div className="bg-img">
        <div className="card-top">
          {currentItems.map((user) => {
            return (
              <>
                <div className="super-container">
                  <div className="super">
                    <Card
                      style={{ width: "18rem", textAlign: "center" }}
                      key={user.Name}
                      className="person-card"
                    >
                      <Card.Body key="body">
                        <Card.Title
                          onClick={() => {
                            handleClick(user._id);
                          }}
                          key={user.Name}
                          className="user-text"
                        >
                          {user.Name}
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className="pagination">
            <button className="prevbtn" onClick={() => handlePagination(currentPage - 1)} disabled={currentPage === 1}>
              PREVIOUS
            </button>
            {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
              <button
              className="numbtn"
                key={index}
                onClick={() => handlePagination(index + 1)}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </button>
            ))}
            <button className="Nextbtn"
              onClick={() => handlePagination(currentPage + 1)}
              disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
            >
              NEXT
            </button>
            {/* <button onClick={handleGoBack}>Back</button> */}
          </div> 
      </div>
    </>
  );
}
