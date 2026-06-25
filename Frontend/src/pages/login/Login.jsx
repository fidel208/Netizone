import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./login.css";
import { useEffect } from "react";
import { Link, redirect } from "react-router-dom";

function Login() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      <section>
        <article id="left">
          <h1>Netizone</h1>
          {isLogin ? (
            <div className="words">
              <h2>
                Don't have an <br /> account?
              </h2>
              <p>Register to access all the features of our service</p>
              <p>Manage your wifi network in one place</p>
            </div>
          ) : (
            <div className="words">
              <h2>
                Have an account <br /> already?
              </h2>
              <p>Login to access all the features of our service</p>
              <p>Manage your wifi network in one place</p>
            </div>
          )}
        </article>
        <article id="auth">
          {isLogin ? (
            <div className="login">
              <h1>Sign in</h1>
              <form
                method="get"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <span>
                  <label htmlFor="login-name">Username</label>
                  <span id="input-span">
                    <i class="fa-solid fa-user"></i>
                    <input
                      type="login-text"
                      name="login-name"
                      id="login-name"
                    />
                  </span>
                </span>
                <span>
                  <label htmlFor="signup-password">Password</label>
                  <span id="input-span">
                    <i class="fa-solid fa-lock"></i>
                    <input
                      type="password"
                      name="signup-password"
                      id="signup-password"
                    />
                  </span>
                </span>
                <span id="check">
                  <span>
                    <input type="checkbox" name="chechbox" id="checkbox" />
                    <label htmlFor="checkbox">Remember me</label>
                  </span>
                  <a id="forgot" href="">
                    Forgot password?
                  </a>
                </span>
                <button
                  onClick={() => {
                    window.location.href = "./dashboard";
                  }}
                >
                  Login
                </button>
                <p id="shift">
                  Don't have an account?{" "}
                  <a
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      toggleForm();
                    }}
                  >
                    Register
                  </a>
                </p>
              </form>
            </div>
          ) : (
            <div className="signup">
              <h1>Create an account</h1>
              <form
                method="post"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <span>
                  <label htmlFor="email">Email Address</label>
                  <span id="input-span">
                    <i class="fa-solid fa-envelope"></i>
                    <input type="email" name="email" id="email" />
                  </span>
                </span>
                <div id="two">
                  <span>
                    <label htmlFor="number">Phone Number</label>
                    <span id="input-span">
                      <i class="fa-solid fa-phone"></i>
                      <input type="tel" name="number" id="number" />
                    </span>
                  </span>
                  <span>
                    <label htmlFor="signup-name">Username</label>
                    <span id="input-span">
                      <i class="fa-solid fa-user"></i>
                      <input type="text" name="signup-namer" id="signup-name" />
                    </span>
                  </span>
                </div>
                <div id="two">
                  <span>
                    <label htmlFor="signup-pass">Password</label>
                    <span id="input-span">
                      <i class="fa-solid fa-lock"></i>
                      <input
                        type="password"
                        name="signup-pass"
                        id="signup-pass"
                      />
                    </span>
                  </span>
                  <span>
                    <label htmlFor="confirm-pass">Confirm Password</label>
                    <span id="input-span">
                      <i class="fa-solid fa-unlock"></i>
                      <input
                        type="password"
                        name="confirm-pass"
                        id="confirm-pass"
                      />
                    </span>
                  </span>
                </div>
                <p id="password-text"></p>
                <span id="agree">
                  <input type="checkbox" name="agree" id="agree" />
                  <label htmlFor="agree">
                    Agree to the terms and conditions
                  </label>
                </span>
                <button>Sign up</button>
                <p id="shift">
                  Have an account?{" "}
                  <a
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      toggleForm();
                    }}
                  >
                    Login
                  </a>
                </p>
              </form>
            </div>
          )}
        </article>
      </section>
    </>
  );
}

export default Login;
