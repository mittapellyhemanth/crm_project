import axios from "axios";
import { useEffect, useState } from "react";
import GetLeaves from "../ReUseFunc.js/GetLeaves";

export default function DesignerLeaveTracker() {
  const [data, setData] = useState([]);
  localStorage.removeItem("getLeave");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_PROXY_URL}/leave/designer/getleaves`
        );
        setData(result.data.data);
        // console.log(result.data.data);
      } catch (error) {
        // console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // console.log(data, "data");

  return (
    <div className="project-status">
      <GetLeaves data={data} />
    </div>
  );
}
