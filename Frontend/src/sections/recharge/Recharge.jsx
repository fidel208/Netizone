import React from "react";
import "./recharge.css";
import { useEffect, useState } from "react";

function Recharge() {
  const [routersList, setRoutersList] = useState([]);
  const [packageList, setPackageList] = useState([]);

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

  useEffect(() => {
    const token = localStorage.getItem("netizone_token");
    if (!token) {
      console.error("No token found, redirecting to login...");
      return;
    }
    const controller = new AbortController();
    const fetchPackageData = async () => {
      try {
        const packageResponse = await fetch(
          "http://localhost:3000/api/packages",
          {
            signal: controller.signal,
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (packageResponse.ok) {
          const packageData = await packageResponse.json();
          setPackageList(packageData.packages || []);
        }
      } catch (err) {
        if (err.name !== "Abortion Error") {
          console.error("Error fetching packages data:", err);
        }
      }
    };
    fetchPackageData();
    return;
  }, []);
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
              {routersList.map((router) => (
                <option key={router.id} value={router.id}>
                  {router.name}
                </option>
              ))}
            </select>
          </span>
          <span className="form-row">
            <label htmlFor="plan">Plan</label>
            <select name="plans" id="plans">
              <option value="no-plan">Select Plan</option>
              {packageList.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.name} - Kes. {pkg.price}
                </option>
              ))}
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
