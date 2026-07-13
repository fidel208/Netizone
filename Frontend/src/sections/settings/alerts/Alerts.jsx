import React, { useState, useEffect } from "react";
import "./alerts.css";

function Alerts() {
  const [notifications, setNotifications] = useState({
    expiredMessage: "",
    paymentMessage: "",
    balanceMessage: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem("netizone_token");
      if (!token) return;

      try {
        const response = await fetch(
          "http://localhost:3000/api/user/notifications",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();

        if (data.success) {
          const expired =
            data.notifications.find((t) => t.type === "expired")?.message || "";
          const payment =
            data.notifications.find((t) => t.type === "payment")?.message || "";
          const balance =
            data.notifications.find((t) => t.type === "balance")?.message || "";
          setNotifications({
            expiredMessage: expired,
            paymentMessage: payment,
            balanceMessage: balance,
          });
        }
      } catch (err) {
        console.error("Failed to get notifications");
      }
    };
    fetchNotifications();
  }, []);

  const handleChange = (e) => {
    setNotifications({ ...notifications, [e.target.name]: e.target.value });
  };

  const injectTag = (fieldName, tag) => {
    setNotifications((prev) => ({
      ...prev,
      [fieldName]: prev[fieldName] + ` ${tag} `,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("netizone_token");

    try {
      const response = await fetch(
        "http://localhost:3000/api/user/notifications",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(notifications),
        },
      );
      const data = await response.json();
      if (response.ok && data.success) {
        alert("Notifications saved successfully!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="alerts">
        <p>User Alerts</p>
        <form onSubmit={handleSubmit}>
          <div className="alert-div">
            <label htmlFor="payment-notification">Payment Notification</label>
            <textarea
              name="paymentMessage"
              id="paymentMessage"
              value={notifications.paymentMessage}
              onChange={handleChange}
              placeholder="Eg. Received KSH {amount} from {name}..."
            ></textarea>
          </div>
          <div className="alert-div">
            <label htmlFor="balance-notification">Balance Notification</label>
            <textarea
              name="balanceMessage"
              id="balanceMessage"
              value={notifications.balanceMessage}
              onChange={handleChange}
              placeholder="Eg. Hello {name}, your package is 50% used..."
            ></textarea>
          </div>
          <div className="alert-div">
            <label htmlFor="expired-notification">Expired Notification</label>
            <textarea
              name="expiredMessage"
              id="expiredMessage"
              value={notifications.expiredMessage}
              onChange={handleChange}
              placeholder="Eg. Hello {name}, your package has expired..."
            ></textarea>
          </div>
          <button id="save-notifications" type="submit" disabled={loading}>
            {loading ? "Saving Changes..." : "Save Changes"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Alerts;
