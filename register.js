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

const form = document.getElementById("registerForm");
const fullName = document.getElementById("fullName");
const phoneNumber = document.getElementById("phoneNumber");
const email = document.getElementById("email");
const password = document.getElementById("password");
const fullNameError = document.getElementById("fullNameError");
const phoneNumberError = document.getElementById("phoneNumberError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  validateInputs();
});

const setError = (element, errorElement, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = errorElement;

  errorDisplay.innerText = message;
  if (inputControl) {
    inputControl.classList.add("error");
    inputControl.classList.remove("success");
  }
};

const setSuccess = (element, errorElement) => {
  const inputControl = element.parentElement;
  const errorDisplay = errorElement;

  errorDisplay.innerText = "";
  if (inputControl) {
    inputControl.classList.add("success");
    inputControl.classList.remove("error");
  }
};

const validateInputs = () => {
  const fullNameValue = fullName.value.trim();
  const phoneNumberValue = phoneNumber.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  if (fullNameValue === "") {
    setError(fullName, fullNameError, "Full Name is required");
  } else {
    setSuccess(fullName, fullNameError);
  }

  if (phoneNumberValue === "") {
    setError(phoneNumber, phoneNumberError, "Phone Number is required");
  } else {
    setSuccess(phoneNumber, phoneNumberError);
  }

  if (emailValue === "") {
    setError(email, emailError, "Email is required");
  } else if (!isValidEmail(emailValue)) {
    setError(email, emailError, "Provide a valid email address");
  } else {
    setSuccess(email, emailError);
  }

  if (passwordValue === "") {
    setError(password, passwordError, "Password is required");
  } else if (passwordValue.length < 8) {
    setError(
      password,
      passwordError,
      "Password must be at least 8 characters long"
    );
  } else {
    setSuccess(password, passwordError);

    // If all inputs are valid, register the user and store in local storage
    registerUser(fullNameValue, phoneNumberValue, emailValue, passwordValue);
  }
};

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const registerUser = (fullName, phoneNumber, email, password) => {
  // Construct user object
  const user = {
    fullName: fullName,
    phoneNumber: phoneNumber,
    email: email,
    password: password,
  };

  // Retrieve existing users from local storage or initialize an empty array
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Check if the user already exists
  const isDuplicate = existingUsers.some(
    (existingUser) => existingUser.email === email
  );

  if (!isDuplicate) {
    // Add the new user to the existing list
    existingUsers.push(user);

    // Store the updated list back in local storage
    localStorage.setItem("users", JSON.stringify(existingUsers));
    alert("User registered successfully!");
    // Display a success message or perform any other desired actions
    console.log("User registered successfully!");

    // Clear input fields after successful registration
    if (fullName) fullName.value = "";
    if (phoneNumber) phoneNumber.value = "";
    if (email) email.value = "";
    if (password) password.value = "";

    // Clear success states and error messages
    setSuccess(fullName, fullNameError);
    setSuccess(phoneNumber, phoneNumberError);
    setSuccess(email, emailError);
    setSuccess(password, passwordError);
  } else {
    setError(email, emailError, "This email is already registered");
  }
};
