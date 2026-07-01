import React from "react";
import "./broadcast.css";

function SingleSms() {
  return (
    <>
      <div className="single-sms">
        <p>Single Client</p>
        <form>
          <span className="form-row">
            <label htmlFor="customer">Customers</label>
            <select name="customer" id="customer">
              <option value="no-plan">Select Client</option>
              <option value="acc1">ACC00001 - 0789455874</option>
              <option value="acc2">ACC00002 - 0789455874</option>
              <option value="acc3">ACC00003 - 0789455874</option>
              <option value="acc4">ACC00004 - 0789455874</option>
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
            <label htmlFor="single-message">Message</label>
            <textarea
              name="single-message"
              id="single-message"
              placeholder="Enter your message"
            ></textarea>
          </span>
          <div className="single-message-btns">
            <button id="send-single-sms">Send Message</button>
            <button id="cancel-single-sms">Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SingleSms;
