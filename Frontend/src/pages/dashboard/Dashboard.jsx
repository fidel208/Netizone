import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Aside from "../../components/aside/Aside";
import Header from "../../components/header/Header";
import "./dashboard.css";
import Account from "../../sections/account/Account";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div className="dashboard">
      <aside>
        <Aside />
      </aside>
      <main>
        <Header />
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
