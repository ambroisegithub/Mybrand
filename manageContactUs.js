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

document.addEventListener("DOMContentLoaded", function () {
  // Fetch and populate contacts table on page load
  fetchAndPopulateContactsTable();
});

let loadingAnimationHTML = `
<style>
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 8px solid #f3f3f3;
  border-radius: 50%;
  border-top: 8px solid black;
  border-bottom: 8px solid #2A2C39;
  width: 80px;
  height: 80px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

  
 @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
 }
  
</style>
<div class="loader" ></div>
`;

function showLoader() {
  const loaderContainer = document.createElement("div");
  loaderContainer.innerHTML = loadingAnimationHTML;
  loaderContainer.classList.add("loader-container");
  document.body.appendChild(loaderContainer);
}

function hideLoader() {
  const loaderContainer = document.querySelector(".loader-container");
  if (loaderContainer) {
    document.body.removeChild(loaderContainer);
  }
}

function fetchAndPopulateContactsTable() {
  showLoader();
  fetch(
    "https://mybackendblandts.onrender.com/api/contactus/getall-contact-us/"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      populateTable(data.data); // Assuming the response has a 'data' property containing the blog data
    })
    .catch((error) => {
      console.error("Error:", error.message);
      alert("Failed to fetch users. Please try again later.");
    })
    .finally(() => {
      hideLoader();
    });
}

function populateTable(contacts) {
  const tableBody = document.getElementById("contactTableBody");

  // Clear existing rows in the table
  tableBody.innerHTML = "";

  // Iterate through contact data and append rows to the table
  contacts.forEach((contact, index) => {
    const row = tableBody.insertRow();
    row.innerHTML = `
        <td data-table="Contact Id">${index + 1}</td>
        <td data-table="Full Name">${contact.fullName}</td>
        <td data-table="Email Address">${contact.emailAddress}</td>
        <td data-table="Phone Number">${contact.phoneNumber}</td>
        <td data-table="Subject">${contact.subject}</td>
        <td data-table="Message">${contact.message}</td>

        <td>
          <button class="btn_trash"  data-table="Delete" data-contact-id="${
            contact._id
          }">Delete</button>
        </td>
      `;
  });
  const deleteButtons = document.querySelectorAll(".btn_trash");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", handleDeleteContact);
  });
}

// Function to handle delete blog button click
function handleDeleteContact(event) {
  const contactId = event.target.dataset.contactId;
  if (confirm("Are you sure you want to delete this user?")) {
    deletecontact(contactId);
  }
}

// Function to delete a blog
function deletecontact(contactId) {
  const token = localStorage.getItem("token");
  fetch(
    `https://mybackendblandts.onrender.com/api/contactus/delete-contact-us/${contactId}`,
    {
      method: "DELETE",
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        alert("User Deleted Successfully!!!");
      }
    })
    .then((data) => {
      // user deleted successfully, update UI
      fetchAndPopulateContactsTable();
    });
}

// Fetch and populate the contacts table on page load
document.addEventListener("DOMContentLoaded", fetchAndPopulateContactsTable);
