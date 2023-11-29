import axios from "axios";
import React, { useState } from "react";
import "./Filters.css";
const Filters = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      await axios
        .get(
          `${process.env.REACT_APP_PROXY_URL}/admin/search/date?fromDate=${fromDate}&toDate=${toDate}`
        )
        .then((result) => {
          if (result.status === 200) {
            // console.log(result);
            setData(result.data.data);
          }
        });
    } catch (error) {
      // console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="filter">
      <form onSubmit={handleSubmit} className="form-filter">
        <label>
          From Date:
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </label>
        <label>
          To Date:
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </label>
        <button type="submit">Fetch Data</button>
      </form>
    </div>
  );
};

export default Filters;
