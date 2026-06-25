import React from "react";
import "./header.css";
import "bootstrap/dist/css/bootstrap.css";

const Header = () => {
  return (
    <div className="header">
      <h1>MWITIX NET</h1>
      <div className="others">
        <p>Hello Fidel</p>
        <span id="dp">
          <span id="online"></span>
        </span>
        <span className="dropdown">
          <a href="">Account settings</a>
          <a href="/login">Log out</a>
        </span>
      </div>
    </div>
  );
};

export default Header;
