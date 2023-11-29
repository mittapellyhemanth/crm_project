// import React, { useState } from "react";

// import CryptoJS from "crypto-js";
// import { useNavigate } from "react-router-dom";
// import Card from "react-bootstrap/Card";

// export default function SeacrhView(){
//   const [back, setBack] = useState(false);
//   const [error, setError] = useState("");
//   const encryptedProjectData = localStorage.getItem("search");
//   const decryptedProjectDatay = CryptoJS.AES.decrypt(
//     encryptedProjectData,
//     "searchView"
//     ).toString(CryptoJS.enc.Utf8);
//     const data = JSON.parse(decryptedProjectDatay);

//     const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 12; // Number of items per page
//   const handlePagination = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   // const indexOfLastItem = currentPage * itemsPerPage;
//   // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   // let currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  
//   const handleGoBack = () => {
//     window.history.back();
//   };
//   const navigate = useNavigate();

//   const handleClick = (emplyId, designation) => {
//     localStorage.setItem("projEmId", emplyId);

  
//     // if (designation === "SEO") {
//     //    navigate(NavigateUrl);
//     // }
//     // if (designation === "WRITER") {
//     //    navigate(NavigateUrl);
//     // }
//     // if (designation === "DESIGNER") {
//     //    navigate(NavigateUrl);
//     // }
//     // if (designation === "SALES") {
//     //    navigate(NavigateUrl);
//     // }
//   };
  
// return <>
//   <div className="bg-img">
//       {error && <span className="error"> {error}</span>}
//    <div className="card-top">
         

        
            
//                  <div className="super-container">
//                    <div className="super">
//                      <Card
//                        style={{ width: "18rem", textAlign: "center" }}
//                        key={data.Name}
//                        className="person-card"
//                      >
//                        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
//                        <Card.Body key="body">
//                          <Card.Title
//                            key={data.Name}
//                            className="user-text"
//                            onClick={() => {
//                              handleClick(data.unique_id, data.designation);
//                            }}
//                          >
//                            {data.Name}
//                          </Card.Title>
//                        </Card.Body>
//                      </Card>
//                    </div>
//                  </div>
               
           

//        </div>
//          </div>
//        {back ? (
//          <button className="button-back" onClick={handleGoBack}>
//            CANCEL
//          </button>
//        ) : (
//          <div className="pagination">
//            <button
//              className="prevbtn"
//              onClick={() => handlePagination(currentPage - 1)}
//              disabled={currentPage === 1}
//            >
//              PREVIOUS
//            </button>
//            {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map(
//              (_, index) => (
//                <button
//                  className="numbtn"
//                  key={index}
//                  onClick={() => handlePagination(index + 1)}
//                  disabled={currentPage === index + 1}
//                >
//                  {index + 1}
//                </button>
//              )
//            )}
//            <button
//              className="Nextbtn"
//              onClick={() => handlePagination(currentPage + 1)}
//              disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
//            >
//              NEXT
//            </button>
//            {/* {back &&  <button onClick={handleGoBack}>CANCEL</button>} */}
//          </div>
//        )}
     
// </>
//        }