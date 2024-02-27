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

// Add input event listeners to each input field
fullName.addEventListener("input", () => setSuccess(fullName, fullNameError));
phoneNumber.addEventListener("input", () =>
  setSuccess(phoneNumber, phoneNumberError)
);
email.addEventListener("input", () => setSuccess(email, emailError));
password.addEventListener("input", () => setSuccess(password, passwordError));

form.addEventListener("submit", function (event) {
  event.preventDefault();
  validateInputs();
});

const setError = (element, errorElement, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = errorElement;

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element, errorElement) => {
  const inputControl = element.parentElement;
  const errorDisplay = errorElement;

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
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
  }
};

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
