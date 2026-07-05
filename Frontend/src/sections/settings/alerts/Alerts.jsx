import React from "react";
import "./alerts.css";

function Alerts() {
  return (
    <>
      <div className="alerts">
        <p>User Alerts</p>
        <form>
          <div className="alert-div">
            <label htmlFor="payment-notification">Payment Notification</label>
            <textarea
              name="payment-notification"
              id="payment-notification"
            ></textarea>
          </div>
          <div className="alert-div">
            <label htmlFor="balance-notification">Balance Notification</label>
            <textarea
              name="balance-notification"
              id="balance-notification"
            ></textarea>
          </div>
          <div className="alert-div">
            <label htmlFor="expired-notification">Expired Notification</label>
            <textarea
              name="expired-notification"
              id="expired-notification"
            ></textarea>
          </div>
          <button id="save-notifications">Save Changes</button>
        </form>
      </div>
    </>
  );
}

export default Alerts;
