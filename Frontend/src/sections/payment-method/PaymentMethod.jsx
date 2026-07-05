import React, { useState } from "react";
import "./payment-method.css";

function PaymentMethod() {
  const [openMpesa, setOpenMpesa] = useState(false);
  const [openBank, setOpenBank] = useState(false);
  return (
    <>
      <div className="payment-method">
        <p>Payment Method</p>
        <div className="payment-method-table">
          <form>
            <table id="payment-method-table">
              <tbody>
                <tr>
                  <td id="select-cell">
                    <input
                      type="checkbox"
                      name="select-mpesa"
                      id="select-mpesa"
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
                      name="select-bank"
                      id="select-bank"
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
            <button id="save-payment-method">Save Changes</button>
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
              <form>
                <div className="mpesa-div">
                  <label htmlFor="consumer-key">Consumer Key</label>
                  <input type="text" name="consumer-key" id="consumer-key" />
                </div>
                <div className="mpesa-div">
                  <label htmlFor="consumer-secret">Consumer Secret</label>
                  <input
                    type="password"
                    name="consumer-secret"
                    id="consumer-secret"
                  />
                </div>
                <div className="mpesa-div">
                  <label htmlFor="business-short-code">
                    Business Short Code
                  </label>
                  <input
                    type="text"
                    name="business-short-code"
                    id="business-short-code"
                  />
                </div>
                <div className="mpesa-div">
                  <label htmlFor="business-till">Business Till</label>
                  <input type="text" name="business-till" id="business-till" />
                </div>
                <div className="mpesa-div">
                  <label htmlFor="pass-key">Pass Key</label>
                  <input type="text" name="pass-key" id="pass-key" />
                </div>
                <button id="mpesa-save-btn">Save</button>
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
              <form>
                <div className="bank-div">
                  <label htmlFor="bank-acc">Bank Account Number</label>
                  <input type="text" name="bank-acc" id="bank-acc" />
                </div>
                <div className="bank-div">
                  <label htmlFor="bank-name">Bank Name</label>
                  <select name="bank-name" id="bank-name">
                    <option value="kcb">Kenya Commercial Bank</option>
                    <option value="equity">Equity Bank Kenya</option>
                    <option value="absa">Absa Bank Kenya</option>
                    <option value="ncba">NCBA Kenya</option>
                    <option value="coop">Co-operative Bank of Kenya</option>
                  </select>
                </div>
                <button id="bank-save-btn">Save</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PaymentMethod;
