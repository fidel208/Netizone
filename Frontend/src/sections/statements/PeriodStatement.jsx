import React from "react";
import "./statements.css";

function PeriodStatement() {
  return (
    <>
      <div className="period-statement">
        <p>Period Report</p>
        <form>
          <div className="period-form-row">
            <label htmlFor="period-from">From</label>
            <input type="date" name="period-from" id="period-from" />
          </div>
          <div className="period-form-row">
            <label htmlFor="period-to">To</label>
            <input type="date" name="period-to" id="period-to" />
          </div>
          <div className="period-form-row">
            <label htmlFor="period-type">Type</label>
            <select name="period-type" id="period-type">
              <option value="all-transactions">All transactions</option>
              <option value="hotspot-transactions">Hotspot</option>
              <option value="pppoe-transactions">PPPOE</option>
            </select>
          </div>
          <button>Download CSV</button>
        </form>
      </div>
    </>
  );
}

export default PeriodStatement;
