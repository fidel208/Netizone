import React from "react";
import "./login.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <div className="login">
        <div className="login-box">
          <p id="internet-name">INTERNET NAME</p>
          <form>
            <div className="login-form-row">
              <label htmlFor="login-name">Username</label>
              <span id="login-icon-span">
                <i className="fa-solid fa-user"></i>
                <input
                  type="text"
                  name="login-name"
                  id="login-name"
                  placeholder="Enter your username"
                  required
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
                  required
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
      </div>
    </>
  );
}

export default Login;
