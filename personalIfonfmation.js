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


function openProfileModal() {
    const profileModal = document.getElementById("profileModal");
    profileModal.style.display = "block";
  }
  
  function closeProfileModal() {
    const profileModal = document.getElementById("profileModal");
    profileModal.style.display = "none";
  }
  
  function updateProfile() {
    // Implement logic to update profile
    console.log("Updating profile");
    // Close the modal after updating profile
    closeProfileModal();
  }
  
  function completeProfile() {
    // Implement logic to complete profile
    console.log("Completing profile");
    // Close the modal after completing profile
    closeProfileModal();
  }
  
  // Update the button click events to open the profile modal
  document.querySelector(".completeAccount").addEventListener("click", openProfileModal);
  document.querySelector(".updateAccount").addEventListener("click", openProfileModal);
  
