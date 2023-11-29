import { useContext, useState } from "react";

import DetailsContext from "../Context/CreateContext";


export default function Pagination({itemsPerPage,data}){
    const [currentPage, setCurrentPage] = useState(1);
    const {setCurrentIteams} = useContext(DetailsContext)
    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
    
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const current = data.slice(indexOfFirstItem, indexOfLastItem);
      setCurrentIteams(current)
    return<>
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
    </>
}