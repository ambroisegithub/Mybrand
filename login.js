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

document.getElementById("goToSignup").addEventListener("click", function () {
  window.location.href = "register.html";
});

const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

// Add input event listeners to each input field
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

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

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
