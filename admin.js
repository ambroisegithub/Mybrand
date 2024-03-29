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
  const modal1 = document.getElementById("searchModal");
  modal1.style.display = "block";
}

function closeModal() {
  const modal1 = document.getElementById("searchModal");
  modal1.style.display = "none";
}

const mainContent = document.querySelector(".main");

mainContent.addEventListener("scroll", function () {
  const scrollPosition = mainContent.scrollTop;

  document.querySelector(".header").style.top = `${scrollPosition}px`;
  document.querySelector(".aside").style.top = `${scrollPosition}px`;
});

// Define a named function for the event listener
function handlePostBlogClick(event) {
  event.stopPropagation();
  validateBlogForm();
}

let isPostBlogListenerAdded = false; // Flag to track if the event listener has been added

function closeModal() {
  const modalContainer = document.getElementById("blogModalContainer");
  modalContainer.style.display = "none";

  // Always remove the event listener when the modal is closed
  const postBlogButton = document.querySelector("#blogModal button");
  postBlogButton.removeEventListener("click", handlePostBlogClick);
}

function closeModal() {
  const modalContainer = document.getElementById("blogModalContainer");
  modalContainer.style.display = "none";
  // Reset the flag when the modal is closed
  isPostBlogListenerAdded = false;
}

document.addEventListener("click", function (event) {
  const modalContainer = document.getElementById("blogModalContainer");
  if (event.target === modalContainer) {
    closeModal();
  }
});

document.addEventListener("DOMContentLoaded", fetchAndPopulateTable);

function openBlogModal() {
  const modalContainer = document.getElementById("blogModalContainer");
  modalContainer.style.display = "flex";

  // Clear previous data in input fields
  imageInput.value = "";
  dateInput.value = "";
  blogTitleInput.value = "";
  descriptionInput.value = "";

  // Reset error messages
  clearError("imageError");
  clearError("dateError");
  clearError("blogTitleError");
  clearError("descriptionError");
}

// Function to validate and submit the blog form
function handlePostBlogClick(event) {
  event.stopPropagation();
  validateBlogForm();
}

// Add event listener to open blog modal
document
  .getElementById("openBlogModal")
  .addEventListener("click", openBlogModal);

// Add event listener to post blog button
document
  .getElementById("postBlogButton")
  .addEventListener("click", handlePostBlogClick);

// Function to validate the blog form
function validateBlogForm() {
  const imageInput = document.getElementById("blogImage").files[0];
  const dateInput = document.getElementById("blogDate").value;
  const titleInput = document.getElementById("blogTitle").value;
  const descriptionInput = document.getElementById("blogDescription").value;

  const errors = [];

  if (!imageInput) {
    errors.push("Image is required");
  }

  if (!dateInput || dateInput.trim() === "") {
    errors.push("Date is required");
  }

  if (!titleInput || titleInput.trim() === "") {
    errors.push("Title is required");
  }

  if (!descriptionInput || descriptionInput.trim() === "") {
    errors.push("Description is required");
  }

  // Display error messages
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

  // If no errors, submit the form
  if (errors.length === 0) {
    postBlogData(imageInput, dateInput, titleInput, descriptionInput);
  }
}

// Function to submit blog data
function postBlogData(blogImage, blogDate, blogTitle, blogDescription) {
  const formData = new FormData();
  formData.append("blogImage", blogImage);
  formData.append("blogDate", blogDate);
  formData.append("blogTitle", blogTitle);
  formData.append("blogDescription", blogDescription);
  const token = localStorage.getItem("token");

  fetch("http://localhost:3000/api/blog/post-blog", {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      closeModal(); // Close modal after successful posting
      fetchAndPopulateTable(); // Update table with new data
    })
    .catch((error) => {
      console.error("Error:", error.message);
      alert("Failed to post blog. Please try again later.");
    });
}

