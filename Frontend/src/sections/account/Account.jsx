import React, { useState } from "react";
import "./account.css";

function Account() {
  const [payBox, setPayBox] = useState(false);
  const triggerOpenBox = () => {
    setPayBox(!payBox);
  };

  const [paymentMethod, setPaymentMethod] = useState("mobile");
  return (
    <div className="account">
      <div className="account-payment">
        <p>
          Status : <span id="active-state">Active</span>
        </p>
        <div className="plan">
          <span id="plan-title">
            <p>Current Plan</p>
          </span>
          <div className="plan-box">
            <span className="amounts">
              <p id="amount">
                <sup>Kes</sup> 500<span id="decimal">.00</span>{" "}
                <sub>/month</sub>
              </p>
              <p id="for">For personal and business use.</p>
              <button id="pay-btn" onClick={triggerOpenBox}>
                Pay Now <i className="fa-solid fa-angle-right"></i>
              </button>
            </span>
            <span className="details">
              <ul>
                <li>All features enables</li>
                <li>Upto 5 routers</li>
                <li>Daily report</li>
                <li>Period reports</li>
              </ul>
            </span>
          </div>
        </div>
        <div className="payment-box" id={`${payBox ? "open-pay-box" : ""}`}>
          <div className="pay-box">
            <p>Pay with:</p>
            <div className="choices">
              <span>
                <input
                  type="radio"
                  name="payment-method"
                  id="mobile"
                  checked={paymentMethod === "mobile"}
                  onChange={() => setPaymentMethod("mobile")}
                />
                <label htmlFor="mobile">
                  <i className="fa-solid fa-wallet"></i>Mobile Money
                </label>
              </span>
              <span>
                <input
                  type="radio"
                  name="payment-method"
                  id="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                <label htmlFor="card">
                  <i className="fa-regular fa-credit-card"></i>Card
                </label>
              </span>
            </div>
          </div>
          {paymentMethod === "mobile" && (
            <div className="pay-for">
              <form id="mobile-pay-form">
                <span>
                  <label htmlFor="mpesa-number">Mpesa Number</label>
                  <input
                    type="number"
                    name="mpesa0number"
                    id="mpesa-number"
                    placeholder="eg. 0712345678"
                  />
                </span>
                <button id="init">Initialize</button>
              </form>
            </div>
          )}

          {paymentMethod === "card" && (
            <p className="text-danger mt-2">
              Sorry, this method is not yet ready for use. Use mobile payment
            </p>
          )}
        </div>
      </div>
      <div className="edit-details">
        <form id="edit-form">
          <p>Update Profile:</p>
          <span>
            <label htmlFor="edit-name">Username</label>
            <input type="text" name="edit-name" id="edit-name" />
          </span>
          <span>
            <label htmlFor="edit-email">Email Address</label>
            <input type="email" name="edit-email" id="edit-email" />
          </span>
          <button>Update</button>
        </form>
        <form id="change-form">
          <p>Change Password:</p>
          <span>
            <label htmlFor="new-pass">New Password</label>
            <input type="password" name="new-pass" id="new-pass" />
          </span>
          <span>
            <label htmlFor="confirm-new">Confirm New Password</label>
            <input type="password" name="confirm-new" id="confirm-new" />
          </span>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Account;
