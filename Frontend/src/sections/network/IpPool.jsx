import React, { useState } from "react";
import "./network.css";
import { useEffect } from "react";

function IpPool() {
  const [poolOpen, setPoolOpen] = useState(false);
  const [routersList, setRoutersList] = useState([]);
  const [poolList, setPoolList] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("netizone_token");

    if (!token) {
      console.error("No token found, redirecting to login...");
      return;
    }

    const fetchPools = async () => {
      try {
        const poolResponse = await fetch("http://localhost:3000/api/pools", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (poolResponse.ok) {
          const data = await poolResponse.json();
          setPoolList(data.pools || []);
        }
      } catch (err) {
        console.error("Error fetching ip pools:", err);
        return res.status(500).json({ error: "Failed to get pool lists" });
      }
    };
    fetchPools();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("netizone_token");
    if (!token) {
      console.error("No token found, redirecting to login...");
      return;
    }

    const fetchRouterData = async () => {
      try {
        const routerResponse = await fetch(
          "http://localhost:3000/api/routers",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (routerResponse.ok) {
          const routerData = await routerResponse.json();
          setRoutersList(routerData.routers || []);
        } else {
          console.error(
            "Failed to fetch tenant routers. Status:",
            routerResponse.status,
          );
        }
      } catch (err) {
        console.error("Error fetching router data:", err);
      }
    };

    fetchRouterData();
  }, []);

  const handleAddIppool = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("netizone_token");
    if (!token) {
      setError("Your session has expired. Please log in again.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const name = formData.get("pool-name");
    const rangeIp = formData.get("range-ip");
    const routerId = formData.get("pool-router");

    try {
      const response = await fetch("http://localhost:3000/api/pools/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          rangeIp,
          routerId: routerId === "no-router" ? null : routerId,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to add an Ip pool");
      }
      setPoolList((prev) => [...prev, data.pool]);
      setPoolOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <div className="ip-pool">
        <p>IP Pool</p>
        <div className="pool-search">
          <span id="pool-search-div">
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
          <button onClick={() => setPoolOpen(true)}>
            <i className="fa-solid fa-plus"></i> New Pool
          </button>
        </div>
        <div className="pool-table">
          <table id="pool-table">
            <thead>
              <tr>
                <th>Pool Name</th>
                <th>Range IP</th>
                <th>Router</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {poolList.length === 0 ? (
                <tr>
                  <td colSpan="4" id="nothing-found">
                    No IP pool found
                  </td>
                </tr>
              ) : (
                poolList.map((pl) => (
                  <tr key={pl.id}>
                    <td>
                      <b>{pl.name}</b>
                    </td>
                    <td>{pl.rangeIp}</td>
                    <td>{pl.router}</td>
                    <td>
                      <span className="manage-btns">
                        <button id="pool-edit">Edit</button>
                        <button id="pool-delete">Delete</button>
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {poolOpen && (
          <div className="modal-overlay" onClick={() => setPoolOpen(false)}>
            <div className="pool-overlay" onClick={(e) => e.stopPropagation()}>
              <div className="add-pool-top">
                <p>Add a pool</p>
                <button onClick={() => setPoolOpen(false)}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              {error && <p id="error-message">{error}</p>}
              <form onSubmit={handleAddIppool}>
                <div className="add-pool-div">
                  <label htmlFor="pool-name">Pool Name</label>
                  <input type="text" name="pool-name" id="pool-name" />
                </div>
                <div className="add-pool-div">
                  <label htmlFor="range-ip">Range IP</label>
                  <input type="text" name="range-ip" id="range-ip" />
                </div>
                <div className="add-pool-div">
                  <label htmlFor="pool-router">Routers</label>
                  <select name="pool-router" id="pool-router">
                    <option value="no-router">Select routers</option>
                    {routersList.map((router) => (
                      <option key={router.id} value={router.id}>
                        {router.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="pool-btns">
                  <button type="submit" id="pool-save">
                    Save
                  </button>
                  <button
                    type="button"
                    id="pool-cancel"
                    onClick={() => setPoolOpen(false)}
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

export default IpPool;
