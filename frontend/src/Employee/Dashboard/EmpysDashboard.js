import React from "react";



import "../../Styles/SuperHome.css";

import NavbarScroll from "../../components/Navbar/NavbarScroll";
import Sidebar from "../../components/Sidebar/Sidebar";
import UserName from "../../Functions/UserName";



export default function EmpysDashboard() {
  
  UserName();

const sidebarData = [
  {label:'PROJECTS', to:'project'},
  {label:'APPLICATION FOR LEAVE', to:'leave'},
  {label:'YOUR DETAILS', to:'details'},
  {label:'BREAK TIME', to:'break'}
];

  return (
    <>
      <div className="grid-container">
        <div className="grid-child-container">
          <div className="Nav">
            <NavbarScroll />
          </div>
          <div className="sidebar">
            <Sidebar children={sidebarData} />
          </div>
          
        </div>
      </div>
    </>
  );
}
