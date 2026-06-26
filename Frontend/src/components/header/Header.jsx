import React, { useState } from "react";
import "./header.css";
import "bootstrap/dist/css/bootstrap.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="header">
      <h1>MWITIX NET</h1>
      <div className="others">
        <p>Hello Fidel</p>
        <span id="dp" onClick={toggleDropdown}>
          <span id="online"></span>
        </span>
        {isOpen && (
          <span className="dropdown">
            <a href="#">
              <i class="fa-solid fa-user"></i>Account settings
            </a>
            <a href="/login">
              {" "}
              <i class="fa-solid fa-arrow-right-from-bracket"></i>Log out
            </a>
          </span>
        )}
      </div>
    </div>
  );
};

export default Header;
