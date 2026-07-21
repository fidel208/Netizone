import React, { useState, useEffect } from "react";
import "./payment-method.css";

function PaymentMethod() {
  const [openMpesa, setOpenMpesa] = useState(false);
  const [openBank, setOpenBank] = useState(false);

  const [paymentForm, setPaymentForm] = useState({
    paymentMethod: "mpesa",
  });

  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("netizone_token");

    if (!token) return;

    const fetchPaymentMethod = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/payment-method",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const result = await response.json();

        if (response.ok && result.success) {
          setPaymentForm({
            paymentMethod: result.payment.paymentMethod,
          });
        }
      } catch (err) {
        console.error("Failed to get the  payment method:", err);
      }
    };
    fetchPaymentMethod();
  }, []);

  const handlePaymentToggle = (target) => {
    const isMpesaActive =
      paymentForm.paymentMethod === "mpesa" ||
      paymentForm.paymentMethod === "both";
    const isBankActive =
      paymentForm.paymentMethod === "bank" ||
      paymentForm.paymentMethod === "both";

    let newMpesa = isMpesaActive;
    let newBank = isBankActive;

    if (target === "mpesa") {
      newMpesa = !isMpesaActive;
    } else if (target === "bank") {
      newBank = !isBankActive;
    }

    let newMethod = "none";
    if (newMpesa && newBank) {
      newMethod = "both";
    } else if (newMpesa) {
      newMethod = "mpesa";
    } else if (newBank) {
      newMethod = "bank";
    }

    setPaymentForm({ paymentMethod: newMethod });
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setPaymentLoading(true);

    const token = localStorage.getItem("netizone_token");
    if (!token) {
      setPaymentLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/payment/method", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentForm),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("Payment method updated successfully");
      } else {
        alert("Failed to update payment method:" + data.error);
      }
    } catch (err) {
      console.error("Failed to change payment method");
    } finally {
      setPaymentLoading(false);
    }
  };

  const isMpesaChecked =
    paymentForm.paymentMethod === "mpesa" ||
    paymentForm.paymentMethod === "both";
  const isBankChecked =
    paymentForm.paymentMethod === "bank" ||
    paymentForm.paymentMethod === "both";

  const [mpesaForm, setMpesaForm] = useState({
    consumerKey: "",
    consumerSecret: "",
    shortCode: "",
    till: "",
    passkey: "",
  });

  const [mpesaLoading, setMpesaLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("netizone_token");
    if (!token) return;

    const fetchMpesaDetails = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/payment/mpesa-details",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const result = await response.json();
        if (response.ok && result.success) {
          setMpesaForm({
            consumerKey: result.mpesa.consumerKey,
            consumerSecret: result.mpesa.consumerSecret,
            shortCode: result.mpesa.shortCode,
            till: result.mpesa.till,
            passkey: result.mpesa.passkey,
          });
        }
      } catch (err) {
        console.error("Failed to get the mpesa payment details:", err);
      }
    };
    fetchMpesaDetails();
  }, []);

  const handleMpesaChange = (e) => {
    const { name, value } = e.target;
    setMpesaForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMpesaSubmit = async (e) => {
    e.preventDefault();
    setMpesaLoading(true);

    const token = localStorage.getItem("netizone_token");
    if (!token) {
      setMpesaLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/payment/mpesa", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(mpesaForm),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("Mpesa payment details updated successfully");
        setOpenMpesa(false);
      } else {
        alert("Failed to add mpesa payment: " + data.error);
      }
    } catch (err) {
      console.error("Failed to add:", err);
    } finally {
      setMpesaLoading(false);
    }
  };

  const [bankForm, setBankForm] = useState({
    accountNumber: "",
    bankName: "kcb",
  });

  const [bankLoading, setBankLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("netizone_token");
    if (!token) return;

    const fetchBankDetails = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/payment/bank-details",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const result = await response.json();
        if (response.ok && result.success) {
          setBankForm({
            accountNumber: result.bank.accountNumber,
            bankName: result.bank.bankName,
          });
        }
      } catch (err) {
        console.error("Failed to get the bank details:", err);
      }
    };
    fetchBankDetails();
  }, []);

  const handleBankChange = (e) => {
    const { name, value } = e.target;
    setBankForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBankSubmit = async (e) => {
    e.preventDefault();
    setBankLoading(true);

    const token = localStorage.getItem("netizone_token");
    if (!token) {
      setBankLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/payment/bank", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bankForm),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("Bank details updated successfully");
      } else {
        alert("Failed to update bank details");
      }
    } catch (err) {
      console.error("Failed to add bank details:", err);
    } finally {
      setBankLoading(false);
    }
  };
  return (
    <>
      <div className="payment-method">
        <p>Payment Method</p>
        <div className="payment-method-table">
          <form onSubmit={handlePaymentSubmit}>
            <table id="payment-method-table">
              <tbody>
                <tr>
                  <td id="select-cell">
                    <input
                      type="checkbox"
                      name="mpesa"
                      id="mpesa"
                      checked={isMpesaChecked}
                      onChange={() => handlePaymentToggle("mpesa")}
                    />
                  </td>
                  <td>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenMpesa(true);
                      }}
                    >
                      Mpesa
                    </button>
                  </td>
                </tr>
                <tr>
                  <td id="select-cell">
                    <input
                      type="checkbox"
                      name="bank"
                      id="bank"
                      checked={isBankChecked}
                      onChange={() => handlePaymentToggle("bank")}
                    />
                  </td>
                  <td>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenBank(true);
                      }}
                    >
                      Bank
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              id="save-payment-method"
              type="submit"
              disabled={paymentLoading}
            >
              {paymentLoading ? "Saving chages" : "Save changes"}
            </button>
          </form>
        </div>
        {openMpesa && (
          <div className="modal-overlay" onClick={() => setOpenMpesa(false)}>
            <div
              className="mpesa-overlay"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="mpesa-overlay-top">
                <p>Mpesa Details</p>
                <button onClick={() => setOpenMpesa(false)}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <form onSubmit={handleMpesaSubmit}>
                <div className="mpesa-div">
                  <label htmlFor="consumer-key">Consumer key</label>
                  <input
                    type="text"
                    name="consumerKey"
                    id="consumerKey"
                    value={mpesaForm.consumerKey}
                    onChange={handleMpesaChange}
                  />
                </div>
                <div className="mpesa-div">
                  <label htmlFor="consumer-secret">Consumer secret</label>
                  <input
                    type="password"
                    name="consumerSecret"
                    id="consumerSecret"
                    value={mpesaForm.consumerSecret}
                    onChange={handleMpesaChange}
                  />
                </div>
                <div className="mpesa-div">
                  <label htmlFor="business-short-code">
                    Business short code
                  </label>
                  <input
                    type="text"
                    name="shortCode"
                    id="shortCode"
                    value={mpesaForm.shortCode}
                    onChange={handleMpesaChange}
                  />
                </div>
                <div className="mpesa-div">
                  <label htmlFor="business-till">Business till</label>
                  <input
                    type="text"
                    name="till"
                    id="till"
                    value={mpesaForm.till}
                    onChange={handleMpesaChange}
                  />
                </div>
                <div className="mpesa-div">
                  <label htmlFor="pass-key">Passkey</label>
                  <input
                    type="text"
                    name="passkey"
                    id="passkey"
                    value={mpesaForm.passkey}
                    onChange={handleMpesaChange}
                  />
                </div>
                <button
                  id="mpesa-save-btn"
                  type="submit"
                  disabled={mpesaLoading}
                >
                  {mpesaLoading ? "Saving changes" : "Save"}
                </button>
              </form>
            </div>
          </div>
        )}
        {openBank && (
          <div className="modal-overlay" onClick={() => setOpenBank(false)}>
            <div
              className="bank-overlay"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="bank-overlay-top">
                <p>Bank Details</p>
                <button onClick={() => setOpenBank(false)}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <form onSubmit={handleBankSubmit}>
                <div className="bank-div">
                  <label htmlFor="bank-acc">Bank account number</label>
                  <input
                    type="text"
                    name="accountNumber"
                    id="accountNumber"
                    value={bankForm.accountNumber}
                    onChange={handleBankChange}
                  />
                </div>
                <div className="bank-div">
                  <label htmlFor="bank-name">Bank name</label>
                  <select
                    name="bankName"
                    id="bankName"
                    value={bankForm["bankName"]}
                    onChange={handleBankChange}
                  >
                    <option value="kcb">Kenya Commercial Bank</option>
                    <option value="equity">Equity Bank Kenya</option>
                    <option value="absa">Absa Bank Kenya</option>
                    <option value="ncba">NCBA Kenya</option>
                    <option value="coop">Co-operative Bank of Kenya</option>
                  </select>
                </div>
                <button id="bank-save-btn" type="submit" disabled={bankLoading}>
                  {bankLoading ? "Saving changes" : "Save"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PaymentMethod;
