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

    // If all inputs are valid, attempt to log in
    loginUser(emailValue, passwordValue);
  }
};

const loginUser = async (email, password) => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/user/login",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", data.token);
      localStorage.setItem("userLoggedIn", data.fullName);
      
      if (data.userRole === "user") {
        localStorage.setItem("userRole", "user");
        window.location.href = "./index.html";
      } else if (data.userRole === "admin") {
        localStorage.setItem("userRole", "admin");
        window.location.href = "./Admin.html";
      }
    } else {
      setError(email, emailError, "Invalid email or password");
      setError(password, passwordError, "Invalid email or password");
    }
  } catch (error) {
    console.error("Error:", error);
    setError(email, emailError, "Something went wrong");
    setError(password, passwordError, "Something went wrong");
  }
};

// Logout functionality
const logout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userLoggedIn");
  localStorage.removeItem("token");
  window.location.href = "./index.html";
};
