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
  fetchAndPopulateSubscribeTable();
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
  animation: spin 2s linear infinite;
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

function fetchAndPopulateSubscribeTable() {
  showLoader();
  fetch("https://mybackendblandts.onrender.com/api/subscribe/getall-subscribe/")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      populateTable(data.data);
    })
    .catch((error) => {
      console.error("Error:", error.message);
      alert("Failed to fetch Subscibes. Please try again later.");
    })
    .finally(() => {
      hideLoader();
    });
}

function populateTable(subscibes) {
  const tableBody = document.getElementById("subscibeTableBody");

  // Clear existing rows in the table
  tableBody.innerHTML = "";

  subscibes.forEach((subscibe, index) => {
    const row = tableBody.insertRow();
    const formattedDate = new Date(subscibe.date).toISOString().split("T")[0];

    row.innerHTML = `
        <td data-table="subscribe Id">${index + 1}</td>
        <td data-table="Email Address">${subscibe.email}</td>
        <td data-table="User Subscibe">${formattedDate}</td>
        <td>
        <button class="btn_trash"  data-table="Delete" data-subscibe-id="${
          subscibe._id
        }">Delete</button>
        </td>
      `;
  });

  const deleteButtons = document.querySelectorAll(".btn_trash");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", handleDeleteSubscribe);
  });
}

// Function to handle delete blog button click
function handleDeleteSubscribe(event) {
  const subscibeId = event.target.dataset.subscibeId;
  if (confirm("Are you sure you want to delete this Subscibe?")) {
    deleteSubscribe(subscibeId);
  }
}

// Function to delete a blog
function deleteSubscribe(subscibeId) {
  const token = localStorage.getItem("token");
  fetch(
    `https://mybackendblandts.onrender.com/api/subscribe/delete-subscribe/${subscibeId}`,
    {
      method: "DELETE",
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        alert("Subscibe Deleted Successfully!!!");
      }
    })
    .then((data) => {
      // user deleted successfully, update UI
      fetchAndPopulateSubscribeTable();
    });
}

document.addEventListener("DOMContentLoaded", fetchAndPopulateSubscribeTable);
