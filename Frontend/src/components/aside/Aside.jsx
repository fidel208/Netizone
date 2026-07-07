import React, { useState } from "react";
import "./aside.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Aside = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    if (
      currentPath.includes("online-clients") ||
      currentPath.includes("hotspot-clients")
    ) {
      setOpenMenu("clients");
    } else if (
      currentPath.includes("recharge-client") ||
      currentPath.includes("refill-client")
    ) {
      setOpenMenu("services");
    } else if (
      currentPath.includes("hotspot-packages") ||
      currentPath.includes("pppoe-packages")
    ) {
      setOpenMenu("packages");
    } else if (currentPath.includes("broadcast")) {
      setOpenMenu("broadcast");
    } else if (currentPath.includes("statement")) {
      setOpenMenu("statements");
    } else if (
      currentPath.includes("routers") ||
      currentPath.includes("ip-pool")
    ) {
      setOpenMenu("network");
    } else if (
      currentPath.includes("settings") ||
      currentPath.includes("maintenance") ||
      currentPath.includes("alerts")
    ) {
      setOpenMenu("settings");
    }
  }, [currentPath]);

  const toggleMenu = (menuName) => {
    if (openMenu === menuName) {
      setOpenMenu(null);
    } else {
      setOpenMenu(menuName);
    }
  };

  return (
    <div className="aside">
      <h1>INTERNET NAME</h1>
      <nav>
        <Link
          to={"/dashboard/my-dashboard"}
          className={currentPath === "/dashboard/my-dashboard" ? "active" : ""}
        >
          <span className="material-symbols-outlined">dashboard</span>My
          Dashboard
        </Link>

        <a
          href=""
          className="with"
          onClick={(e) => {
            e.preventDefault();
            toggleMenu("clients");
          }}
        >
          <span className="left">
            <span className="material-symbols-outlined">groups</span>Clients
          </span>
          <i
            className="fa-solid fa-angle-left"
            id={openMenu === "clients" ? "i-active" : ""}
          ></i>
        </a>
        <div
          id="clients-dropdown"
          className={openMenu === "clients" ? "open" : ""}
        >
          <Link
            to={"/dashboard/online-clients"}
            className={
              currentPath === "/dashboard/online-clients" ? "active" : ""
            }
          >
            Online Clients
          </Link>
          <Link
            to={"/dashboard/hotspot-clients"}
            className={
              currentPath === "/dashboard/hotspot-clients" ? "active" : ""
            }
          >
            Hotspot Clients
          </Link>
        </div>

        <a
          href=""
          className="with"
          onClick={(e) => {
            e.preventDefault();
            toggleMenu("services");
          }}
        >
          <span className="left">
            <span className="material-symbols-outlined">
              confirmation_number
            </span>
            My Services
          </span>
          <i
            className="fa-solid fa-angle-left"
            id={openMenu === "services" ? "i-active" : ""}
          ></i>
        </a>
        <div
          id="services-dropdown"
          className={openMenu === "services" ? "open" : ""}
        >
          <Link
            to={"/dashboard/recharge-client"}
            className={
              currentPath === "/dashboard/recharge-client" ? "active" : ""
            }
          >
            Recharge Client
          </Link>
          <Link
            to={"/dashboard/refill-client"}
            className={
              currentPath === "/dashboard/refill-client" ? "active" : ""
            }
          >
            Refill Client
          </Link>
        </div>

        <a
          href=""
          className="with"
          onClick={(e) => {
            e.preventDefault();
            toggleMenu("packages");
          }}
        >
          <span className="left">
            <span className="material-symbols-outlined">deployed_code</span>My
            Packages
          </span>
          <i
            className="fa-solid fa-angle-left"
            id={openMenu === "packages" ? "i-active" : ""}
          ></i>
        </a>
        <div
          id="packages-dropdown"
          className={openMenu === "packages" ? "open" : ""}
        >
          <Link
            to={"/dashboard/hotspot-packages"}
            className={
              currentPath === "/dashboard/hotspot-packages" ? "active" : ""
            }
          >
            Hotspot
          </Link>
          <Link
            to={"/dashboard/pppoe-packages"}
            className={
              currentPath === "/dashboard/pppoe-packages" ? "active" : ""
            }
          >
            PPPOE
          </Link>
        </div>

        <a
          href=""
          className="with"
          onClick={(e) => {
            e.preventDefault();
            toggleMenu("broadcast");
          }}
        >
          <span className="left">
            <span className="material-symbols-outlined">airplay</span>Broadcast
          </span>
          <i
            className="fa-solid fa-angle-left"
            id={openMenu === "broadcast" ? "i-active" : ""}
          ></i>
        </a>
        <div
          id="broadcast-dropdown"
          className={openMenu === "broadcast" ? "open" : ""}
        >
          <Link
            to={"/dashboard/broadcast-single-sms"}
            className={
              currentPath === "/dashboard/broadcast-single-sms" ? "active" : ""
            }
          >
            Single Client
          </Link>
          <Link
            to={"/dashboard/broadcast-bulk-sms"}
            className={
              currentPath === "/dashboard/broadcast-bulk-sms" ? "active" : ""
            }
          >
            Bulk Clients
          </Link>
        </div>

        <a
          href=""
          className="with"
          onClick={(e) => {
            e.preventDefault();
            toggleMenu("statements");
          }}
        >
          <span className="left">
            <span className="material-symbols-outlined">analytics</span>
            Statements
          </span>
          <i
            className="fa-solid fa-angle-left"
            id={openMenu === "statements" ? "i-active" : ""}
          ></i>
        </a>
        <div
          id="statements-dropdown"
          className={openMenu === "statements" ? "open" : ""}
        >
          <Link
            to={"/dashboard/daily-statement"}
            className={
              currentPath === "/dashboard/daily-statement" ? "active" : ""
            }
          >
            Daily Report
          </Link>
          <Link
            to={"/dashboard/period-statement"}
            className={
              currentPath === "/dashboard/period-statement" ? "active" : ""
            }
          >
            Period Report
          </Link>
        </div>

        <Link
          to={"/dashboard/payment-method"}
          className={
            currentPath === "/dashboard/payment-method" ? "active" : ""
          }
        >
          <span className="material-symbols-outlined">payments</span>Payment
          Method
        </Link>

        <a
          href=""
          className="with"
          onClick={(e) => {
            e.preventDefault();
            toggleMenu("network");
          }}
        >
          <span className="left">
            <span className="material-symbols-outlined">network_manage</span>
            Network
          </span>
          <i
            className="fa-solid fa-angle-left"
            id={openMenu === "network" ? "i-active" : ""}
          ></i>
        </a>
        <div
          id="network-dropdown"
          className={openMenu === "network" ? "open" : ""}
        >
          <Link
            to={"/dashboard/routers"}
            className={currentPath === "/dashboard/routers" ? "active" : ""}
          >
            Routers
          </Link>
          <Link
            to={"/dashboard/ip-pool"}
            className={currentPath === "/dashboard/ip-pool" ? "active" : ""}
          >
            Ip Pool
          </Link>
        </div>

        <a
          href=""
          className="with"
          onClick={(e) => {
            e.preventDefault();
            toggleMenu("settings");
          }}
        >
          <span className="left">
            <span className="material-symbols-outlined">settings</span>Settings
          </span>
          <i
            className="fa-solid fa-angle-left"
            id={openMenu === "settings" ? "i-active" : ""}
          ></i>
        </a>
        <div
          id="settings-dropdown"
          className={openMenu === "settings" ? "open" : ""}
        >
          <Link
            to={"/dashboard/general-settings"}
            className={
              currentPath === "/dashboard/general-settings" ? "active" : ""
            }
          >
            General Settings
          </Link>
          <Link
            to={"/dashboard/maintenance-mode"}
            className={
              currentPath === "/dashboard/maintenance-mode" ? "active" : ""
            }
          >
            Maintenance Mode
          </Link>
          <Link
            to={"/dashboard/user-alerts"}
            className={currentPath === "/dashboard/user-alerts" ? "active" : ""}
          >
            User Alerts
          </Link>
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
              window.location.reload();
            }}
          >
            Clear Cache
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Aside;
