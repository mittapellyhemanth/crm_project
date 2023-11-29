import axios from "axios";
import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import '../../../Admin/Employee/ReUseFunc.js/Filters.css'
export default function ClientDetails() {
  const [data, setData] = useState([]);
  const [back, setBack] = useState(false);
  const [err, setError] = useState("");
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
      });
    //   .catch((err) => console.log(err));
  }, []);

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
    window.history.back();
  };

  const navigate = useNavigate("");
  const handleClick = async (id) => {
    const clientId = CryptoJS.AES.encrypt(
      JSON.stringify(id),
      "clientsecretKey"
    ).toString();

    localStorage.setItem("clientId", clientId);

    navigate("/v2/das/client/one/view");
  };

  const [name, setName] = useState("");
  const handleSearch = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_PROXY_URL}/client/search/${name}`
    );

    if (result.status === 200) {
      setData(result.data.data);
      setBack(true);
    } else {
      setError("result.data.err");
    }
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
          <div className="card-top-container">

        <div className="card-top">
          {err && <h3>{err}</h3>}

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
                          handleClick(user._id);
                        }}
                        key={user.clientName}
                      >
                        {user.clientName}
                      </Card.Title>

                      {/* <button className='person-card-view'   key={user.phoneNumber}>View</button> */}
                    </Card.Body>
                  </Card>
                </>
              );
            })
          ) : (
            <Card
              style={{ width: "18rem", textAlign: "center" }}
              key="card"
              className="person-card"
            >
              {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
              <Card.Body key="body">
                <Card.Title
                  onClick={() => {
                    handleClick(data._id);
                  }}
                  key={data.clientName}
                >
                  {data.clientName}
                </Card.Title>

                {/* <button className='person-card-view'   key={user.phoneNumber}>View</button> */}
              </Card.Body>
            </Card>
          )}
        </div>
          </div>
        {back ? (
          <button className="button-back" onClick={handleGoBack}>
            CANCEL
          </button>
        ) : (
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
        )}
      </div>
    </>
  );
}
