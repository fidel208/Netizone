import React, { useState } from "react";
import "./header.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link, replace } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("netizone_token");

    if (!token) {
      navigate("/", { replace: true, state: { showToast: true } });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("netizone_token");
    setIsOpen(false);

    navigate("/", { replace: true });
  };
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const [username, setUsername] = useState("username");

  useEffect(() => {
    const fetchUsername = async () => {
      const token = localStorage.getItem("netizone_token");
      if (!token) {
        return;
      }
      try {
        const response = await fetch("http://localhost:3000/api/username", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setUsername(data.username);
        }
      } catch (err) {
        console.error("Failed to get the username", err);
      }
    };
    fetchUsername();
  }, []);
  return (
    <div className="header">
      <div className="others">
        <p>Hello {username}</p>
        <span id="dp" onClick={toggleDropdown}>
          <span id="online"></span>
        </span>
        {isOpen && (
          <span className="dropdown">
            <Link to="/dashboard/account-settings">
              <i className="fa-solid fa-user"></i>Account Settings
            </Link>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
            </a>
          </span>
        )}
      </div>
    </div>
  );
};

export default Header;
