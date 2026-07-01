import React from "react";
import "./recharge.css";

function Refill() {
  return (
    <>
      <div className="refill-client">
        <p>Refill Client</p>
        <form>
          <span className="form-row">
            <label htmlFor="ref-acc">Select Account</label>
            <select name="ref-acc" id="ref-acc">
              <option value="none">Select Account</option>
              <option value="acc1">ACC00001 - 0789455874</option>
              <option value="acc2">ACC00002 - 0789455874</option>
              <option value="acc3">ACC00003 - 0789455874</option>
              <option value="acc4">ACC00004 - 0789455874</option>
            </select>
          </span>
          <span className="form-row">
            <label htmlFor="voucher">Code Voucher</label>
            <input
              type="text"
              name="voucher"
              id="voucher"
              placeholder="Enter voucher code"
            />
          </span>
          <div className="refill-btns">
            <button id="refill-btn">Refill</button>
            <button id="cancel-refill-btn">Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Refill;
