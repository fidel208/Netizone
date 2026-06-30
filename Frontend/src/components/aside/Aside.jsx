import React, { useState } from "react";
import "./aside.css";
import { Link } from "react-router-dom";

const Aside = () => {
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
        <Link to={"/dashboard/my-dashboard"}>
          <span class="material-symbols-outlined">dashboard</span>My Dashboard
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
            <span class="material-symbols-outlined">groups</span>Clients
          </span>
          <i
            class="fa-solid fa-angle-left"
            id={openMenu === "clients" ? "i-active" : ""}
          ></i>
        </a>
        <div
          id="clients-dropdown"
          className={openMenu === "clients" ? "open" : ""}
        >
          <Link to={"/dashboard/online-clients"}>Online Clients</Link>
          <Link to={"/dashboard/hotspot-clients"}>Hotspot Clients</Link>
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
            <span class="material-symbols-outlined">confirmation_number</span>My
            Services
          </span>
          <i
            class="fa-solid fa-angle-left"
            id={openMenu === "services" ? "i-active" : ""}
          ></i>
        </a>
        <div
          id="services-dropdown"
          className={openMenu === "services" ? "open" : ""}
        >
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Recharge Client
          </a>
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Refill Client
          </a>
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
            <span class="material-symbols-outlined">deployed_code</span>My
            Packages
          </span>
          <i
            class="fa-solid fa-angle-left"
            id={openMenu === "packages" ? "i-active" : ""}
          ></i>
        </a>

        <div
          id="packages-dropdown"
          className={openMenu === "packages" ? "open" : ""}
        >
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Hotspot
          </a>
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            PPPOE
          </a>
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
            <span class="material-symbols-outlined">airplay</span>Broadcast
          </span>
          <i
            class="fa-solid fa-angle-left"
            id={openMenu === "broadcast" ? "i-active" : ""}
          ></i>
        </a>

        <div
          id="broadcast-dropdown"
          className={openMenu === "broadcast" ? "open" : ""}
        >
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Single Client
          </a>
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Bulk Clients
          </a>
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
            <span class="material-symbols-outlined">analytics</span>Statements
          </span>
          <i
            class="fa-solid fa-angle-left"
            id={openMenu === "statements" ? "i-active" : ""}
          ></i>
        </a>
        <div
          id="statements-dropdown"
          className={openMenu === "statements" ? "open" : ""}
        >
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Daily Report
          </a>
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Period Report
          </a>
        </div>

        <a
          href=""
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <span class="material-symbols-outlined">payments</span>Payment Method
        </a>
        <a
          href=""
          className="with"
          onClick={(e) => {
            e.preventDefault();
            toggleMenu("network");
          }}
        >
          <span className="left">
            <span class="material-symbols-outlined">network_manage</span>Network
          </span>
          <i
            class="fa-solid fa-angle-left"
            id={openMenu === "network" ? "i-active" : ""}
          ></i>
        </a>

        <div
          id="network-dropdown"
          className={openMenu === "network" ? "open" : ""}
        >
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Routers
          </a>
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            IP Pool
          </a>
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
            <span class="material-symbols-outlined">settings</span>Settings
          </span>
          <i
            class="fa-solid fa-angle-left"
            id={openMenu === "settings" ? "i-active" : ""}
          ></i>
        </a>

        <div
          id="settings-dropdown"
          className={openMenu === "settings" ? "open" : ""}
        >
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            General Settings
          </a>
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Maintenance Mode
          </a>
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            User Alerts
          </a>
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Backup/Restore
          </a>
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
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
