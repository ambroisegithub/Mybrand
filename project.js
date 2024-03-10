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

// Add these functions for modal handling
function openModal() {
  const modal1 = document.getElementById("searchModal");
  modal1.style.display = "block";
}


function closeModal() {
  const modal1 = document.getElementById("searchModal");
  modal1.style.display = "none";
}

// Add these functions for modal handling
function openProjectModal() {
  const modalContainer = document.getElementById("projectModelContainer");
  const modal = document.getElementById("projectModal");
  modalContainer.style.display = "flex";
  modal.style.display = "block";
}

function closeProjectModal() {
  const modalContainer = document.getElementById("projectModelContainer");
  const modal = document.getElementById("projectModal");
  modalContainer.style.display = "none";
  modal.style.display = "none";
}

// Update the existing closeModal function
document.addEventListener("click", function (event) {
  const modalContainer = document.getElementById("projectModelContainer");
  if (event.target === modalContainer) {
    closeProjectModal();
  }
});



