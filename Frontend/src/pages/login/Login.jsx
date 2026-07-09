import React from "react";
import "./login.css";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const location = useLocation();
  const [toastMessage, setToastMessage] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.showToast) {
      setToastMessage("Your session has expired. Kindly login.");

      const timer = setTimeout(() => setToastMessage(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const username = formData.get("login-name");
    const password = formData.get("login-pass");

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("netizone_token", data.token);
        localStorage.setItem("netizone_username", data.user.username);
        navigate("/dashboard/my-dashboard");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Could not connect to the server");
    }
  };
  return (
    <>
      <div className="login">
        <div className="login-box">
          <p id="internet-name">NETIZONE</p>
          <form onSubmit={handleLogin}>
            {error && <p id="error-message">{error}</p>}
            <div className="login-form-row">
              <label htmlFor="login-name">Username</label>
              <span id="login-icon-span">
                <i className="fa-solid fa-user"></i>
                <input
                  type="text"
                  name="login-name"
                  id="login-name"
                  placeholder="Enter your username"
                />
              </span>
            </div>
            <div className="login-form-row">
              <label htmlFor="login-pass">Password</label>
              <span id="login-icon-span">
                <i className="fa-solid fa-lock"></i>
                <input
                  type="password"
                  name="login-pass"
                  id="login-pass"
                  placeholder="Enter your password"
                />
              </span>
            </div>
            <div id="remember-forgot">
              <span>
                <input type="checkbox" name="remember" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </span>
              <Link>Forgot password?</Link>
            </div>
            <button>Login</button>
          </form>
          <p id="register-link">
            Don't have an account? <Link to={"/register"}>Register</Link>
          </p>
        </div>
        {toastMessage && (
          <div className="custom-toast animate-slide-in">
            <div className="toast-content">
              <i className="fa-solid fa-circle-check toast-icon"></i>
              <span>{toastMessage}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
