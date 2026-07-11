export const generateMikrotikHtml = (
  routerName,
  packages,
  phoneNumber,
  internetName,
) => {
  const packageCards = packages
    .map(
      (pkg) => `
      <div class="plan-box">
          <span class="plan-header">
            <p>${pkg.name}</p>
          </span>
          <span class="plan-details">
            <p id="amount"><sup>Kes.</sup> <b> ${pkg.price ? pkg.price.toFixed(0) : "0"}</b></p>
            <p id="validity">Valid: ${pkg.validity}</p>
          </span>
          <button type="button" onclick="openPaymentModal('${pkg.name}', ${pkg.price})">Buy</button>
        </div>
  `,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${internetName.toUpperCase()}</title>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
    />
    <style>
    @import url("https://fonts.googleapis.com/css2?family=Changa+One:ital@0;1&family=Exo+2:ital,wght@0,100..900;1,100..900&family=Iosevka+Charon:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Mulish:ital,wght@0,200..1000;1,200..1000&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poller+One&family=Roboto+Slab:wght@100..900&family=Rowdies:wght@300;400&family=Saira:ital,wght@0,100..900;1,100..900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap");
    * {
  padding: 0;
  margin: 0;
}
body {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  background-color: rgb(18, 34, 53);
  margin-top: 10px;
  height: fit-content;
  font-family: "Ubuntu", sans-serif;
  font-weight: 400;
  font-style: normal;
}
.body-container {
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.body-top {
  background-color: rgb(238, 245, 250);
  height: 150px;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 10px;
}
.body-top h1 {
  font-size: 30px;
}
.body-top p {
  font-size: 20px;
}
.username-login {
  height: 170px;
  background-color: white;
  color: black;
  border-radius: 10px;
}
.username-login form {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.username-login span {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
label {
  font-size: 20px;
}
.username-login input {
  padding: 10px;
  border-radius: 8px;
  outline: none;
  border: solid 2px rgb(212, 207, 207);
  height: 20px;
  font-size: 18px;
}
input:focus {
  border: solid 2px green;
}
.username-login button {
  height: 45px;
  border-radius: 8px;
  font-size: 20px;
  border: none;
  outline: none;
  background-color: rgb(48, 48, 185);
  color: white;
}
.username-login button:hover {
  background-color: rgb(24, 24, 97);
}
.message-login {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
#toggle-mpesa-login {
  height: 45px;
  border-radius: 8px;
  font-size: 20px;
  border: none;
  outline: none;
  background-color: rgb(48, 48, 185);
  color: white;
}
#toggle-mpesa-login:hover {
  background-color: rgb(24, 24, 97);
}
#mpesa-message-form {
  background-color: white;
  padding: 20px;
  flex-direction: column;
  gap: 15px;
  border-radius: 10px;
  display: none;
}

#mpesa-message-form span {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
#mpesa-message-form input {
  padding: 10px;
  border-radius: 8px;
  outline: none;
  border: solid 2px rgb(212, 207, 207);
  height: 20px;
  font-size: 18px;
}
#mpesa-message-form input:focus {
  border: solid 2px green;
}
#mpesa-message-form button {
  height: 45px;
  border-radius: 8px;
  font-size: 20px;
  border: none;
  outline: none;
  background-color: rgb(48, 48, 185);
  color: white;
}
#mpesa-message-form button:hover {
  background-color: rgb(24, 24, 97);
}
  #no-package {
  text-align: center;
  color: white;
  }
