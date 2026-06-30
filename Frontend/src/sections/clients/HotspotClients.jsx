import React, { useState } from "react";
import "./clients.css";

function HotspotClients() {
  const hotspotUsers = [
    {
      username: "ACC00001",
      number: "0789455874",
      service: "Hotspot",
      status: "Active",
      created: new Date().toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    },
    {
      username: "ACC00002",
      number: "0789455874",
      service: "Hotspot",
      status: "Active",
      created: new Date().toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    },
    {
      username: "ACC00003",
      number: "0789455874",
      service: "Hotspot",
      status: "Active",
      created: new Date().toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    },
    {
      username: "ACC00004",
      number: "0789455874",
      service: "Hotspot",
      status: "Active",
      created: new Date().toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    },
    {
      username: "ACC00005",
      number: "0789455874",
      service: "Hotspot",
      status: "Active",
      created: new Date().toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    },
    {
      username: "ACC00006",
      number: "0789455874",
      service: "Hotspot",
      status: "Active",
      created: new Date().toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const lastRowIndex = currentPage * rowsPerPage;
  const firstRowIndex = lastRowIndex - rowsPerPage;

  const currentRows = hotspotUsers.slice(firstRowIndex, lastRowIndex);
  const totalPages = Math.ceil(hotspotUsers.length / rowsPerPage) || 1;

  return (
    <>
      <div className="hotspot-clients">
        <p>Hotspot Clients</p>
        <div className="hotspot-user-search">
          <span id="search-div">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <span>
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="search"
                  name="hotspot-search"
                  id="hotspot-search"
                  placeholder="Search by username"
                />
                <button>Search</button>
              </span>
            </form>
          </span>
          <button>
            <i className="fa-solid fa-plus"></i>New Hotspot User
          </button>
        </div>
        <div className="hotspot-clients-table">
          <table id="hotspot-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Phone Number</th>
                <th>Service Type</th>
                <th>Status</th>
                <th>Created On</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((hotspotUser) => (
                <tr key={hotspotUser.username}>
                  <td>{hotspotUser.username}</td>
                  <td>{hotspotUser.number}</td>
                  <td>{hotspotUser.service}</td>
                  <td>{hotspotUser.status}</td>
                  <td>{hotspotUser.created}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-controls">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="page-btn"
            >
              <i className="fa-solid fa-angle-left"></i> Previous
            </button>
            <span className="page-number">
              Page <b>{currentPage}</b> of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="page-btn"
            >
              Next <i className="fa-solid fa-angle-right"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HotspotClients;
