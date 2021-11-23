// "use strict";

function submitForm(e) {
  e.preventDefault();
  document.getElementById("email").classList.remove("errorBorder");
  document.getElementById("password").classList.remove("errorBorder");

  var username = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  // check the credentials with database
  var hasError = false;

  // if (username === "" || password === "") {
  //   hasError = true;
  // } else {
  //   hasError = false;
  // }

  if (username === "") {
    document.getElementById("email").classList.add("errorBorder");
  } else if (password === "") {
    document.getElementById("password").classList.add("errorBorder");
  } else {
    // request
    var data = {
      email: username,
      password: password,
    };

    // fetch("http://127.0.0.1:3000/api/v1/users/login", {
    fetch("https://cashify-banking.herokuapp.com/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Host: "127.0.0.1:5500",
        "Content-Length": data.length,
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    })
      .then(async (res) => {
        const response = await res.json();
        localStorage.setItem("token", response.token);
        localStorage.setItem("email", username);
        console.log(response.token);
        if (response.token) {
          window.location.href = "dashboard.htm";
        } else {
          hasError = true;
        }
        if (hasError) {
          document.getElementById("alertDiv").classList.add("showAlert");
          document.getElementById("errorText").innerText =
            "Please check the credentials and try again.";
        } else {
          document.getElementById("errorText").innerText = "";
          //submit to the database

          document.getElementById("password").value = "";
          document.getElementById("email").value = "";
        }
      })
      .catch((e) => {
        hasError = true;
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        if (hasError) {
          document.getElementById("alertDiv").classList.add("showAlert");
          document.getElementById("errorText").innerText =
            "Please check the credentials and try again.";
        } else {
          document.getElementById("errorText").innerText = "";
          //submit to the database

          document.getElementById("password").value = "";
          document.getElementById("email").value = "";

          // alert("success");
        }
      });

    // if (hasError) {
    //   document.getElementById("alertDiv").classList.add("showAlert");
    //   document.getElementById("errorText").innerText =
    //     "Please check the credentials and try again.";
    // } else {
    //   document.getElementById("errorText").innerText = "";
    //   //submit to the database

    //   document.getElementById("password").value = "";
    //   document.getElementById("email").value = "";

    //   // alert("success");
    // }
  }
}

function registrationRedirect() {
  window.location.href = "signup.html";
}

function showPassword() {
  var passwordTextBox = document.getElementById("password");
  var passwordCheckBox = document.getElementById("showPasswordCheckBox");
  if (passwordTextBox.type == "password") {
    passwordTextBox.type = "text";
    passwordCheckBox.checked = true;
  } else {
    passwordTextBox.type = "password";
    passwordCheckBox.checked = false;
  }
}

// function loginMethod(e) {
//   e.preventDefault();
//   var passwordTextBox = document.getElementById("password");
//   var emailTextBox = document.getElementById("email");

// }

//Redicrect to Home
function backToHome() {
  window.location.href = "../index.html";
}
