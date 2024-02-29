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
function openModal1() {
  const modal = document.getElementById("searchModal");
  modal.style.display = "block";
}

function closeModal1() {
  const modal = document.getElementById("searchModal");
  modal.style.display = "none";
}

function performSearch() {
  const searchInput = document.getElementById("searchInput").value;
  // Implement your search logic here
  console.log("Performing search for:", searchInput);
  // Close the modal after performing search
  closeModal1();
}

// scrolling main Section
const mainContent = document.querySelector(".main");

mainContent.addEventListener("scroll", function () {
  const scrollPosition = mainContent.scrollTop;

  // Adjust the styles of header and aside based on the scroll position
  document.querySelector(".header").style.top = `${scrollPosition}px`;
  document.querySelector(".aside").style.top = `${scrollPosition}px`;
});

openHam.addEventListener("click", () =>
  hamburgerEvent("block", "block", "none")
);
closeHam.addEventListener("click", () =>
  hamburgerEvent("none", "none", "block")
);

// Add these functions for modal handling
function openModal() {
  const modal1 = document.getElementById("searchModal");
  modal1.style.display = "block";
}

function closeModal() {
  const modal1 = document.getElementById("searchModal");
  modal1.style.display = "none";
}

// Add a function to open the modal
function openBlogModal() {
  const modalContainer = document.getElementById("blogModalContainer");
  modalContainer.style.display = "flex";

  // Remove existing event listener if any
  const postBlogButton = document.querySelector("#blogModal button");
  postBlogButton.removeEventListener("click", validateBlogForm);

  // Add event listener for form submission
  postBlogButton.addEventListener("click", function (event) {
    event.stopPropagation();
    validateBlogForm();
  });
}

// Update the existing closeModal function
function closeModal() {
  const modalContainer = document.getElementById("blogModalContainer");
  modalContainer.style.display = "none";
}

// Add an event listener to close the modal when clicking outside the form
document.addEventListener("click", function (event) {
  const modalContainer = document.getElementById("blogModalContainer");
  if (event.target === modalContainer) {
    closeModal();
  }
});
function validateBlogForm() {
  const imageInput = document.getElementById("blogimage");
  const dateInput = document.getElementById("blogdate");
  const titleInput = document.getElementById("blogtitle");
  const descriptionInput = document.getElementById("blogdescription");

  // Validation logic for image, date, title, and description
  // Collect validation messages
  const errors = [];

  if (!imageInput || imageInput.files.length === 0) {
    errors.push("Image is required");
  }

  if (!dateInput || dateInput.value.trim() === "") {
    errors.push("Date is required");
  }

  if (!titleInput || titleInput.value.trim() === "") {
    errors.push("Title is required");
  }

  if (!descriptionInput || descriptionInput.value.trim() === "") {
    errors.push("Description is required");
  }

  // Display all validation messages at once
  document.getElementById("imageError").textContent = errors.includes(
    "Image is required"
  )
    ? "Image is required"
    : "";
  document.getElementById("dateError").textContent = errors.includes(
    "Date is required"
  )
    ? "Date is required"
    : "";
  document.getElementById("blogTitleError").textContent = errors.includes(
    "Title is required"
  )
    ? "Title is required"
    : "";
  document.getElementById("descriptionError").textContent = errors.includes(
    "Description is required"
  )
    ? "Description is required"
    : "";

  // If there are any validation errors, return early
  if (errors.length > 0) {
    return;
  }

  // Read the image file using FileReader
  const reader = new FileReader();
  reader.onload = function (e) {
    // e.target.result contains the base64-encoded image data
    const imageData = e.target.result;

    // If all fields are valid, proceed to store data in local storage
    storeBlogData(
      imageData,
      dateInput.value,
      titleInput.value,
      descriptionInput.value
    );

    // Close the modal after successful validation and storage
    closeModal();
  };

  // Read the image file asDataURL
  reader.readAsDataURL(imageInput.files[0]);
}

// Declare imageInput, dateInput, blogTitleInput, and descriptionInput globally
const imageInput = document.getElementById("blogimage");
const dateInput = document.getElementById("blogdate");
const blogTitleInput = document.getElementById("blogtitle");
const descriptionInput = document.getElementById("blogdescription");

// Add input event listeners to clear errors when typing starts
imageInput.addEventListener("input", () => clearError("imageError"));
dateInput.addEventListener("input", () => clearError("dateError"));
blogTitleInput.addEventListener("input", () => clearError("blogTitleError"));
descriptionInput.addEventListener("input", () =>
  clearError("descriptionError")
);

// Function to clear errors
function clearError(errorId) {
  document.getElementById(errorId).textContent = "";
}

// Function to store blog data in local storage
// Function to store blog data in local storage
function storeBlogData(image, date, title, description) {
  const blogData = {
    image: image,
    date: date,
    title: title,
    description: description,
  };

  // Retrieve existing blog data from local storage
  let existingBlogs = JSON.parse(localStorage.getItem("blogs")) || [];

  // Add new blog data to the existing list only if it doesn't already exist
  const isDuplicate = existingBlogs.some(
    (blog) =>
      blog.image === image &&
      blog.date === date &&
      blog.title === title &&
      blog.description === description
  );

  if (!isDuplicate) {
    existingBlogs.push(blogData);

    // Store the updated list back in local storage
    localStorage.setItem("blogs", JSON.stringify(existingBlogs));

    // Fetch and populate the table with the updated data
    fetchAndPopulateTable();
  }
}

// Function to fetch and populate the table with blog data
function fetchAndPopulateTable() {
  // Retrieve blog data from local storage
  const blogData = JSON.parse(localStorage.getItem("blogs")) || [];

  // Get the table body
  const tableBody = document.querySelector(".tbl tbody");

  // Clear existing rows in the table
  tableBody.innerHTML = "";

  // Iterate through blog data and append rows to the table
  blogData.forEach((blog, index) => {
    const row = tableBody.insertRow();
    row.innerHTML = `
      <td data-table="Blog Id">${index + 1}</td>
      <td data-table="Image"><img src="${blog.image}" alt="blog Image"></td>
      <td data-table="Blog Title">${blog.title}</td>
      <td data-table="Description">${blog.description}</td>
      <td data-table="Date Created">${blog.date}</td>
      <td>
        <button class="btn_edit" data-table="Edit">Edit</button>
        <button class="btn_trash" data-table="Delete">Delete</button>
      </td>
    `;
  });
}

// Add an event listener to fetch and populate the table on page load
document.addEventListener("DOMContentLoaded", fetchAndPopulateTable);
