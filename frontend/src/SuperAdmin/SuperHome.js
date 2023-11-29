import React from "react";


import "../Styles/SuperHome.css";
// import DetailsContext from "../Context/CreateContext";
import NavbarScroll from "../components/Navbar/NavbarScroll";
import Sidebar from "../components/Sidebar/Sidebar";
import UserName from "../Functions/UserName";



export default function SuperAdminHome() {
  // const { data, setData } = useState([])

  UserName()

const sidebarData = [
  {label:'Admins', to:'admins'},
  {label:'Add Admin', to:'addAdmin'}
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
