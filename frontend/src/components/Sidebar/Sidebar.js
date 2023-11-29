import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import "../../Styles/Sidebar.css";

export default function Sidebar({ children }) {
 
  const [activeLink, setActiveLink] = useState('');
 localStorage.removeItem("activeLink")
  useEffect(() => {
    // Check if there's any previously active link in localStorage
    const savedActiveLink = localStorage.getItem('activeLink');
    if (savedActiveLink) {
      setActiveLink(savedActiveLink);
    }
  }, []); // Run this effect only once on component mount

  const handleSetActiveLink = (label) => {
    setActiveLink(label);
    // Save the active link to localStorage
    localStorage.setItem('activeLink', label);
  };

  return (
    <div className="side-container">
      <div className="sider">
        <div>
          <div>
            <ul className="nav flex-column align-items-sm-start" id="menu">
              <div className="nav-div">
                {children.map((child, idx) => (
                  <li key={idx} className="nav-item">
                    <Link
                      to={child.to}
                      className={`link-text ${activeLink === child.label ? 'active' : ''}`}
                      onClick={() => handleSetActiveLink(child.label)}
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </div>
            </ul>
          </div>
        </div>
      </div>

      <div className="side-content">
        <Outlet />
      </div>
    </div>
  );
}
