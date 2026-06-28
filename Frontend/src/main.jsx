import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Dashboard from "./pages/dashboard/Dashboard";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Account from "./components/account/Account";
import Dash from "./components/dash/Dash";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "my-dashboard",
        element: <Dash />,
      },
      { path: "account-settings", element: <Account /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
