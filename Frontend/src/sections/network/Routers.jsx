import React, { useState } from "react";
import "./network.css";
import { useEffect } from "react";

function Routers() {
  const [routerModal, setRouterModay] = useState(false);
  const [routerList, setRouterList] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRouters = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/routers");

        if (response.ok) {
          const data = await response.json();
          setRouterList(data.routers || []);
        }
      } catch (err) {
        console.error("Error fetching routers");
      }
    };
    fetchRouters();
  }, []);

  const handleAddRouter = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);

    const name = formData.get("router-name");
    const ipAddress = formData.get("ip-address");
    const username = formData.get("router-username");
    const secret = formData.get("router-secret");
    const statusValue = formData.get("status");

    try {
      const response = await fetch("http://localhost:3000/api/routers/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          ipAddress,
          username,
          secret,
          isActive: statusValue === "active",
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to add router");
      }
      setRouterList((prev) => [...prev, data.router]);

      setRouterModay(false);
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <div className="routers">
        <p>Routers</p>
        {error && <p id="error-message">{error}</p>}
        <div className="router-search">
          <span id="router-search-div">
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
                  placeholder="Search by name"
                />
                <button>Search</button>
              </span>
            </form>
          </span>
          <button onClick={() => setRouterModay(true)}>
            <i className="fa-solid fa-plus"></i> New Router
          </button>
        </div>
        <div className="routers-table">
          <table id="router-table">
            <thead>
              <tr>
                <th>Router Name</th>
                <th>IP Address</th>
                <th>Status</th>
                <th>Manage</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {routerList.length === 0 ? (
                <tr>
                  <td colSpan="5">
                    No routers found. Click "New Router" to add one.
                  </td>
                </tr>
              ) : (
                routerList.map((router) => (
                  <tr key={router.id}>
                    <td>{router.name}</td>
                    <td>{router.ipAddress}</td>
                    <td>
                      <span
                        className={`status-badge ${router.isActive ? "active" : "inactive"}`}
                      >
                        {router.isActive ? "Enabled" : "Disabled"}
                      </span>
                    </td>
                    <td>
                      <button className="btn-manage">Configure</button>
                    </td>
                    <td>
                      <button id="router-download">Download</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {routerModal && (
          <div className="modal-overlay" onClick={() => setRouterModay(false)}>
            <div className="router-modal" onClick={(e) => e.stopPropagation()}>
              <div className="router-modal-top">
                <p>Add a router</p>
                <button onClick={() => setRouterModay(false)}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <form onSubmit={handleAddRouter}>
                <div className="router-form-div">
                  <label htmlFor="status">Status</label>
                  <span className="router-radios">
                    <input
                      type="radio"
                      name="status"
                      id="enable"
                      value="active"
                      defaultChecked
                    />
                    <label htmlFor="status">Enable</label>
                  </span>
                  <span className="router-radios">
                    <input
                      type="radio"
                      name="status"
                      id="disable"
                      value="inactive"
                    />
                    <label htmlFor="status">Disable</label>
                  </span>
                </div>
                <div className="router-form-div">
                  <label htmlFor="router-name">Router Name</label>
                  <input type="text" name="router-name" id="router-name" />
                </div>
                <div className="router-form-div">
                  <label htmlFor="ip-address">IP Address</label>
                  <input type="text" name="ip-address" id="ip-address" />
                </div>
                <div className="router-form-div">
                  <label htmlFor="router-username">Username</label>
                  <input
                    type="text"
                    name="router-username"
                    id="router-username"
                  />
                </div>
                <div className="router-form-div">
                  <label htmlFor="router-secret">Router Secret</label>
                  <input
                    type="password"
                    name="router-secret"
                    id="router-secret"
                  />
                </div>
                <div className="router-add-btns">
                  <button id="router-add-btn">Add</button>
                  <button
                    id="router-cancel-btn"
                    onClick={() => setRouterModay(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Routers;
