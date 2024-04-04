let openHam = document.querySelector("#openHam");
let closeHam = document.querySelector("#closeHam");
let asideContainer = document.querySelector("#aside-container");

const hamburgerEvent = (aside, close, open) => {
  asideContainer.style.display = aside;
  closeHam.style.display = close;
  openHam.style.display = open;
};

openHam.addEventListener("click", () =>
  hamburgerEvent("block", "block", "none")
);
closeHam.addEventListener("click", () =>
  hamburgerEvent("none", "none", "block")
);

function openModal() {
  const modal = document.getElementById("searchModal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("searchModal");
  modal.style.display = "none";
}

function performSearch() {
  const searchInput = document.getElementById("searchInput").value;
  console.log("Performing search for:", searchInput);
  closeModal();
}

const mainContent = document.querySelector(".main");

mainContent.addEventListener("scroll", function () {
  const scrollPosition = mainContent.scrollTop;
  document.querySelector(".header").style.top = `${scrollPosition}px`;
  document.querySelector(".aside").style.top = `${scrollPosition}px`;
});

function openUserModal(purpose = "create", user = null) {
  const modalContainer = document.getElementById("userModalContainer");
  modalContainer.style.display = "flex";
  resetModalForm();
  modalContainer.dataset.purpose = purpose;
  if (purpose === "edit" && user) {
    // Populate form fields if editing an existing user
    document.getElementById("fullName").value = user.fullName;
    document.getElementById("email").value = user.email;
    document.getElementById("userRole").value = user.userRole;
    document.getElementById("phoneNumber").value = user.phoneNumber;
    document.getElementById("password").value = user.password;
    document.getElementById("confirmPassword").value = user.confirmPassword;
    modalContainer.dataset.userId = user._id;
  }
}

function handlePostUserClick(event) {
  event.stopPropagation();
  const modalContainer = document.getElementById("userModalContainer");
  const purpose = modalContainer.dataset.purpose;
  if (purpose === "create") {
    validateUserForm();
  } else if (purpose === "edit") {
    updateUser();
  }
}

function closeModal() {
  const modalContainer = document.getElementById("userModalContainer");
  modalContainer.style.display = "none";
  resetModalForm();
}

function resetModalForm() {
  document.getElementById("fullName").value = "";
  document.getElementById("email").value = "";
  document.getElementById("userRole").value = "";
  document.getElementById("phoneNumber").value = "";
  document.getElementById("password").value = "";
  document.getElementById("confirmPassword").value = "";
  clearError("usernameError");
  clearError("emailError");
  clearError("passwordError");
  clearError("phoneNumberError");
  clearError("confirmPasswordError");
  clearError("signupError");
}

function validateUserForm() {
  const usernameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const userRoleInput = document.getElementById("userRole");
  const phoneNumberInput = document.getElementById("phoneNumber");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  const fullNameValue = usernameInput.value.trim();
  const phoneNumberValue = phoneNumberInput.value.trim();
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  const confirmPasswordValue = confirmPasswordInput.value.trim();
  const userRoleValue = userRoleInput.value;

  const errors = [];

  if (!fullNameValue) {
    errors.push("User Name is required");
  }

  if (!emailValue) {
    errors.push("Email is required");
  }

  if (!phoneNumberValue) {
    errors.push("Phone Number is required");
  }

  if (!passwordValue) {
    errors.push("Password is required");
  }

  if (!confirmPasswordValue) {
    errors.push("Confirm Password is required");
  }

  if (confirmPasswordValue !== passwordValue) {
    errors.push("Passwords do not match");
  }

  document.getElementById("usernameError").textContent = errors.includes(
    "User Name is required"
  )
    ? "User Name is required"
    : "";
  document.getElementById("emailError").textContent = errors.includes(
    "Email is required"
  )
    ? "Email is required"
    : "";
  document.getElementById("phoneNumberError").textContent = errors.includes(
    "Phone Number is required"
  )
    ? "Phone Number is required"
    : "";
  document.getElementById("passwordError").textContent = errors.includes(
    "Password is required"
  )
    ? "Password is required"
    : "";
  document.getElementById("confirmPasswordError").textContent = errors.includes(
    "Passwords do not match"
  )
    ? "Passwords do not match"
    : "";

  if (errors.length === 0) {
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
}

function save(userData) {
  const modalContainer = document.getElementById("userModalContainer");
  const purpose = modalContainer.dataset.purpose;

  let url = "";
  let method = "";

  if (purpose === "create") {
    url = "http://localhost:3000/api/user/signup";
    method = "POST";
  } else if (purpose === "edit") {
    const userId = modalContainer.dataset.userId;
    url = `http://localhost:3000/api/user/${userId}`;
    method = "PUT";
  }

  fetch(url, {
    method: method,
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
      } else {
        throw new Error("Failed to register");
      }
    })
    .then((user) => {
      alert(
        purpose === "create"
          ? "User registered successfully!"
          : "User updated successfully!"
      );
      closeModal();
      fetchAndPopulateTable();
      console.log(
        purpose === "create"
          ? "User registered successfully:"
          : "User updated successfully:",
        user
      );
      resetModalForm();
    })
    .catch((error) => {
      console.error("Error:", error.message);
      if (error.message === "Email already exists") {
        displayErrorMessage(
          "emailError",
          "Email address is already registered"
        );
      } else {
        displayErrorMessage(
          "signupError",
          `Failed to ${
            purpose === "create" ? "register" : "update"
          } user. Please try again later.`
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

const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const phoneNumberInput = document.getElementById("phoneNumber");

fullNameInput.addEventListener("input", () => clearError("usernameError"));
emailInput.addEventListener("input", () => clearError("emailError"));
passwordInput.addEventListener("input", () => clearError("passwordError"));
phoneNumberInput.addEventListener("input", () =>
  clearError("phoneNumberError")
);

function clearError(errorId) {
  const errorElement = document.getElementById(errorId);
  if (errorElement) {
    errorElement.textContent = "";
  } else {
    console.warn(`Element with ID '${errorId}' not found.`);
  }
}

function fetchAndPopulateTable() {
  fetch("http://localhost:3000/api/user/all")
    .then((response) => {
      if (!response) {
        throw new Error("Network response Was not Work");
      }
      return response.json();
    })
    .then((data) => {
      populateTable(data.data);
    })
    .catch((error) => {
      console.error("Error:", error.message);
      alert("Failed to fetch the users. Please try again");
    });
}

function populateTable(userData) {
  const tableBody = document.querySelector(".tbl tbody");
  tableBody.innerHTML = "";
  userData.forEach((user, index) => {
    const row = tableBody.insertRow();
    row.innerHTML = `
    <td data-table="User Id">${index + 1}</td>
    <td data-table="User Name">${user.fullName}</td>
    <td data-table="Phone Number">${user.phoneNumber}</td>
    <td data-table="Email">${user.email}</td>
    <td data-table="user Role">${user.userRole}</td>
    <td>
      <button class="btn_edit" data-table="Edit" data-user-id="${
        user._id
      }">Edit</button>
      <button class="btn_trash" data-user-id="${
        user._id
      }" data-table="Delete" onclick="deleteUser('${user._id}')">Delete</button>
    </td>
 `;
    const editButton = row.querySelector(".btn_edit");
    editButton.addEventListener("click", () => openUserModalForEdit(user));
  });
}

function openUserModalForEdit(user) {
  openUserModal("edit", user);
}

function updateUser() {
  const userId = document.getElementById("userModalContainer").dataset.userId;
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const userRole = document.getElementById("userRole").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  const userData = {
    fullName: fullName,
    phoneNumber: phoneNumber,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
    userRole: userRole,
  };

  save(userData);
}

const deleteButtons = document.querySelectorAll(".btn_trash");
deleteButtons.forEach((button) => {
  button.addEventListener("click", handleDeleteUser);
});

function deleteUser(userId) {
  const token = localStorage.getItem("token");
  const isConfirmed = confirm("Are you sure you want to delete this user?");
  if (isConfirmed) {
    fetch(`http://localhost:3000/api/user/${userId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else {
          alert("User deleted successfully!");
        }
      })
      .then((data) => {
        fetchAndPopulateTable();
      })
      .catch((error) => {
        console.error("Error:", error.message);
        alert("Failed to delete the user. Please try again");
      });
  }
}

document.addEventListener("DOMContentLoaded", fetchAndPopulateTable);
