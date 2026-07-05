import React from "react";
import "./maintenance.css";
import { useState } from "react";

function Maintenance() {
  const [isOn, setIsOn] = useState(false);
  return (
    <>
      <div className="maintenance">
        <p>Maintenance Mode</p>
        <form>
          <div className="maintain-div">
            <label htmlFor="start-maint">Start</label>
            <span>
              <label className="switch-container">
                <input
                  type="checkbox"
                  checked={isOn}
                  onChange={(e) => setIsOn(e.target.checked)}
                />
                <span className="slider-pill"></span>
              </label>
            </span>
          </div>
          <div className="maintain-div">
            <label htmlFor="end-date">End Date</label>
            <input type="date" name="end-date" id="end-date" />
          </div>
          <button id="start-btn">Start</button>
        </form>
      </div>
    </>
  );
}

export default Maintenance;
