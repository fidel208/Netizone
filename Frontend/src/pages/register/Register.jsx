import React from "react";
import { useState } from "react";
import "./register.css";

function Register() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDirty, setIsDirty] = useState(false);

  const isPasswordValid = /^[A-Za-z0-9]{8,}$/.test(password);
  const doPasswordsMatch = password === confirmPassword;

  const [showToast, setShowToast] = useState(false);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
      window.location.reload();
    }, 3000);
  };

  return (
    <div className="register">
      <div className="registration-box">
        <div className="registration-words">
          <h1>Netizone</h1>
          <div className="reg-words">
            <p>Register to access all features and services</p>
            <p>Manage your wifi network in one place</p>
          </div>
        </div>
        <div className="registration-form">
          <h2>Create an account</h2>
          <form onSubmit={handleRegisterSubmit}>
            <div className="reg-row">
              <label htmlFor="register-name">
                Full Name <span aria-label="required">*</span>
              </label>
              <input
                type="text"
                name="register-name"
                id="register-name"
                required
              />
            </div>
            <div className="reg-row">
              <label htmlFor="register-email">
                Email Address <span aria-label="required">*</span>
              </label>
              <input
                type="email"
                name="register-email"
                id="register-email"
                required
              />
            </div>
            <div className="reg-row">
              <label htmlFor="register-username">
                Username <span aria-label="required">*</span>
              </label>
              <input
                type="text"
                name="register-username"
                id="register-username"
                required
              />
            </div>
            <div className="reg-row">
              <label htmlFor="register-number">
                Phone Number <span aria-label="required">*</span>
              </label>
              <input
                type="tel"
                name="register-number"
                id="register-number"
                required
              />
            </div>
            <div className="reg-row">
              <label htmlFor="register-password">
                Password <span aria-label="required">*</span>
              </label>
              <input
                type="password"
                name="register-password"
                id="register-password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                  setIsDirty(true);
                }}
              />
            </div>
            <div className="reg-row">
              <label htmlFor="confirm-password">
                Confirm Password <span aria-label="required">*</span>
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                required
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setIsDirty(true);
                }}
              />
            </div>
            {isDirty && (
              <>
                {!isPasswordValid && (
                  <p id="valid-pass" style={{ color: "#dc3545" }}>
                    Password must be at least 6 characters long
                  </p>
                )}

                {isPasswordValid && !doPasswordsMatch && (
                  <p id="valid-pass" style={{ color: "#dc3545" }}>
                    Passwords do not match.
                  </p>
                )}

                {isPasswordValid && doPasswordsMatch && (
                  <p id="valid-pass" style={{ color: "rgb(8, 172, 123)" }}>
                    Password criteria met successfully
                  </p>
                )}
              </>
            )}
            <div className="agree-box">
              <input type="checkbox" name="agree" id="agree" required />
              <label htmlFor="agree">Agree to the terms and conditions</label>
            </div>
            <button data-bs-dismiss="toast" aria-label="Close">
              Register
            </button>
          </form>
          {showToast && (
            <div className="custom-toast animate-slide-in">
              <div className="toast-content">
                <i className="fa-solid fa-circle-check toast-icon"></i>
                <span>
                  Your request for registration has been received successfully.
                  We'll keep in touch on the next steps. Good day.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
