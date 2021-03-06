var email = localStorage.getItem("email");
var token = localStorage.getItem("token");
var dateTimeNow = new Date(Date.now());

var password;
var accountBalance;

var mailValidate;
var passwordValidate;
var amountValidate;

getDetails();

function getDetails() {
  var data = {
    email: email,
  };
  fetch("https://cashify-banking.herokuapp.com/api/v1/users/details", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
      token: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    const response = await res.json();
    const user = response.user;
    console.log(user);
    document.getElementById("lastName").innerHTML = user.lastName;
    document.getElementById("balance__value").innerHTML =
      user.amount.toFixed(2);
    document.getElementById("currentTime").innerHTML = dateTimeNow;
    password = user.password;
  });
}

function getReceiverAcc() {
  const receiverAccountVerify =
    document.getElementById("verifyreceiverAcc").value;
  const receiverAccount = document.getElementById("inputReceiverAcc").value;
  if (receiverAccountVerify === receiverAccount) {
    mailValidate = true;
    document.getElementById("alertDiv").classList.remove("showAlert");
    document.getElementById("errorText").innerText =
      "Receiver email id dosen't match **";

    document
      .getElementById("verifyreceiverAcc")
      .classList.remove("errorBorder");
    document.getElementById("inputReceiverAcc").classList.remove("errorBorder");

    var data = {
      email: receiverAccountVerify,
    };
    fetch("https://cashify-banking.herokuapp.com/api/v1/users/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": data.length,
        token: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      const response = await res.json();
      const user = response.user;
      document.getElementById("receiverName").innerHTML =
        user.firstName + " " + user.lastName;
      document.getElementById("receiverNic").innerHTML = user.nic;
      document.getElementById("receiverAddress").innerHTML = user.address;
      password = user.password;
      accountBalance = user.amount;
    });
  } else {
    mailValidate = false;
    document.getElementById("alertDiv").classList.add("showAlert");
    document.getElementById("errorText").innerText =
      "Receiver email id dosen't match **";

    document.getElementById("verifyreceiverAcc").classList.add("errorBorder");
    document.getElementById("inputReceiverAcc").classList.add("errorBorder");
  }
}

function transferFunds(event) {
  event.preventDefault();
  const receiverAccountVerify =
    document.getElementById("verifyreceiverAcc").value;
  const receiverAccount = document.getElementById("inputReceiverAcc").value;
  const pin = document.getElementById("password").value;
  const transferAmount = document.getElementById("transferAmount").value;

  var data = {
    email: email,
    targetEmail: receiverAccount,
    amount: transferAmount,
  };

  if (receiverAccountVerify === receiverAccount) {
    document
      .getElementById("verifyreceiverAcc")
      .classList.remove("errorBorder");
    document.getElementById("inputReceiverAcc").classList.remove("errorBorder");
    document.getElementById("alertDiv").classList.remove("showAlert");

    if (mailValidate && passwordValidate && amountValidate) {
      console.log("working");
      fetch("https://cashify-banking.herokuapp.com/api/v1/users/transfer", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": data.length,
          token: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }).then(async (res) => {
        const response = await res.json();
        if (response.status === "success") {
          window.location.href = "dashboard.htm";
        }
      });
    }
  }
}

function getPassword() {
  const pin = document.getElementById("password").value;

  if (pin === password) {
    passwordValidate = true;
    document.getElementById("password").classList.remove("errorBorder");
    document.getElementById("alertDiv").classList.remove("showAlert");
  } else {
    passwordValidate = false;
    document.getElementById("password").classList.add("errorBorder");
    document.getElementById("errorText").innerText =
      "Your password dosen't match **";
    document.getElementById("alertDiv").classList.add("showAlert");
  }
}

function getAmount() {
  const pin = document.getElementById("password").value;

  const transferAmount = document.getElementById("transferAmount").value;

  console.log(
    document.getElementById("balance__value").innerHTML.toString(),
    transferAmount
  );
  if (
    parseInt(document.getElementById("balance__value").innerHTML.toString()) >
    parseInt(transferAmount)
  ) {
    amountValidate = true;
    document.getElementById("transferAmount").classList.remove("errorBorder");
    document.getElementById("alertDiv").classList.remove("showAlert");
  } else {
    amountValidate = false;
    document.getElementById("transferAmount").classList.add("errorBorder");
    document.getElementById("errorText").innerText =
      "Your balance is insufficient to transfer **";
    document.getElementById("alertDiv").classList.add("showAlert");
  }
}
