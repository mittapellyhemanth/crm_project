import React from "react";

import "./AdmDas.css";
import "../../Styles/SuperHome.css";

import NavbarScroll from "../../components/Navbar/NavbarScroll";
// import Sidebar from "../../components/Sidebar/Sidebar";
import { Link } from "react-router-dom";
import UserName from "../../Functions/UserName";

export default function AdminDashboard() {
  UserName()
  
  return (
    <>
      <div className="Nav">
        <NavbarScroll />
      </div>
      <div className="card-container">
        <div className="cards">
          <Link className="card" to="/v2/das/" >
            
           PROJECTS
          </Link>
          
          <Link to="/em/dashboard" className="card">
            <span className="link-title">EMPLOYEE</span>
          </Link>
          
          
        </div>

      </div>
    </>
  );
}
