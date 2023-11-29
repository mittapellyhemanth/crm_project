import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import CryptoJS from "crypto-js";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import DetailsContext from "../../Context/CreateContext";

export default function Projects(click) {
  const [data, setData] = useState([]);
  const [back, setBack] = useState(false);
  const { setProjectData, setDesignationType } = useContext(DetailsContext);
  useEffect(() => {
    setProjectData("");
  }, [setProjectData]);

  useEffect(() => {
    const key = localStorage.getItem("token");
    const headers = {
      Authorization: key,
    };
    const AdminId = localStorage.getItem("unique_id");
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/admin/getProject/${AdminId}`, { headers })
      .then((res) => {
  
        if (res.status === 200) {
          setData(res.data.data);
        }
      })
      // .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();

  const handleClick = async (projectName, designation, projectEmplyId) => {
    const projEmId = CryptoJS.AES.encrypt(
      JSON.stringify(projectEmplyId),
      "projectEmplyIdsecretKey"
    ).toString();
    const projName = CryptoJS.AES.encrypt(
      JSON.stringify(projectName),
      "projectNamesecretKey"
    ).toString();
    localStorage.setItem("projEmId", projEmId);
    localStorage.setItem("projName", projName);
    setDesignationType(designation);

    if (designation === "SALES") {
    
      navigate("/v2/das/sales/pro/view");
    }

    if (designation === "SEO") {
      navigate("/v2/das/seo/pro/view");
    }
    if (designation === "WRITER") {
     

      navigate("/v2/das/writer/pro/view");
    }
    if (designation === "DESIGNER") {
    

      navigate("/v2/das/designer/pro/view");
    }
  };

  const [name, setName] = useState("");
 
  const handleSearch = async () => {
    await axios
      .get(`${process.env.REACT_APP_PROXY_URL}/admin/oneProject/${name}`)
      .then((result) => {
        // console.log(result);
        setData(result.data.data);
        setBack(true);
      })
      .catch((Err) => {
        setData("");
      });
  };

  // /getProject/:addedAdminId/:projectName

  //...........pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Number of items per page
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = [];

  if (!back) {
    currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  }

  const handleGoBack = () => {
    window.location.reload()
  };

  return (
    <>
      <div className="bg-img">
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
        <div >
<div className="card-top">
{!data ? (
            <div className="heading backlink-title">DATA NOT FOUND</div>
          ) : currentItems.length > 0 ? (
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
                          handleClick(
                            user.projectName,
                            user.empyDesignation,
                            user.employID
                          );
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
          ) : (
            <div className="search-container">
            <div className="super-search">
              <Card
                style={{ width: "18rem", textAlign: "center" }}
                key={data.Name}
                className="person-card"
              >
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body key="body">
                      <Card.Title
                        onClick={() => {
                          handleClick(
                            data.projectName,
                            data.empyDesignation,
                            data.employID
                          );
                        }}
                        key={data.projectName}
                      >
                        {data.projectName}
                      </Card.Title>

                      {/* <button className='person-card-view'   key={user.phoneNumber}>View</button> */}
                    </Card.Body>
              </Card>
            </div>
            <button className="button-back" onClick={handleGoBack}>
          CANCEL
        </button>
          </div>
          )}
        </div>
</div>
       
        {
         
       
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
            {/* {back &&  <button onClick={handleGoBack}>CANCEL</button>} */}
          </div>
        }
      </div>
    </>
  );
}
