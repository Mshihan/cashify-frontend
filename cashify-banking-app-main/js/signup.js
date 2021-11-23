// //Selecting Components
// var password = document.getElementById("password").value;
// var rPassword = document.getElementById("rpassword").value;
// var alertDiv = document.querySelector(".alertDiv");

function submitForm(event) {
  //Preventing defualt refresh
  event.preventDefault();

  //Selecting Components
  var password = document.getElementById("password").value;
  var rPassword = document.getElementById("rpassword").value;
  var alertDiv = document.querySelector(".alertDiv");

  //Checking the password similarity
  if (password != rPassword) {
    document.getElementById("errorText").innerText =
      "Password dosen't matched. Please try again. *";
    //Add classes
    alertDiv.classList.add("showAlert");
    addErrorBorder();
  } else {
    document.getElementById("errorText").innerText = "";
    document.getElementById("rpassword").value = "";
    document.getElementById("password").value = "";
    //Remove classes
    alertDiv.classList.remove("showAlert");
    removeErrorBorder();
  }
}

function onChangePassword() {
  var password = document.getElementById("password").value;
  var rPassword = document.getElementById("rpassword").value;
  var alertDiv = document.querySelector(".alertDiv");

  if (rPassword == password) {
    removeErrorBorder();
    alertDiv.classList.remove("showAlert");
    document.getElementById("errorText").innerText = "";
  } else {
    alertDiv.classList.add("showAlert");

    document.getElementById("errorText").innerText =
      "Password dosen't matched. Please try again. *";
    addErrorBorder();
  }
}

//password error border [REMOVE]
function removeErrorBorder() {
  var passwordText = document.querySelector("#password");
  var passwordConfirmText = document.querySelector("#rpassword");
  passwordText.classList.remove("textErrorBorder");
  passwordConfirmText.classList.remove("textErrorBorder");
}

//password error border [ADD]
function addErrorBorder() {
  var passwordText = document.querySelector("#password");
  var passwordConfirmText = document.querySelector("#rpassword");
  passwordText.classList.add("textErrorBorder");
  passwordConfirmText.classList.add("textErrorBorder");
}

//show password
function showPassword() {
  var passwordTextBox = document.getElementById("password");
  var passwordConfirmTextBox = document.getElementById("rpassword");

  var passwordCheckBox = document.getElementById("showPasswordCheckBox");
  if (passwordTextBox.type == "password") {
    console.log("Executing");
    passwordTextBox.type = "text";
    passwordConfirmTextBox.type = "text";
    passwordCheckBox.checked = true;
  } else {
    passwordTextBox.type = "password";
    passwordConfirmTextBox.type = "password";

    passwordCheckBox.checked = false;
  }
}

//Redirect to Sign In page
function signInRedirect() {
  window.location.href = "login.html";
}

//Redicrect to Home
function backToHome() {
  window.location.href = "../index.html";
}

function checkEmail() {
  var email = document.getElementById("email").value;
  var data = {
    email: email,
  };
  fetch("https://cashify-banking.herokuapp.com/api/v1/users/email-check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
    body: JSON.stringify(data),
  })
    .then(async (res) => {
      const response = await res.json();
      if (response.status === "fail") {
        document.getElementById("email").classList.add("errorBorder");
      } else {
        document.getElementById("email").classList.remove("errorBorder");
      }
    })
    .catch((error) => console.log(error));
  //   const response = await res.json();
  //   localStorage.setItem("token", response.token);
  //   localStorage.setItem("email", username);
  //   console.log(response.token);
  //   if (response.token) {
  //     window.location.href = "dashboard.htm";
  //   } else {
  //     hasError = true;
  //   }
  //   if (hasError) {
  //     document.getElementById("alertDiv").classList.add("showAlert");
  //     document.getElementById("errorText").innerText =
  //       "Please check the credentials and try again.";
  //   } else {
  //     document.getElementById("errorText").innerText = "";
  //     //submit to the database

  //     document.getElementById("password").value = "";
  //     document.getElementById("email").value = "";
  //   })
  // });
}

function checkNic() {
  var nic = document.getElementById("nic").value;
  var data = {
    nic: nic,
  };
  fetch("https://cashify-banking.herokuapp.com/api/v1/users/nic-check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
    body: JSON.stringify(data),
  })
    .then(async (res) => {
      const response = await res.json();
      if (response.status === "fail") {
        document.getElementById("nic").classList.add("errorBorder");
      } else {
        document.getElementById("nic").classList.remove("errorBorder");
      }
    })
    .catch((error) => console.log(error));
}

function signUp() {
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var dob = document.getElementById("dob").value;
  var nic = document.getElementById("nic").value;
  var phoneNumber = document.getElementById("phoneNumber").value;
  var address = document.getElementById("address").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var passwordConfirm = document.getElementById("rpassword").value;

  var data = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    nic: nic,
    password: password,
    passwordConfirm: passwordConfirm,
    address: address,
    phoneNumber: phoneNumber,
    dob: dob,
  };
  fetch("https://cashify-banking.herokuapp.com/api/v1/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
    body: JSON.stringify(data),
  })
    .then(async (res) => {
      const response = await res.json();
      console.log(response);
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("email", email);

        window.location.href = "dashboard.htm";
      } else {
        document.getElementById("alertDiv").classList.add("showAlert");
        document.getElementById("errorText").innerText =
          "Please check the credentials and try again.";
      }
    })
    .catch((error) => console.log(error));
}
