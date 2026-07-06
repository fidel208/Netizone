import React, { useEffect } from "react";
import { useState } from "react";
import "./packages.css";

function Hotspot() {
  const [isOpen, setIsOpen] = useState(false);
  const [limitType, setLimitType] = useState("none");
  const [routersList, setRoutersList] = useState([]);
  const [packageList, setPackageList] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/packages");

        if (response.ok) {
          const data = await response.json();
          setPackageList(data.packages || []);
        }
      } catch (err) {
        console.error("Error fetching packages");
      }
    };
    fetchPackages();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const routerResponse = await fetch("http://localhost:3000/api/routers");
        if (routerResponse.ok) {
          const routerData = await routerResponse.json();
          setRoutersList(routerData.routers || []);
        }
      } catch (err) {
        console.error("Error fetching router data:", err);
      }
    };
    fetchData();
  }, []);

  const handleAddPackages = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);

    const name = formData.get("plan-name");
    const statusValue = formData.get("status");
    const type = formData.get("type");
    const bandwidth = formData.get("bandwidth-name");
    const routerId = formData.get("plan-router");
    const price = formData.get("plan-price");

    let timeLimit = "Unlimited";
    let dataLimit = "Unlimited";

    const validityValue = formData.get("plan-validity");
    const validityUnit = formData.get("validity");
    const validity = `${validityValue} ${validityUnit?.toUpperCase()}`;

    if (limit === "limited") {
      if (limitType === "time" || limitType === "both") {
        timeLimit = `${formData.get("time")} ${formData.get("time-unit").replace("time-", "")}`;
      }
      if (limitType === "data" || limitType === "both") {
        dataLimit = `${formData.get("data")} ${formData.get("data-unit").toUpperCase()}`;
      }
    }

    try {
      const response = await fetch("http://localhost:3000/api/packages/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          isActive: statusValue === "active",
          type,
          price,
          limitType: limit,
          bandwidth,
          validity,
          timeLimit,
          dataLimit,
          routerId: routerId === "no-router" ? null : routerId,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to add package");
      }
      setPackageList((prev) => [...prev, data.package]);
      setIsOpen(false);
      setLimit("unlimited");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLimitChange = (e) => setLimitType(e.target.value);
  const [limit, setLimit] = useState("none");
  const handleLimit = (e) => {
    setLimit(e.target.value);
  };

  return (
    <>
      <div className="hotspot-packages">
        <p>Hotspot Packages</p>
        <div className="hotspot-plans-search">
          <span id="package-search-div">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <span>
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="search"
                  name="hotspot-plan-search"
                  id="hotspot-plan-search"
                  placeholder="Search by plan name"
                />
                <button>Search</button>
              </span>
            </form>
          </span>
          <button onClick={() => setIsOpen(true)}>
            <i className="fa-solid fa-plus"></i>New Package
          </button>
        </div>
        <div className="hotspot-plans-table">
          <table id="hotspot-plans-table">
            <thead>
              <tr>
                <th>Plan Name</th>
                <th>Type</th>
                <th>Bandwidth</th>
                <th>Price</th>
                <th>Status</th>
                <th>Time LImit</th>
                <th>Data Limit</th>
                <th>Validity</th>
                <th>Routers</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {packageList.length === 0 ? (
                <tr>
                  <td colSpan="9">No service plans found.</td>
                </tr>
              ) : (
                packageList.map((pkg) => (
                  <tr key={pkg.id}>
                    <td>
                      <strong>{pkg.name}</strong>
                    </td>
                    <td>{pkg.type ? pkg.type.toUpperCase() : "PREPAID"}</td>
                    <td>{pkg.bandwidth}</td>
                    <td>Kes. {pkg.price?.toFixed(2) || "0.00"}</td>
                    <td>
                      <span
                        className={`status-badge ${pkg.isActive ? "active" : "inactive"}`}
                      >
                        {pkg.isActive ? "Active" : "Disabled"}
                      </span>
                    </td>
                    <td>{pkg.timeLimit}</td>
                    <td>{pkg.dataLimit}</td>
                    <td>{pkg.validity}</td>
                    <td>{pkg.router?.name || "All"}</td>
                    <td>
                      <button id="package-delete-btn">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {isOpen && (
          <div className="modal-overlay" onClick={() => setIsOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-top">
                <p>Add a service plan</p>
                <button onClick={() => setIsOpen(false)}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              {error && <p id="error-message">{error}</p>}
              <form onSubmit={handleAddPackages}>
                <div className="plan-form">
                  <label htmlFor="plan-status">Status</label>
                  <span className="plan-form-span">
                    <input
                      type="radio"
                      name="status"
                      id="enable"
                      value="active"
                      defaultChecked
                    />
                    <label htmlFor="status">Enable</label>
                  </span>
                  <span className="plan-form-span">
                    <input
                      type="radio"
                      name="status"
                      id="disable"
                      value="inactive"
                    />
                    <label htmlFor="status">Disable</label>
                  </span>
                </div>
                <div className="plan-form">
                  <label htmlFor="plan-type">Type</label>
                  <span className="plan-form-span">
                    <input
                      type="radio"
                      name="type"
                      id="prepaid"
                      value="prepaid"
                      defaultChecked
                    />
                    <label htmlFor="type">Prepaid</label>
                  </span>
                  <span className="plan-form-span">
                    <input
                      type="radio"
                      name="type"
                      id="postpaid"
                      value="postpaid"
                    />
                    <label htmlFor="type">Postpaid</label>
                  </span>
                </div>
                <div className="plan-form">
                  <label htmlFor="plan-name">Plan Name</label>
                  <input type="text" name="plan-name" id="plan-name" />
                </div>
                <div className="plan-form">
                  <label htmlFor="plan-limit">Limit</label>
                  <span className="plan-form-span">
                    <input
                      type="radio"
                      name="limit"
                      id="unlimited"
                      value="unlimited"
                      checked={limit === "unlimited"}
                      onChange={handleLimit}
                    />
                    <label htmlFor="limit">Unlimited</label>
                  </span>
                  <span className="plan-form-span">
                    <input
                      type="radio"
                      name="limit"
                      id="limited"
                      value="limited"
                      checked={limit === "limited"}
                      onChange={handleLimit}
                    />
                    <label htmlFor="limited">Limited</label>
                  </span>
                </div>
                {limit === "limited" && (
                  <>
                    <div className="plan-form">
                      <label htmlFor="limit-type">Limit Type</label>
                      <span className="plan-form-span">
                        <input
                          type="radio"
                          name="limit-type"
                          id="time-limit"
                          value="time"
                          checked={limitType === "time"}
                          onChange={handleLimitChange}
                        />
                        <label htmlFor="limit-type">Time Limit</label>
                      </span>
                      <span className="plan-form-span">
                        <input
                          type="radio"
                          name="limit-type"
                          id="data-limit"
                          value="data"
                          checked={limitType === "data"}
                          onChange={handleLimitChange}
                        />
                        <label htmlFor="limit-type">Data Limit</label>
                      </span>
                      <span className="plan-form-span">
                        <input
                          type="radio"
                          name="limit-type"
                          id="both-limit"
                          value="both"
                          checked={limitType === "both"}
                          onChange={handleLimitChange}
                        />
                        <label htmlFor="limit-type">Both</label>
                      </span>
                    </div>
                    {(limitType === "time" || limitType === "both") && (
                      <div className="plan-form">
                        <label htmlFor="time-input">Time Limit Value</label>
                        <span className="plan-form-span">
                          <input type="number" name="time" id="time-input" />
                          <select name="time-unit" id="time-unit">
                            <option value="time-min">Mins</option>
                            <option value="time-hour">Hrs</option>
                          </select>
                        </span>
                      </div>
                    )}
                    {(limitType === "data" || limitType === "both") && (
                      <div className="plan-form">
                        <label htmlFor="data-input">Data Limit Value</label>
                        <span className="plan-form-span">
                          <input type="number" name="data" id="data-input" />
                          <select name="data-unit" id="data-unit">
                            <option value="mb">MB</option>
                            <option value="gb">GB</option>
                          </select>
                        </span>
                      </div>
                    )}
                  </>
                )}

                <div className="plan-form">
                  <label htmlFor="bandwidth-name">Bandwidth</label>
                  <select name="bandwidth-name" id="bandwidth-name">
                    <option value="100mbps">100MBPS</option>
                    <option value="50mbps">50MBPS</option>
                    <option value="30mbps">30MBPS</option>
                    <option value="20mbps">20MBPS</option>
                    <option value="10mbps">10MBPS</option>
                  </select>
                </div>
                <div className="plan-form">
                  <label htmlFor="plan-price">Plan Price</label>
                  <input type="number" name="plan-price" id="plan-price" />
                </div>
                <div className="plan-form">
                  <label htmlFor="plan-validity">Validity</label>
                  <span className="plan-form-span">
                    <input
                      type="number"
                      name="plan-validity"
                      id="plan-validity"
                      required
                    />
                    <select name="validity" id="validity">
                      <option value="mins">MINS</option>
                      <option value="hrs">HRS</option>
                      <option value="days">DAYS</option>
                      <option value="months">MONTHS</option>
                    </select>
                  </span>
                </div>
                <div className="plan-form">
                  <label htmlFor="plan-router">Router</label>
                  <select name="plan-router" id="plan-router">
                    <option value="no-router">Select Router</option>
                    {routersList.map((router) => (
                      <option key={router.id} value={router.id}>
                        {router.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="modal-form-buttons">
                  <button id="modal-submit">Submit</button>
                  <button id="modal-cancel" onClick={() => setIsOpen(false)}>
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

export default Hotspot;
