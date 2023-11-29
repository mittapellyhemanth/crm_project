import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";

export default function SalesStatus({data,comesFrom}){
  const [currentPage, setCurrentPage] = useState(1);
    
    const itemsPerPage = 10; // Number of items per page
    const handlePagination = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    
    let currentItems = data.slice(indexOfFirstItem, indexOfLastItem);


  const navigate = useNavigate('')
  const handleClick = async(_id)=>{
  
 await axios.get(`${process.env.REACT_APP_PROXY_URL}/admin/salesProject/One/View/${_id}`).then((res)=>{
    
 const result = res.data.data;
 const encryptSales = CryptoJS.AES.encrypt(
   JSON.stringify(result),
   "employeeSalesProjects"
 ).toString();
 localStorage.setItem("SalesOneProject", encryptSales);
 // setProjectStatusData(res.data.data)
});
  if(comesFrom){
    navigate('/v2/das/Sales/one/view')
  }else{

    navigate('/v2/sales/view/project/status')
  }
  }
 
    return<>
      <div className="project-status-box">
        <div className="data-box-heading">
          <table className="tabel">
            <thead className="tabel-heading">
              <tr>
                <th>TITLE</th>
                <th>NAME</th>
                <th>CONTACT</th>
                <th>VIEW</th>
              </tr>
            </thead>
            <tbody className="tabel-body">
              {currentItems.map((projectStatus, index) => (
                <tr key={index}>
                  <td>{projectStatus.ProjectTitle}</td>
                  <td>{projectStatus.Name}</td>
                  <td>{projectStatus.PhoneNum}</td>
                  <td className="tabel-view" onClick={()=>handleClick(projectStatus._id)}>View</td>
                </tr>
              ))}
            </tbody>
          </table>

         
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
         
          </div>
      </div></>

}