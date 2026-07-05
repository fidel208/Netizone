import React from "react";
import "./general.css";

function General() {
  return (
    <>
      <div className="general-settings">
        <p>General Settings</p>
        <form>
          <div className="part-1">
            <div className="general-div">
              <label htmlFor="internet">Internet Name</label>
              <input type="text" name="internet" id="internet" />
            </div>
            <div className="general-div">
              <label htmlFor="address">Address</label>
              <input type="text" name="address" id="address" />
            </div>
            <div className="general-div">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" name="phone" id="phone" />
            </div>
            <div className="general-div">
              <label htmlFor="enable">Enable System</label>
              <select name="enable" id="enable">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
          <div className="part-2">
            <div className="general-div">
              <label htmlFor="expired-not">Expired Notification</label>
              <select name="expired-not" id="expired-not">
                <option value="whatsapp">Whatsapp</option>
                <option value="sms">Sms</option>
              </select>
            </div>
            <div className="general-div">
              <label htmlFor="payment-not">Payment Notification</label>
              <select name="payment-not" id="payment-not">
                <option value="whatsapp">Whatsapp</option>
                <option value="sms">Sms</option>
              </select>
            </div>
            <div className="general-div">
              <label htmlFor="reminder-not">Reminder Notification</label>
              <select name="reminder-not" id="reminder-not">
                <option value="whatsapp">Whatsapp</option>
                <option value="sms">Sms</option>
              </select>
            </div>
          </div>
          <button>Save Changes</button>
        </form>
      </div>
    </>
  );
}

export default General;
