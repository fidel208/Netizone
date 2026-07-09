import React from "react";
import { Link } from "react-router-dom";
import "./packages.css";

function Pppoe() {
  return (
    <>
      <div className="pppoe">
        <div className="pppoe-message">
          <p>Sorry, this servcie is not available</p>
          <Link to={"/dashboard/hotspot-packages"}>
            <button>Hotspot Packages</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Pppoe;
