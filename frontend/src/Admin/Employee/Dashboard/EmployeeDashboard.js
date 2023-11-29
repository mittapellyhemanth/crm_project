import React from "react";


import "../../../Admin/Dashboard/AdmDas.css";
import "../../../Styles/SuperHome.css";

import NavbarScroll from "../../../components/Navbar/NavbarScroll";

import { Link } from "react-router-dom";
import UserName from "../../../Functions/UserName";

export default function EmployeeDashboard() {
  UserName();

  return (
    <>
      <div className="Nav">
        <NavbarScroll />
      </div>
      <div className="card-container">
        <div className="cards">
          <Link className="card" to="/v2/em/">
            SEO
          </Link>
          <Link to="/v2/writer" className="card">
            <span className="link-title">WRITER</span>
          </Link>
          <Link to="/v2/sales" className="card">
            <span className="link-title">SALES</span>
          </Link>
          <Link to="/v2/design" className="card">
            <span className="link-title">DESIGNER</span>
          </Link>
        </div>

      </div>
      

      
    </>
  );
}
