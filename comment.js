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
  fetchAndPopulateCommentsTable();
});

function fetchAndPopulateCommentsTable() {
  // Retrieve comment data from local storage
  const comments = JSON.parse(localStorage.getItem("UserComments")) || [];

  // Get the table body
  const tableBody = document.querySelector(".tbl tbody");

  // Clear existing rows in the table
  tableBody.innerHTML = "";

  // Iterate through comment data and append rows to the table
  comments.forEach((comment) => {
    const row = tableBody.insertRow();
    row.innerHTML = `
        <td data-table="Comment Id">${comment.commentId}</td>
        <td data-table="User Email">${comment.email}</td>
        <td data-table="Subject">${comment.subject}</td>
        <td data-table="Comment Description">${comment.comment}</td>
        <td>
          <button class="btn_mark" data-comment-id="${
            comment.commentId
          }" onclick="markAsSeen(${comment.commentId})">
            ${comment.seen ? "Seen" : "Mark as Seen"}
          </button>
          <button class="btn_trash" data-table="Delete" onclick="deleteComment(${
            comment.commentId
          })">Delete</button>
        </td>
      `;
  });
}

// Function to mark a comment as seen
function markAsSeen(commentId) {
  // Retrieve existing comments from local storage
  let comments = JSON.parse(localStorage.getItem("UserComments")) || [];

  // Find the comment with the specified commentId
  const commentToUpdate = comments.find(
    (comment) => comment.commentId === commentId
  );

  if (commentToUpdate) {
    // Check if the comment is already marked as seen
    if (!commentToUpdate.seen) {
      // Update the seen property to true
      commentToUpdate.seen = true;

      // Save the updated comments array to local storage
      localStorage.setItem("UserComments", JSON.stringify(comments));

      // Fetch and populate the comments table with the updated data
      fetchAndPopulateCommentsTable();

      alert(`Comment ${commentId} marked as seen`);
    } else {
      alert(`Comment ${commentId} is already marked as seen`);
    }
  } else {
    alert(`Comment ${commentId} not found`);
  }
}

function deleteComment(commentId) {
  // Retrieve existing comments from local storage
  let comments = JSON.parse(localStorage.getItem("UserComments")) || [];

  // Remove the comment with the specified commentId
  comments = comments.filter((comment) => comment.commentId !== commentId);

  // Save the updated comments array to local storage
  localStorage.setItem("UserComments", JSON.stringify(comments));

  // Fetch and populate the comments table with the updated data
  fetchAndPopulateCommentsTable();
}

document.addEventListener("DOMContentLoaded", fetchAndPopulateCommentsTable);