.packages {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, auto);
  gap: 10px;
}
.plan-box {
  width: 100%;
  background-color: rgb(238, 245, 250);
  border-radius: 12px;
  height: 170px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.plan-header {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(48, 48, 185);
  color: white;
  height: 35px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  font-size: 18px;
  width: 100%;
}
.plan-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 100px;
  border-bottom: solid 1px gray;
}
#amount {
  font-size: 35px;
  color: rgb(8, 172, 123);
  font-weight: bold;
}
#amount sup {
  font-size: 15px;
   color: rgb(92, 90, 90);
}
#validity {
  font-size: 14px;
}
.plan-box button {
  width: 100%;
  max-width: 70px;
  align-self: center;
  height: 30px;
  border-radius: 8px;
  font-size: 18px;
  border: none;
  outline: none;
  color: white;
  background-color: rgb(17, 82, 62);
}
.plan-box button:hover {
  color: white;
  background-color: rgb(18, 34, 53);
}
#redeem-btn {
  height: 45px;
  border-radius: 8px;
  font-size: 20px;
  border: none;
  outline: none;
  background-color: rgb(48, 48, 185);
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
#redeem-btn:hover {
  background-color: rgb(24, 24, 97);
}
footer {
  color: rgb(151, 146, 146);
  text-align: center;
  padding-bottom: 20px;
}

.pay-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  z-index: 999;
  display: none;
}
.pay-form {
  background-color: white;
  height: 250px;
  width: 480px;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  color: black;
}
.pay-form h2 {
  font-size: 25px;
}
.pay-form span {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.pay-form label {
  text-align: center;
}
.pay-form input {
  padding: 10px;
  border-radius: 8px;
  outline: none;
  border: solid 2px rgb(212, 207, 207);
  height: 20px;
  font-size: 18px;
  width: 95%;
}
.pay-form input:focus {
  border: solid 2px green;
}
.payment-btns {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
.payment-btns button {
  color: white;
  height: 45px;
  width: 100px;
  border: none;
  outline: none;
  border-radius: 8px;
  font-size: 18px;
}
#initialise-btn {
  background-color: rgb(64, 168, 64);
}
#initialise-btn:hover {
  background-color: rgb(32, 87, 32);
}
#cancel-pay {
  background-color: rgb(233, 60, 60);
}
#cancel-pay:hover {
  background-color: rgb(133, 33, 33);
}
.redeem-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  z-index: 999;
  display: none;
}
.redeem-form {
  background-color: white;
  height: 200px;
  width: 480px;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  color: black;
}
.redeem-form span {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}
.redeem-form label {
  font-size: 25px;
  text-align: center;
  font-weight: bold;
}
.redeem-form input {
  padding: 10px;
  border-radius: 8px;
  outline: none;
  border: solid 2px rgb(212, 207, 207);
  height: 20px;
  font-size: 18px;
  width: 95%;
}
.redeem-form input:focus {
  border: solid 2px green;
}
.voucher-btns {
  display: flex;
  flex-direction: row;
  gap: 15px;
}
.voucher-btns button {
  color: white;
  height: 45px;
  width: 100px;
  border: none;
  outline: none;
  border-radius: 8px;
  font-size: 18px;
}
#redeem-code-btn {
  background-color: rgb(64, 168, 64);
}
#redeem-code-btn:hover {
  background-color: rgb(32, 87, 32);
}
#cancel-redeem-btn {
  background-color: rgb(233, 60, 60);
}
#cancel-redeem-btn:hover {
  background-color: rgb(133, 33, 33);
}


@media (max-width: 768px) {
  .body-container {
    width: 90%;
  }
  .body-top h1 {
    font-size: 20px;
  }
  .body-top p {
    font-size: 15px;
  }
  .packages {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, auto);
  }
}

    </style>
