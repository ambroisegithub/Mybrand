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

// document.addEventListener("DOMContentLoaded", fetchAndPopulateTable);

function openBlogModal() {
  const modalContainer = document.getElementById("blogModalContainer");
  modalContainer.style.display = "flex";

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
document.getElementById("openBlogModal");
// .addEventListener("click", openBlogModal);

// Add event listener to post blog button
document.getElementById("postBlogButton");
// .addEventListener("click", handlePostBlogClick);

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

// Function to fetch all blogs from the server
function fetchAndPopulateTable() {
  fetch("http://localhost:3000/api/blog/getall-blog")
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
      alert("Failed to fetch blogs. Please try again later.");
    });
}

// Function to populate the table with blog data
function populateTable(blogs) {
  const tbody = document.querySelector(".tbl tbody");

  tbody.innerHTML = ""; // Clear existing table data

  blogs.forEach((blog, index) => {
    const row = document.createElement("tr");
    const formattedDate = new Date(blog.blogDate).toISOString().split("T")[0];
    row.innerHTML = `
      <td data-table="Blog Id">${index + 1}</td>
      <td data-table="Image"><img src="${blog.blogImage}" alt="blog Image"></td>
      <td data-table="Blog Title">${blog.blogTitle}</td>
      <td data-table="Description">${blog.blogDescription}</td>
      <td data-table="Date Created">${formattedDate}</td>
      <td>
        <button class="btn_edit" data-table="Edit">Edit</button>
        <button class="btn_trash" data-table="Delete" data-blog-id="${
          blog._id
        }">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  // Add event listeners to delete buttons
  const deleteButtons = document.querySelectorAll(".btn_trash");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", handleDeleteBlog);
  });
}

// Function to handle delete blog button click
function handleDeleteBlog(event) {
  const blogId = event.target.dataset.blogId;
  if (confirm("Are you sure you want to delete this blog?")) {
    deleteBlog(blogId);
  }
}

// Function to delete a blog
function deleteBlog(blogId) {
  const token = localStorage.getItem("token");
  fetch(`http://localhost:3000/api/blog/delete-blog/${blogId}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        alert("Blog Deleted Successfully!!!");
      }
    })
    .then((data) => {
      // Blog deleted successfully, update UI
      fetchAndPopulateTable();
    });
}

// Call fetchAndPopulateTable on DOMContentLoaded event
document.addEventListener("DOMContentLoaded", fetchAndPopulateTable);
