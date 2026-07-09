import React, { useState } from "react";
import "./network.css";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { generateMikrotikHtml } from "../../utils/microtik";

function Routers() {
  const [routerModal, setRouterModal] = useState(false);
  const [routerList, setRouterList] = useState([]);
  const [error, setError] = useState("");
  const [internetName, setInternetName] = useState("INTERNET NAME");
  const [userPhone, setUserPhone] = useState("phone number");

  useEffect(() => {
    const token = localStorage.getItem("netizone_token");
    if (!token) {
      console.error("No token found, redirecting to login...");
      return;
    }
    const fetchRouters = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/routers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

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

    const token = localStorage.getItem("netizone_token");
    if (!token) {
      setError("Your session has expired. Please log in again.");
      return;
    }

    const formData = new FormData(e.currentTarget);

    const name = formData.get("router-name");
    const ipAddress = formData.get("ip-address");
    const username = formData.get("router-username");
    const secret = formData.get("router-secret");
    const statusValue = formData.get("status");

    try {
      const response = await fetch("http://localhost:3000/api/routers/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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

      setRouterModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("netizone_token");
    if (!token) return;

    const fetchUserPhone = async () => {
      const token = localStorage.getItem("netizone_token");
      if (!token) {
        return;
      }
      try {
        const response = await fetch("http://localhost:3000/api/phone-number", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setUserPhone(data.phoneNumber);
        }
      } catch (err) {
        console.error("Failed to get the phone number", err);
      }
    };
    fetchUserPhone();
  }, []);

  useEffect(() => {
    const fetchInternetName = async () => {
      const token = localStorage.getItem("netizone_token");
      if (!token) return;
      try {
        const response = await fetch("http://localhost:3000/api/internetname", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setInternetName(data.internetName);
        }
      } catch (err) {
        console.error("Failed to get the internet name", err);
      }
    };
    fetchInternetName();
  }, []);

  const handleDelete = async (routerId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this router?",
    );
    if (!confirmDelete) return;

    const token = localStorage.getItem("netizone_token");
    if (!token) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/routers/${routerId}/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setRouterList((prevList) =>
          prevList.filter((router) => router.id !== routerId),
        );
      }
    } catch (err) {
      console.error("An error occured during router deletion:", err);
    }
  };

  const handleDownloadHotspotPage = async (routerId, routerName) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/public/routers/${routerId}/packages`,
      );
      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(
          "Failed to get service plans for this specific router configuration.",
        );
        return;
      }

      const fullHtmlString = generateMikrotikHtml(
        routerName,
        data.packages,
        userPhone,
        internetName,
      );

      const blob = new Blob([fullHtmlString], { type: "text/html" });
      const temporaryFileUrl = URL.createObjectURL(blob);

      const invisibleLink = document.createElement("a");
      invisibleLink.href = temporaryFileUrl;
      invisibleLink.download = `login.html`;

      document.body.appendChild(invisibleLink);
      invisibleLink.click();

      document.body.removeChild(invisibleLink);
      URL.revokeObjectURL(temporaryFileUrl);
    } catch (err) {
      console.error("AN error has accured during compiling:", err);
      alert("An unexpected exception occurred generating the template file.");
    }
  };

  return (
    <>
      <div className="routers">
        <p>Routers</p>
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
          <button onClick={() => setRouterModal(true)}>
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
                  <td colSpan="5" id="nothing-found">
                    No routers found.
                  </td>
                </tr>
              ) : (
                routerList.map((router) => (
                  <tr key={router.id}>
                    <td>
                      <b>{router.name}</b>
                    </td>
                    <td>{router.ipAddress}</td>
                    <td>
                      <span
                        className={`status-badge ${router.isActive ? "active" : "inactive"}`}
                      >
                        {router.isActive ? "Online" : "Offline"}
                      </span>
                    </td>
                    <td>
                      <span className="manage-btn">
                        <button
                          id="delete-router-btn"
                          onClick={() => handleDelete(router.id)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                        <button id="reboot-btn">Reboot</button>
                      </span>
                    </td>
                    <td>
                      <button
                        id="router-download"
                        type="button"
                        onClick={() =>
                          handleDownloadHotspotPage(router.id, router.name)
                        }
                      >
                        <i className="fa-solid fa-download"></i> Download
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {routerModal && (
          <div className="modal-overlay" onClick={() => setRouterModal(false)}>
            <div className="router-modal" onClick={(e) => e.stopPropagation()}>
              <div className="router-modal-top">
                <p>Add a router</p>
                <button onClick={() => setRouterModal(false)}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              {error && <p id="error-message">{error}</p>}
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
                  <button id="router-add-btn" type="submit">
                    Add
                  </button>
                  <button
                    id="router-cancel-btn"
                    type="button"
                    onClick={() => setRouterModal(false)}
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
