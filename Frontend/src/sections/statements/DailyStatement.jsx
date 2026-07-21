import React from "react";
import "./statements.css";

function DailyStatement() {
  return (
    <>
      <div className="daily-statement">
        <p>Daily Report</p>
        <div className="report-top">
          <p>All transactions today</p>
          <button>
            Export <i className="fa-solid fa-download"></i>
          </button>
        </div>
        <div className="daily-report-table">
          <table id="day-report-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Type</th>
                <th>Plan</th>
                <th>Created</th>
                <th>Payment mode</th>
                <th>Router</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ACC00001</td>
                <td>Hotspot</td>
                <td>BAZU 2hrs</td>
                <td>
                  {new Date().toLocaleString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </td>
                <td>Bank</td>
                <td>Jeza</td>
              </tr>
              <tr>
                <td>ACC00002</td>
                <td>Hotspot</td>
                <td>BAZU 2hrs</td>
                <td>
                  {new Date().toLocaleString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </td>
                <td>Bank</td>
                <td>Jeza</td>
              </tr>
              <tr>
                <td>ACC00003</td>
                <td>Hotspot</td>
                <td>BAZU 2hrs</td>
                <td>
                  {new Date().toLocaleString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </td>
                <td>Bank</td>
                <td>Jeza</td>
              </tr>
              <tr>
                <td>ACC00004</td>
                <td>Hotspot</td>
                <td>BAZU 2hrs</td>
                <td>
                  {new Date().toLocaleString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </td>
                <td>Bank</td>
                <td>Jeza</td>
              </tr>
              <tr>
                <td>ACC00005</td>
                <td>Hotspot</td>
                <td>BAZU 2hrs</td>
                <td>
                  {new Date().toLocaleString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </td>
                <td>Bank</td>
                <td>Jeza</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default DailyStatement;
