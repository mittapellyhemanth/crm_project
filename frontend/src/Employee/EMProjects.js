import axios from "axios";
import React, { useState, useEffect } from "react";

import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

export default function EMProjects() {
  const [data, setData] = useState([]);
  const [back,setBack] = useState(false)
  const [error,setError] = useState('')
  useEffect(() => {
    // const key = localStorage.getItem("token");
    // const headers = {
    //   Authorization: key,
    // };
    let id = localStorage.getItem("unique_id");

    // console.log(employeeId,"empyId");
    
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/employee/details/${id}`)
      .then((res) => {
       
        if (res.status === 200) {
        

          setData(res.data);
        }
      })
      // .catch((err) => console.log(err));
  }, []);
  const navigate = useNavigate();

  const handleClick = (ProjectName,clientName) => {
    const designation = localStorage.getItem("designation");
    localStorage.setItem("Client",clientName)
    localStorage.setItem("ProjectName", ProjectName);
    if (designation === "SEO") {
      return navigate("/v3/empy/project/post");
    }
    if (designation === "WRITER") {
      return navigate("/v3/empy/writer/project/post");
    }
    if (designation === "DESIGNER") {
      return navigate("/v3/empy/designer/project/post");
    }
    if (designation === "SALES") {
      return navigate("/v3/empy/sales/project/post");
    }
  };

  const [name, setName] = useState("");


  const handleSearch = async () => {
    const id = localStorage.getItem("unique_id");
    await axios
      .get(`${process.env.REACT_APP_PROXY_URL}/admin/oneProject/${id}/${name}`)
      .then((result) => {
        if (result.status === 200) {
          setError("");

          setData(result.data.data);
          setBack(true);
        }
      })
      .catch((err) => {
        setError(err.response.data.err);
      });
  };
  //pagination 

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Number of items per page
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
let currentItems = []
// console.log(typeof(data)===object);
 if(!back){
   
   currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
 }

  

  
 


  return (
    <>
      <div className="bg-img">
              {error && <span className="error"> {error}</span>}
          <div className="search">
            <input
              placeholder="ENTER  PROJECT  NAME"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              className="btn-search"
              onClick={() => {
                handleSearch();
              }}
            >
              SEARCH
            </button>
          </div>
          <div>

        <div className="card-top">

          {!data ? (
            <div className="heading backlink-title">DATA NOT FOUND</div>
          ) : data.length > 0 ? (
            currentItems.map((user) => {
              return (
                <>
                  <Card
                    style={{ width: "18rem", textAlign: "center" }}
                    key="card"
                    className="person-card"
                  >
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body key="body">
                      <Card.Title
                        onClick={() => {
                          handleClick(user.projectName,user.clientName);
                        }}
                        key={user.projectName}
                      >
                        {user.projectName}
                      </Card.Title>

                      {/* <button className='person-card-view'   key={user.phoneNumber}>View</button> */}
                    </Card.Body>
                  </Card>
                </>
              );
            })
            ) 
            :
             (
              <Card
                style={{ width: "18rem", textAlign: "center" }}
                key="card"
                className="person-card"
              >
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body key="body">
                  <Card.Title
                    onClick={() => {
                      handleClick(data.projectName,data.clientName);
                    }}
                    key={data.projectName}
                  >
                    {data.projectName}
                  </Card.Title>
  
                  {/* <button className='person-card-view'   key={user.phoneNumber}>View</button> */}
                </Card.Body>
              </Card>
            )}
        </div>
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