// Declare imageInput, dateInput, blogTitleInput, and descriptionInput globally
const imageInput = document.getElementById("blogImage");
const dateInput = document.getElementById("blogDate");
const blogTitleInput = document.getElementById("blogTitle");
const descriptionInput = document.getElementById("blogDescription");

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
   <td class="table-button">
   <button class="btn_edit" data-table="Edit" onclick="editBlog(${index})">Edit</button>
    <button class="btn_trash" data-table="Delete" onclick="deleteBlog(${index})">Delete</button>
   </td>
  `;
  });
}

// Add an event listener to fetch and populate the table on page load
document.addEventListener("DOMContentLoaded", fetchAndPopulateTable);

function deleteBlog(index) {
  // Retrieve existing blog data from local storage
  let existingBlogs = JSON.parse(localStorage.getItem("blogs")) || [];

  // Remove the blog at the specified index
  existingBlogs.splice(index, 1);

  // Store the updated list back in local storage
  localStorage.setItem("blogs", JSON.stringify(existingBlogs));

  // Fetch and populate the table with the updated data
  fetchAndPopulateTable();
}

// Function to edit a blog
function editBlog(index) {
  // Retrieve existing blog data from local storage
  let existingBlogs = JSON.parse(localStorage.getItem("blogs")) || [];

  // Get the blog data based on the clicked row
  const blogToEdit = existingBlogs[index];

  // Populate the modal with the data for editing
  imageInput.value = ""; // Clear the file input to ensure user selects a new image
  dateInput.value = blogToEdit.date;
  blogTitleInput.value = blogToEdit.title;
  descriptionInput.value = blogToEdit.description;

  // Open the modal for editing
  openBlogModal();

  // Remove existing event listener if any
  const postBlogButton = document.querySelector("#blogModal button");

  // Add event listener for form submission with updated data
  postBlogButton.addEventListener("click", function (event) {
    event.stopPropagation();
    updateBlogData(index);
  });
}

// Function to update blog data in local storage
function updateBlogData(index) {
  // Retrieve existing blog data from local storage
  let existingBlogs = JSON.parse(localStorage.getItem("blogs")) || [];

  // Read the image file using FileReader
  const reader = new FileReader();

  reader.onload = function (e) {
    // e.target.result contains the base64-encoded image data
    const imageData = e.target.result;

    // Update the blog data at the specified index
    existingBlogs[index] = {
      image: imageData, // Use the base64-encoded image data
      date: dateInput.value,
      title: blogTitleInput.value,
      description: descriptionInput.value,
    };

    // Store the updated list back in local storage
    localStorage.setItem("blogs", JSON.stringify(existingBlogs));

    // Fetch and populate the table with the updated data
    fetchAndPopulateTable();

    // Close the modal after successful update
    closeModal();
  };

  // Read the image file asDataURL
  reader.readAsDataURL(imageInput.files[0]);
}

// Function to count comments and update the overview card
function updateCommentOverview() {
  // Retrieve existing comments from local storage
  let comments = JSON.parse(localStorage.getItem("UserComments")) || [];

  // Calculate the percentage and count
  const commentPercentage = calculatePercentage(comments.length);
  const commentCount = comments.length;

  // Update the elements in the overview card
  document.querySelector(".commentPercentage").innerText =
    commentPercentage * 0.001 + "" + "%";
  document.querySelector(".commentIncrease").innerText = "From Last Week";
  document.querySelector(".commentCount").innerText = commentCount;
  fetchAndPopulateTable();
}

// Function to count blogs and update the overview card
function updateBlogOverview() {
  // Retrieve existing blogs from local storage
  let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

  // Calculate the percentage and count
  const blogPercentage = calculatePercentage(blogs.length);
  const blogCount = blogs.length;

  // Update the elements in the overview card
  document.querySelector(".blogPercentage").innerText =
    blogPercentage * 0.001 + "";
  document.querySelector(".blogIncrease").innerText = "From Last Week";
  document.querySelector(".blogCount").innerText = blogCount;
  fetchAndPopulateTable();
}

// Function to count Total subscribers and update the overview card
function updateSubscriberOverview() {
  // Retrieve existing subscribers from local storage
  let subscribers = JSON.parse(localStorage.getItem("subscriptions")) || [];

  // Calculate the percentage and count
  const subscriberPercentage = calculatePercentage(subscribers.length);
  const subscriberCount = subscribers.length;

  // Update the elements in the overview card
  document.querySelector(".one").innerText = `${subscriberPercentage}%`;
  document.querySelector(".three").innerText = subscriberCount;
  fetchAndPopulateTable();
}

function updateContactusOverview() {
  // Get the table body
  const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  const mailBadge = document.getElementById("mailBadge");

  // Count the number of unseen contacts
  const unseenContacts = contacts.filter((contact) => !contact.seen);

  // Update the mail badge with the count
  mailBadge.textContent = unseenContacts.length;
  0;
}

document
  .getElementById("logoutButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    logout();
  });

// Logout functionality
const logout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userLoggedIn");
  localStorage.removeItem("token");
  window.location.href = "./login.html";
};

// Helper function to calculate percentage
function calculatePercentage(count) {
  // Replace this with your percentage calculation logic
  return count * 0.001 + "%";
}

// Call the functions to update the overview cards
updateCommentOverview();
updateBlogOverview();
updateSubscriberOverview();
updateContactusOverview();
