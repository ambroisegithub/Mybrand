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
  
  function fetchAndPopulateContactsTable() {
    // Retrieve contact data from local storage
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  
    // Get the table body
    const tableBody = document.getElementById("contactTableBody");
  
    // Clear existing rows in the table
    tableBody.innerHTML = "";
  
    // Iterate through contact data and append rows to the table
    contacts.forEach((contact, index) => {
      const row = tableBody.insertRow();
      row.innerHTML = `
        <td data-table="Contact Id">${index + 1}</td>
        <td data-table="Full Name">${contact.fullName}</td>
        <td data-table="Email Address">${contact.emailAdress}</td>
        <td data-table="Phone Number">${contact.phoneNumber}</td>
        <td data-table="Subject">${contact.subject}</td>
        <td data-table="Message">${contact.message}</td>
        <td>
          <button class="btn_seen" onclick="markAsSeen(${index})">
            ${contact.seen ? "Seen" : "Mark as Seen"}
          </button>
        </td>
        <td>
          <button class="btn_trash" onclick="deleteContact(${index})">Delete</button>
        </td>
      `;
    });
  }
  
  function storeContactUs(fullName, phoneNumber, emailAdress, subject, message) {
    const contactData = {
      fullName: fullName,
      phoneNumber: phoneNumber,
      emailAdress: emailAdress,
      subject: subject,
      message: message,
      seen: false, // Initially set as unseen
    };
  
    let existingContacts = JSON.parse(localStorage.getItem("contacts")) || [];
  
    // Check for duplicates based on your conditions
    const isDuplicate = existingContacts.some(
      (contact) =>
        contact.fullName === fullName &&
        contact.emailAdress === emailAdress &&
        contact.phoneNumber === phoneNumber &&
        contact.subject === subject &&
        contact.message === message
    );
  
    // Only add new contact if it doesn't already exist
    if (!isDuplicate) {
      existingContacts.push(contactData);
  
      // Store the updated contacts back in local storage
      localStorage.setItem("contacts", JSON.stringify(existingContacts));
  
      // Fetch and populate the contacts table with the updated data
      fetchAndPopulateContactsTable();
    }
  }
  
  function deleteContact(index) {
    // Retrieve existing contacts from local storage
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  
    // Remove the contact at the specified index
    contacts.splice(index, 1);
  
    // Save the updated contacts array to local storage
    localStorage.setItem("contacts", JSON.stringify(contacts));
  
    // Fetch and populate the contacts table with the updated data
    fetchAndPopulateContactsTable();
  }
  
  function markAsSeen(index) {
    // Retrieve existing contacts from local storage
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  
    // Find the contact at the specified index
    const contactToUpdate = contacts[index];
  
    if (contactToUpdate) {
      // Check if the contact is already marked as seen
      if (!contactToUpdate.seen) {
        // Update the seen property to true
        contactToUpdate.seen = true;
  
        // Save the updated contacts array to local storage
        localStorage.setItem("contacts", JSON.stringify(contacts));
  
        // Fetch and populate the contacts table with the updated data
        fetchAndPopulateContactsTable();
  
        alert(`Contact ${index + 1} marked as seen`);
      } else {
        alert(`Contact ${index + 1} is already marked as seen`);
      }
    } else {
      alert(`Contact ${index + 1} not found`);
    }
  }

  // Fetch and populate the contacts table on page load
document.addEventListener("DOMContentLoaded", fetchAndPopulateContactsTable);