</head>
  <body>
    <div class="body-container">
      <div class="body-top">
        <h1>${internetName.toUpperCase()}</h1>
        <p>${phoneNumber}</p>
      </div>
      <div class="message-login">
        <button id="toggle-mpesa-login">Login With Mpesa Message</button>
        <form id="mpesa-message-form">
          <span>
            <label for="mpesa-login">Mpesa code:</label>
            <input
              type="text"
              name="mpesa-login"
              id="mpesa-login"
              placeholder="Enter Mpesa Ref Code"
            />
          </span>
          <button type="submit">Reconnect</button>
        </form>
      </div>
      <div class="username-login">
        <form>
          <span>
            <label for="username-login">Login with username:</label>
            <input
              type="text"
              name="username-login"
              id="username-login"
              placeholder="eg. ACC12345"
            />
          </span>
          <button type="submit">Connect</button>
        </form>
      </div>
      <div class="packages">
      ${packageCards.length > 0 ? packageCards : "<p id='no-package'>No packages found</p>"}
      </div>
      <button type="button" id="redeem-btn">
        <span class="material-symbols-outlined"> redeem </span> Redeem Voucher
      </button>
      <div class="redeem-overlay" id="redeem-overlay">
        <form class="redeem-form">
          <span>
            <label for="voucher-code">Redeem Voucher</label>
            <input
              type="text"
              name="voucher-code"
              id="voucher-code"
              placeholder="Enter voucher code"
            />
          </span>
          <div class="voucher-btns">
            <button id="redeem-code-btn" type="submit">Redeem</button
            ><button id="cancel-redeem-btn" type="button">Cancel</button>
          </div>
        </form>
      </div>
      <hr />
      <footer>
        <p>&copy; All rights reserved</p>
        <p>@2026. Powered by Netizone</p>
      </footer>
      <div class="pay-overlay" id="pay-overlay">
        <form class="pay-form" onsubmit="handlePaymentSubmit(event)">
          <h2>Pay with Mpesa</h2>
          <span>
            <label id="mpesa-amount-message" for="payment-number"
              >You are about to pay Kes. 0. Enter your mpesa number below to
              initialise your payment</label
            >
            <input type="number" name="payment-number" id="payment-number" />
          </span>
          <div class="payment-btns">
            <button id="initialise-btn" type="submit">Initialise</button
            ><button id="cancel-pay" type="button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
    <script>
let payOverlay, amountMessageLabel;

document.addEventListener("DOMContentLoaded", () => {
  const toggleMpesaButton = document.getElementById("toggle-mpesa-login");
  const mpesaMessageForm = document.getElementById("mpesa-message-form");

  toggleMpesaButton.addEventListener("click", function () {
    if (mpesaMessageForm.style.display === "flex") {
      mpesaMessageForm.style.display = "none";
    } else {
      mpesaMessageForm.style.display = "flex";
    }
  });

  const redeemOverlay = document.getElementById("redeem-overlay");
  const toggleRedeemOverlay = document.getElementById("redeem-btn");
  const toggleCloseRedeem = document.getElementById("cancel-redeem-btn");

  toggleRedeemOverlay.addEventListener("click", function () {
    if (
      redeemOverlay.style.display === "none" ||
      redeemOverlay.style.display === ""
    ) {
      redeemOverlay.style.display = "flex";
    } else {
      redeemOverlay.style.display = "none";
    }
  });

  toggleCloseRedeem.addEventListener("click", function () {
    if (redeemOverlay.style.display === "flex") {
      redeemOverlay.style.display = "none";
    }
  });

  payOverlay = document.getElementById("pay-overlay");
  const cancelPay = document.getElementById("cancel-pay");
  amountMessageLabel = document.getElementById("mpesa-amount-message");

  cancelPay.addEventListener("click", function () {
    if (payOverlay.style.display === "flex") {
      payOverlay.style.display = "none";
    }
  });
});

window.openPaymentModal = function(packageName, packagePrice) {
  if (!amountMessageLabel) amountMessageLabel = document.getElementById("mpesa-amount-message");
  if (!payOverlay) payOverlay = document.getElementById("pay-overlay");

  if (amountMessageLabel) {
    amountMessageLabel.innerHTML = "You are about to pay Kes. " + packagePrice + ". Enter your M-Pesa number below to initialize your payment:";
  }
  if (payOverlay) {
    payOverlay.style.display = "flex";
  }
};

window.handlePaymentSubmit = function(event) {
  event.preventDefault();
  const phoneInput = document.getElementById("payment-number").value;
  console.log("Processing STK Push via Daraja for:", phoneInput);
  
  alert("Payment initialized to phone: " + phoneInput);
  if (payOverlay) payOverlay.style.display = "none";
};
    </script>
  </body>
</html>`;
};
