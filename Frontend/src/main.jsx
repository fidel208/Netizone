import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Dashboard from "./pages/dashboard/Dashboard";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Account from "./sections/account/Account";
import MyDash from "./sections/dash/MyDash";
import OnlineClients from "./sections/clients/OnlineClients";
import HotspotClients from "./sections/clients/HotspotClients";
import Recharge from "./sections/recharge/Recharge";
import Refill from "./sections/recharge/Refill";
import Hotspot from "./sections/packages/Hotspot";
import Pppoe from "./sections/packages/Pppoe";
import SingleSms from "./sections/broadcast/SingleSms";
import BulkSms from "./sections/broadcast/BulkSms";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "my-dashboard",
        element: <MyDash />,
      },
      { path: "account-settings", element: <Account /> },
      { path: "online-clients", element: <OnlineClients /> },
      {
        path: "hotspot-clients",
        element: <HotspotClients />,
      },
      {
        path: "recharge-client",
        element: <Recharge />,
      },
      {
        path: "refill-client",
        element: <Refill />,
      },
      {
        path: "hotspot-packages",
        element: <Hotspot />,
      },
      {
        path: "pppoe-packages",
        element: <Pppoe />,
      },
      {
        path: "broadcast-single-sms",
        element: <SingleSms />,
      },
      {
        path: "broadcast-bulk-sms",
        element: <BulkSms />,
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
