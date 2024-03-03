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

// Add these functions for modal handling
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
  // Implement your search logic here
  console.log("Performing search for:", searchInput);
  // Close the modal after performing search
  closeModal();
}

// Update the button click event to open the modal
document
  .querySelector(".input-Search button")
  .addEventListener("click", openModal);

// scrolling main Section
const mainContent = document.querySelector(".main");

mainContent.addEventListener("scroll", function () {
  const scrollPosition = mainContent.scrollTop;

  // Adjust the styles of header and aside based on the scroll position
  document.querySelector(".header").style.top = `${scrollPosition}px`;
  document.querySelector(".aside").style.top = `${scrollPosition}px`;
});

// open and close model
function openuserModal() {
  const modalContainer = document.getElementById("userModalContainer");
  modalContainer.style.display = "flex";
}

// Update the existing closeModal function
function closeModal() {
  const modalContainer = document.getElementById("userModalContainer");
  modalContainer.style.display = "none";
}

// Function to validate the user creation form
function validateUserForm() {
  const usernameInput = document.querySelector(".username");
  const emailInput = document.querySelector(".email");
  const phoneNumberInput = document.querySelector(
    "input[title='Phone Number']"
  );
  const passwordInput = document.querySelector("input[title='Password']");

  // Validation logic for username, email, phone number, and password
  // Collect validation messages
  const errors = [];

  if (!usernameInput || usernameInput.value.trim() === "") {
    errors.push("User Name is required");
  }

  if (!emailInput || emailInput.value.trim() === "") {
    errors.push("Email is required");
  }

  if (!phoneNumberInput || phoneNumberInput.value.trim() === "") {
    errors.push("Phone Number is required");
  }

  if (!passwordInput || passwordInput.value.trim() === "") {
    errors.push("Password is required");
  }

  // Display all validation messages at once
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

  // If there are any validation errors, return early
  if (errors.length > 0) {
    return;
  }

  // If all fields are valid, proceed to store data in local storage
  storeUserData(
    usernameInput.value,
    emailInput.value,
    phoneNumberInput.value,
    passwordInput.value
  );

  // Close the modal after successful validation and storage
  closeModal();
}

// Declare imageInput, dateInput, blogTitleInput, and descriptionInput globally
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userPassword = document.getElementById("userPassword");
const userPhone = document.getElementById("userPhone");


// Add input event listeners to clear errors when typing starts
userName.addEventListener("input", () => clearError("usernameError"));
userEmail.addEventListener("input", () => clearError("emailError"));
userPassword.addEventListener("input", () => clearError("passwordError"));
userPhone.addEventListener("input", () => clearError("phoneNumberError"));

// Function to clear errors
function clearError(errorId) {
  document.getElementById(errorId).textContent = "";
}

// Function to store user data in local storage
function storeUserData(username, email, phoneNumber, password) {
  const userData = {
    username: username,
    email: email,
    phoneNumber: phoneNumber,
    password: password,
  };

  // Retrieve existing user data from local storage
  let existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Add new user data to the existing list only if it doesn't already exist
  const isDuplicate = existingUsers.some(
    (user) =>
      user.username === username &&
      user.email === email &&
      user.phoneNumber === phoneNumber &&
      user.password === password
  );

  if (!isDuplicate) {
    existingUsers.push(userData);

    // Store the updated list back in local storage
    localStorage.setItem("users", JSON.stringify(existingUsers));

    // Fetch and populate the table with the updated data
    fetchAndPopulateTable();
  }
}

// Function to fetch and populate the user table with user data
function fetchAndPopulateTable() {
  // Retrieve user data from local storage
  const userData = JSON.parse(localStorage.getItem("users")) || [];

  // Get the table body
  const tableBody = document.querySelector(".tbl tbody");

  // Clear existing rows in the table
  tableBody.innerHTML = "";

  // Iterate through user data and append rows to the table
  userData.forEach((user, index) => {
    const row = tableBody.insertRow();
    row.innerHTML = `
      <td data-table="User Id">${index + 1}</td>
      <td data-table="User Name">${user.username}</td>
      <td data-table="Email">${user.email}</td>
      <td data-table="Phone Number">${user.phoneNumber}</td>
      <td>
        <button class="btn_edit" data-table="Edit" onclick="editUserModal(${index})">Edit</button>
        <button class="btn_trash" data-table="Delete" onclick="deleteUser(${index})">Delete</button>
      </td>
    `;
  });
}

// Function to delete a user
function deleteUser(index) {
  // Retrieve existing user data from local storage
  let existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Remove the user at the specified index
  existingUsers.splice(index, 1);

  // Store the updated list back in local storage
  localStorage.setItem("users", JSON.stringify(existingUsers));

  // Fetch and populate the table with the updated data
  fetchAndPopulateTable();
}

function editUserModal(index) {
  // Retrieve existing user data from local storage
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Get the user data based on the clicked row
  const userToEdit = existingUsers[index];

  // Populate the modal with the data for editing
  userName.value = userToEdit.username;
  userEmail.value = userToEdit.email;
  userPhone.value = userToEdit.phoneNumber;
  userPassword.value = userToEdit.password;

  // Open the modal for editing
  openuserModal();
}


document.addEventListener("DOMContentLoaded", fetchAndPopulateTable);