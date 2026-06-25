import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Aside from "../../components/aside/Aside";
import Header from "../../components/header/Header";
import "./dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <Header />
      <Aside />
    </div>
  );
}

export default Dashboard;
