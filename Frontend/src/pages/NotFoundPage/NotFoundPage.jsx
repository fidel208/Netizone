import React from "react";
import { Link } from "react-router-dom";
import "./notfound.css";

function NotFoundPage() {
  return (
    <div className="not-found">
      <h1>Error 404, page not found</h1>
      <Link to={"/"}>
        <button>Go home</button>
      </Link>
    </div>
  );
}

export default NotFoundPage;
