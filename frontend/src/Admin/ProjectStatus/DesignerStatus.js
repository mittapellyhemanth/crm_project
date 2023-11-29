import React, { useState } from "react";
import "./img.css";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";

export default function DesignerStatus({ data, comesFrom }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [sucess, setSucessfully] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const navigate = useNavigate();

  const handleClick = async (_id) => {
    await axios
      .get(`${process.env.REACT_APP_PROXY_URL}/designer/proj/view/${_id}`)
      .then((res) => {
        const result = res.data.data;
        const encryptSeo = CryptoJS.AES.encrypt(
          JSON.stringify(result),
          "employeeDesignerProjects"
        ).toString();
        localStorage.setItem("designerOneProject", encryptSeo);
      });

    if (comesFrom) {
      navigate("/v2/das/designer/one/view");
    } else {
      navigate("/v2/design/view/project/status");
    }
  };

  const handleSelect = (_id) => {
    const index = selectedImages.indexOf(_id);
    if (index === -1) {
      setSelectedImages([...selectedImages, _id]);
    } else {
      const updatedSelectedImages = [...selectedImages];
      updatedSelectedImages.splice(index, 1);
      setSelectedImages(updatedSelectedImages);
    }
  };

  const Delete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_PROXY_URL}/designer/delete/one/${id}`);
      setSucessfully("Deleted Successfully");
      await window.location.reload();
    } catch (error) {
      // console.error('Error deleting image:', error);
    }
  };

  const Download = async (filename) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_PROXY_URL}/designer/images/${filename}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      // console.error('Error downloading image:', error);
    }
  };

  return (
    <>
      <div className="project-status-box">
        {sucess && <h3>{sucess}</h3>}
        <Row className="g-3 img-box">
          {currentItems.map((img, idx) => (
            <div key={idx} className="col-container">
              <Card className="card-img">
                <div>
                  <input
                    type="checkbox"
                    className="check-box"
                    onClick={() => handleSelect(img._id)}
                  />
                  {selectedImages.includes(img._id) ? (
                    <>
                      <div className="delete-container">
                        <div className="delete" onClick={() => Delete(img._id)}>DELETE</div>
                        <div className="download" onClick={() => Download(img.PostImage)}>DOWNLOAD</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <Card.Img
                        variant="top"
                        className="img-size"
                        src={`${process.env.REACT_APP_PROXY_URL}/designer/images/${img.PostImage}`}
                        alt="user-img"
                      />
                      <Card.Body>
                        <Card.Title>{img.ImgTitle}</Card.Title>
                        <Card.Text>{img.description}</Card.Text>
                      </Card.Body>

                      <button
                        className="tabel-view-img"
                        onClick={() => handleClick(img._id)}
                      >
                        VIEW
                      </button>
                    </>
                  )}
                </div>
              </Card>
            </div>
          ))}
        </Row>

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