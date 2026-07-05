import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Dashboard from "./pages/dashboard/Dashboard";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import Login from "./pages/login/Login";
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
import Register from "./pages/register/Register";
import DailyStatement from "./sections/statements/DailyStatement";
import PeriodStatement from "./sections/statements/PeriodStatement";
import Routers from "./sections/network/Routers";
import IpPool from "./sections/network/IpPool";
import General from "./sections/settings/general/General";
import Maintenance from "./sections/settings/maintenance/Maintenance";
import Alerts from "./sections/settings/alerts/Alerts";
import PaymentMethod from "./sections/payment-method/PaymentMethod";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    path: "/register",
    element: <Register />,
  },
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
      {
        path: "daily-statement",
        element: <DailyStatement />,
      },
      {
        path: "period-statement",
        element: <PeriodStatement />,
      },
      {
        path: "routers",
        element: <Routers />,
      },
      {
        path: "ip-pool",
        element: <IpPool />,
      },
      {
        path: "general-settings",
        element: <General />,
      },
      {
        path: "maintenance-mode",
        element: <Maintenance />,
      },
      {
        path: "user-alerts",
        element: <Alerts />,
      },
      {
        path: "payment-method",
        element: <PaymentMethod />,
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
