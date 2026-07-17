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
              <option value="all">All customers</option>
              <option value="new">New customers</option>
              <option value="active">Active customers</option>
              <option value="expired">Expired customers</option>
            </select>
          </span>
          <span className="form-row" id="radio-group">
            <label htmlFor="via">Send via</label>
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
            <button id="send-bulk-sms">Send message</button>
            <button id="cancel-bulk-sms">Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default BulkSms;
