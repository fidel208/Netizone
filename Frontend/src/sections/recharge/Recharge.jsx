import React from "react";
import "./recharge.css";

function Recharge() {
  return (
    <>
      <div className="recharge-client">
        <p>Recharge Client</p>
        <form>
          <span className="form-row">
            <label htmlFor="select-acc">Select Account</label>
            <select name="select-acc" id="select-acc">
              <option value="none">Select Account</option>
              <option value="acc1">ACC00001 - 0789455874</option>
              <option value="acc2">ACC00002 - 0789455874</option>
              <option value="acc3">ACC00003 - 0789455874</option>
              <option value="acc4">ACC00004 - 0789455874</option>
            </select>
          </span>
          <span id="radio-group" className="form-row">
            <label htmlFor="type">Type</label>
            <span id="radio-item">
              <input type="radio" name="type" id="hotspot-radio" />
              <label htmlFor="hotspot-radio">Hotspot</label>
            </span>
            <span id="radio-item">
              <input type="radio" name="type" id="pppoe-radio" />
              <label htmlFor="pppoe-radio">PPPOE</label>
            </span>
          </span>
          <span className="form-row">
            <label htmlFor="router">Router</label>
            <select name="router" id="router">
              <option value="no-router">Select Router</option>
              <option value="router-1">Jeza</option>
            </select>
          </span>
          <span className="form-row">
            <label htmlFor="plan">Plan</label>
            <select name="plans" id="plans">
              <option value="no-plan">Select Plan</option>
              <option value="2h">Bazu 2hrs - Kes. 10</option>
              <option value="4h">Bazu 4hrs - Kes. 20</option>
              <option value="6h">Bazu 6hrs - Kes. 60</option>
              <option value="12h">Bazu 12hrs - Kes. 80</option>
              <option value="24h">Bazu 24hrs - Kes. 100</option>
              <option value="7d">Bazu 7days - Kes. 300</option>
              <option value="1m">Bazu 1 month - Kes. 500</option>
            </select>
          </span>
          <span id="radio-group" className="form-row">
            <label htmlFor="using">Payment Mode</label>
            <span id="radio-item">
              <input type="radio" name="p-mode" id="cash" />
              <label htmlFor="cash">Cash</label>
            </span>
            <span id="radio-item">
              <input type="radio" name="p-mode" id="zero" />
              <label htmlFor="zero">zero(0)</label>
            </span>
          </span>
          <div className="recharge-btns">
            <button id="recharge-btn">Recharge</button>
            <button id="cancel-recharge-btn">Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Recharge;
