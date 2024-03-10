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
  const modal1 = document.getElementById("searchModal");
  modal1.style.display = "block";
}

function closeModal() {
  const modal1 = document.getElementById("searchModal");
  modal1.style.display = "none";
}

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

// Add a function to open the modal
function openBlogModal() {
  const modalContainer = document.getElementById("blogModalContainer");
  modalContainer.style.display = "flex";

  // Remove existing event listener if any
  const postBlogButton = document.querySelector("#blogModal button");
  postBlogButton.removeEventListener("click", validateBlogForm);

  // Add event listener for form submission
  postBlogButton.addEventListener("click", function (eventstoreBlogData) {
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
function storeBlogData(image, date, title, description) {
  const blogData = {
    image: image,
    date: date,
    title: title,
    description: description,
    comments: [], // Initialize comments as an empty array
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
  postBlogButton.removeEventListener("click", validateBlogForm);

  // Add event listener for form submission with updated data
  postBlogButton.addEventListener("click", function (event) {
    event.stopPropagation();
    updateBlogData(index);
  });
}

// Function to update blog data in local storage
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

// Add an event listener to fetch and populate the table on page load
document.addEventListener("DOMContentLoaded", fetchAndPopulateTable);

const getUserCount = () => {
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  return existingUsers.length;
};

// Function to update the overview card in HTML
const updateOverviewCard = () => {
  const totalUsersElement = document.querySelector(".users");
  const usersPercentageElement = document.querySelector(".one");
  const usersCountElement = document.querySelector(".three");

  const userCount = getUserCount();
  const percentage = userCount * 0.001; // Assuming total users can be 100% of the space

  totalUsersElement.textContent = `Total Users ${""}`;
  usersPercentageElement.textContent = `${percentage}%`;
  usersCountElement.textContent = `${userCount}`;
  fetchAndPopulateTable();
};

// Call the function to update the overview card when the page loads
document.addEventListener("DOMContentLoaded", updateOverviewCard);

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

// Helper function to calculate percentage
function calculatePercentage(count) {
  // Replace this with your percentage calculation logic
  return count * 0.001 + "%";
}

// Call the functions to update the overview cards
updateCommentOverview();

// Function to count Total subscribers and update the overview card
function updateSubscriberOverview() {
  // Retrieve existing blogs from local storage
  let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

  // Calculate the percentage and count
  const blogPercentage = calculatePercentage(blogs.length);
  const blogCount = blogs.length;

  // Update the elements in the overview card
  document.querySelector(".blogPercentage").innerText = blogPercentage + "";
  document.querySelector(".blogIncrease").innerText = "From Last Week";
  document.querySelector(".blogCount").innerText = blogCount;
  fetchAndPopulateTable();
}

// Helper function to calculate percentage
function calculatePercentage(count) {
  // Replace this with your percentage calculation logic
  return count * 0.001 + "%";
}

// Call the functions to update the overview cards
updateCommentOverview();
updateBlogOverview();

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

// Helper function to calculate percentage
function calculatePercentage(count) {
  // Replace this with your percentage calculation logic
  return count; // Change this logic based on your requirements
}

updateSubscriberOverview();
