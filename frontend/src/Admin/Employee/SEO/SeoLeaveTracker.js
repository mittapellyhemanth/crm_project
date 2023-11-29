import axios from "axios";
import { useEffect, useState } from "react";
import GetLeaves from "../ReUseFunc.js/GetLeaves";

export default function SeoLeaveTracker() {
  const [data, setData] = useState([]);
  localStorage.removeItem("getLeave");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_PROXY_URL}/leave/seo/getleaves`
        );
        setData(result.data.data);
       
      } catch (error) {
        // console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="project-status">
      <GetLeaves data={data} />
    </div>
  );
}
