import React, { useState } from "react";
import "./aside.css";

const Aside = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const toggleMenu = (menuName) => {
    if (openMenu === menuName) {
      setOpenMenu(null);
    } else {
      setOpenMenu(menuName);
    }
  };

  return (
    <div className="aside">
      <nav>
        <a href="" className="a-active">
          <span class="material-symbols-outlined">dashboard</span>My Dashboard
        </a>
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
          <i class="fa-solid fa-angle-left"></i>
        </a>
        {openMenu === "clients" && (
          <div id="clients-dropdown">
            <a href="">Online clients</a>
            <a href="">Hotspot clients</a>
          </div>
        )}
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
          <i class="fa-solid fa-angle-left"></i>
        </a>
        {openMenu === "services" && (
          <div id="services-dropdown">
            <a href="">Recharge Client</a>
            <a href="">Refill Client</a>
          </div>
        )}
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
          <i class="fa-solid fa-angle-left"></i>
        </a>
        {openMenu === "packages" && (
          <div id="packages-dropdown">
            <a href="">Hotspot</a>
            <a href="">PPPOE</a>
          </div>
        )}
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
          <i class="fa-solid fa-angle-left"></i>
        </a>
        {openMenu === "broadcast" && (
          <div id="broadcast-dropdown">
            <a href="">Single Client</a>
            <a href="">Bulk Clients</a>
          </div>
        )}
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
          <i class="fa-solid fa-angle-left"></i>
        </a>
        {openMenu === "statements" && (
          <div id="statements-dropdown">
            <a href="">Daily Report</a>
            <a href="">Period Report</a>
          </div>
        )}
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
          <i class="fa-solid fa-angle-left"></i>
        </a>
        {openMenu === "network" && (
          <div id="network-dropdown">
            <a href="">Routers</a>
            <a href="">IP Pool</a>
          </div>
        )}
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
          <i class="fa-solid fa-angle-left"></i>
        </a>
        {openMenu === "settings" && (
          <div id="settings-dropdown">
            <a href="">General Settings</a>
            <a href="">Maintenance Mode</a>
            <a href="">User Alerts</a>
            <a href="">Backup/Restore</a>
            <a href="">Clear Cache</a>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Aside;
