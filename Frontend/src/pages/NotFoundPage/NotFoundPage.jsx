import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div>
      <h1>Error 404, page not found</h1>
      <Link to={"/"}>Go home</Link>
    </div>
  );
}

export default NotFoundPage;
