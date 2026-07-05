import React, { useState } from "react";
import "./aside.css";
import { Link } from "react-router-dom";

const Aside = () => {
  const [activeLink, setActiveLink] = useState("dashboard");
  const [openMenu, setOpenMenu] = useState(null);
  const toggleMenu = (menuName) => {
    if (openMenu === menuName) {
      setOpenMenu(null);
    } else {
      setOpenMenu(menuName);
    }
  };

  const [active, setActive] = useState(null);
  const toggleActive = (navName) => {
    if (active === navName) {
      setActive(null);
    } else {
      setActive(navName);
    }
  };
  return (
    <div className="aside">
      <h1>INTERNET NAME</h1>
      <nav>
        <Link
          to={"/dashboard/my-dashboard"}
          className={`${activeLink === "dashboard" ? "active" : ""}`}
          onClick={() => setActiveLink("dashboard")}
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
            className={`${activeLink === "online-clients" ? "active" : ""}`}
            onClick={() => setActiveLink("online-clients")}
          >
            Online Clients
          </Link>
          <Link
            to={"/dashboard/hotspot-clients"}
            className={`${activeLink === "hotspot-clients" ? "active" : ""}`}
            onClick={() => setActiveLink("hotspot-clients")}
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
            className={`${activeLink === "recharge-client" ? "active" : ""}`}
            onClick={() => setActiveLink("recharge-client")}
          >
            Recharge Client
          </Link>
          <Link
            to={"/dashboard/refill-client"}
            className={`${activeLink === "refill-client" ? "active" : ""}`}
            onClick={() => setActiveLink("refill-client")}
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
            className={`${activeLink === "hotspot-pack" ? "active" : ""}`}
            onClick={() => setActiveLink("hotspot-pack")}
          >
            Hotspot
          </Link>
          <Link
            to={"/dashboard/pppoe-packages"}
            className={`${activeLink === "pppoe-pack" ? "active" : ""}`}
            onClick={() => setActiveLink("pppoe-pack")}
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
            className={`${activeLink === "single-client" ? "active" : ""}`}
            onClick={() => setActiveLink("single-client")}
          >
            Single Client
          </Link>
          <Link
            to={"/dashboard/broadcast-bulk-sms"}
            className={`${activeLink === "bulk-client" ? "active" : ""}`}
            onClick={() => setActiveLink("bulk-client")}
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
            className={`${activeLink === "daily" ? "active" : ""}`}
            onClick={() => setActiveLink("daily")}
          >
            Daily Report
          </Link>
          <Link
            to={"/dashboard/period-statement"}
            className={`${activeLink === "period" ? "active" : ""}`}
            onClick={() => setActiveLink("period")}
          >
            Period Report
          </Link>
        </div>

        <Link
          to={"/dashboard/payment-method"}
          className={`${activeLink === "payment" ? "active" : ""}`}
          onClick={() => setActiveLink("payment")}
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
            className={`${activeLink === "net-routers" ? "active" : ""}`}
            onClick={() => setActiveLink("net-routers")}
          >
            Routers
          </Link>
          <Link
            to={"/dashboard/ip-pool"}
            className={`${activeLink === "net-pool" ? "active" : ""}`}
            onClick={() => setActiveLink("net-pool")}
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
            className={`${activeLink === "general" ? "active" : ""}`}
            onClick={() => setActiveLink("general")}
          >
            General Settings
          </Link>
          <Link
            to={"/dashboard/maintenance-mode"}
            className={`${activeLink === "maintain" ? "active" : ""}`}
            onClick={() => setActiveLink("maintain")}
          >
            Maintenance Mode
          </Link>
          <Link
            to={"/dashboard/user-alerts"}
            className={`${activeLink === "alerts" ? "active" : ""}`}
            onClick={() => setActiveLink("alerts")}
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
