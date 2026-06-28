import React, { useState } from "react";
import "./header.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="header">
      <div className="others">
        <p>Hello Username</p>
        <span id="dp" onClick={toggleDropdown}>
          <span id="online"></span>
        </span>
        {isOpen && (
          <span className="dropdown">
            <Link to="/dashboard/account-settings">
              <i class="fa-solid fa-user"></i>Account Settings
            </Link>
            <Link to="/login">
              <i class="fa-solid fa-arrow-right-from-bracket"></i>Log out
            </Link>
          </span>
        )}
      </div>
    </div>
  );
};

export default Header;
