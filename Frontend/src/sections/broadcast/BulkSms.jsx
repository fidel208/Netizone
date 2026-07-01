import React from "react";
import "./broadcast.css";

function BulkSms() {
  return (
    <>
      <div className="bulk-sms">
        <p>Bulk Clients</p>
        <form>
          <span className="form-row">
            <label htmlFor="group">Group</label>
            <select name="group" id="group">
              <option value="all">All Customers</option>
              <option value="new">New Customers</option>
              <option value="active">Active Customers</option>
              <option value="expired">Expired Customers</option>
            </select>
          </span>
          <span className="form-row" id="radio-group">
            <label htmlFor="via">Send Via</label>
            <span id="radio-item">
              <input type="radio" name="via" id="sms" />
              <label htmlFor="sms">Sms</label>
            </span>
            <span id="radio-item">
              <input type="radio" name="via" id="whatsapp" />
              <label htmlFor="whatsapp">Whatsapp</label>
            </span>
          </span>
          <span className="form-row">
            <label htmlFor="bulk-message">Message</label>
            <textarea
              name="bulk-message"
              id="bulk-message"
              placeholder="Enter your message"
            ></textarea>
          </span>
          <div className="bulk-message-btns">
            <button id="send-bulk-sms">Send Message</button>
            <button id="cancel-bulk-sms">Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default BulkSms;
