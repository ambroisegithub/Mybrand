document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("registerForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      validateInputs();
    });

  // Add event listeners to input fields to hide error messages on input
  const inputFields = document.querySelectorAll("input");
  inputFields.forEach(function (input) {
    input.addEventListener("input", function () {
      const errorId = input.id + "Error";
      resetErrorMessage(errorId);
    });
  });
});

function validateInputs() {
  const fullName = document.getElementById("fullName");
  const phoneNumber = document.getElementById("phoneNumber");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const userRole = document.getElementById("userRole");

  const fullNameValue = fullName.value.trim();
  const phoneNumberValue = phoneNumber.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();
  const userRoleValue = userRole.value;

  if (!fullNameValue) {
    displayErrorMessage("fullNameError", "Please enter your full name");
    return;
  }
  resetErrorMessage("fullNameError");

  if (!phoneNumberValue) {
    displayErrorMessage("phoneNumberError", "Please enter your phone Number");
    return;
  }
  resetErrorMessage("phoneNumberError");

  if (!emailValue) {
    displayErrorMessage("emailError", "Please enter your email address");
    return;
  }
  resetErrorMessage("emailError");

  if (!passwordValue) {
    displayErrorMessage("passwordError", "Please enter a password");
    return;
  } else if (passwordValue.length < 8) {
    displayErrorMessage(
      "passwordError",
      "Password must be at least 8 characters long"
    );
    return;
  }
  resetErrorMessage("passwordError");

  if (passwordValue !== confirmPasswordValue) {
    displayErrorMessage("confirmPasswordError", "Passwords do not match");
    return;
  }
  resetErrorMessage("confirmPasswordError");

  const userData = {
    fullName: fullNameValue,
    phoneNumber: phoneNumberValue,
    email: emailValue,
    password: passwordValue,
    confirmPassword: confirmPasswordValue,
    userRole: userRoleValue,
  };

  save(userData);
}

function save(userData) {
  fetch("https://mybackendblandts.onrender.com/api/user/signup", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 409) {
        throw new Error("Email already exists");
      } else if (response.status === 400) {
        throw new Error('"email" must be a valid email');
      } else if (response.status === 409) {
        throw new Error("An admin user already exists");
      } else {
        throw new Error("Failed to register");
      }
    })
    .then((user) => {
      alert("User registered successfully!");
      window.location.href = "./login.html";
      console.log("User registered successfully:", user);
      const fullName = document.getElementById("fullName");
      const phoneNumber = document.getElementById("phoneNumber");
      const email = document.getElementById("email");
      const password = document.getElementById("password");
      const confirmPassword = document.getElementById("confirmPassword");
      fullName.value = "";
      phoneNumber.value = "";
      email.value = "";
      password.value = "";
      confirmPassword.value = "";
    })
    .catch((error) => {
      console.error("Error:", error.message);
      if (error.message === "Email already exists") {
        displayErrorMessage(
          "emailError",
          "Email address is already registered or Try to change User Role"
        );
      } else if (
        error.message === '"email" must be a valid email' ||
        error.message === "Failed to register"
      ) {
        displayErrorMessage(
          "signupError",
          "Failed to register. Please try again later."
        );
      } else if (error.message === "An admin user already exists") {
        displayErrorMessage(
          "signupError",
          "An admin user already exists. Only one admin user allowed."
        );
      }
    });
}

function resetErrorMessage(id) {
  document.getElementById(id).textContent = "";
}

function displayErrorMessage(id, message) {
  const errorMessageElement = document.getElementById(id);
  errorMessageElement.textContent = message;
  errorMessageElement.style.color = "red";
}

let openHam = document.querySelector("#openHam");
let closeHam = document.querySelector("#closeHam");
let navigationItems = document.querySelector("#navigation-items");

const hamburgerEvent = (navigation, close, open) => {
  navigationItems.style.display = navigation;
  closeHam.style.display = close;
  openHam.style.display = open;
};

openHam.addEventListener("click", () =>
  hamburgerEvent("flex", "block", "none")
);
closeHam.addEventListener("click", () =>
  hamburgerEvent("none", "none", "block")
);
