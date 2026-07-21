import React from "react";
import "./general.css";
import { useState, useEffect } from "react";

function General() {
  const [formData, setFormData] = useState({
    internet: "",
    address: "",
    phone: "",
    enable: "yes",
    "expired-not": "whatsapp",
    "payment-not": "whatsapp",
    "reminder-not": "whatsapp",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("netizone_token");
    if (!token) return;

    const fetchCurrentSettings = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/general", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        if (response.ok && result.success) {
          setFormData({
            internet: result.settings.internetName,
            address: result.settings.address,
            phone: result.settings.phoneNumber,
            enable: result.settings.isSystemEnabled ? "yes" : "no",
            "expired-not": result.settings.expiredNotification || "sms",
            "payment-not": result.settings.paymentNotification || "sms",
            "reminder-not": result.settings.reminderNotification || "sms",
          });
        }
      } catch (err) {
        console.error(
          "Failed to recover current settings profile context:",
          err,
        );
      }
    };
    fetchCurrentSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("netizone_token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/user/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("User settings successfully updated");
      } else {
        alert("Failed to update user settings: " + data.error);
      }
    } catch (err) {
      console.error("Failed to commit updates:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="general-settings">
        <p>General Settings</p>
        <form onSubmit={handleSubmit}>
          <div className="part-1">
            <div className="general-div">
              <label htmlFor="internet">Internet name</label>
              <input
                type="text"
                name="internet"
                id="internet"
                value={formData.internet}
                onChange={handleChange}
              />
            </div>
            <div className="general-div">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="general-div">
              <label htmlFor="phone">Phone number</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="general-div">
              <label htmlFor="enable">Enable system</label>
              <select
                name="enable"
                id="enable"
                value={formData.enable}
                onChange={handleChange}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
          <div className="part-2">
            <div className="general-div">
              <label htmlFor="expired-not">Expired notification</label>
              <select
                name="expired-not"
                id="expired-not"
                value={formData["expired-not"]}
                onChange={handleChange}
              >
                <option value="whatsapp">Whatsapp</option>
                <option value="sms">Sms</option>
              </select>
            </div>
            <div className="general-div">
              <label htmlFor="payment-not">Payment notification</label>
              <select
                name="payment-not"
                id="payment-not"
                value={formData["payment-not"]}
                onChange={handleChange}
              >
                <option value="whatsapp">Whatsapp</option>
                <option value="sms">Sms</option>
              </select>
            </div>
            <div className="general-div">
              <label htmlFor="reminder-not">Reminder notification</label>
              <select
                name="reminder-not"
                id="reminder-not"
                value={formData["reminder-not"]}
                onChange={handleChange}
              >
                <option value="whatsapp">Whatsapp</option>
                <option value="sms">Sms</option>
              </select>
            </div>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Saving changes..." : "Save changes"}
          </button>
        </form>
      </div>
    </>
  );
}

export default General;
