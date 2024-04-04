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
  let token = localStorage.getItem("token");
  if (!token) {
    // Handle case where token is missing
    console.error("Token is missing");
    return;
  }

  fetch("http://localhost:3000/api/comlike/comments/", {
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const comments = data.comments;
      const tableBody = document.querySelector(".tbl tbody");
      tableBody.innerHTML = "";

      comments.forEach((blog, index) => {
        blog.comments.forEach((comment) => {
          const row = tableBody.insertRow();
          row.innerHTML = `
            <td data-table="Blog Id">${index + 1}</td>
            <td data-table="Subject">${comment.blogSubject}</td>
            <td data-table="Comment Description">${comment.comment}</td>
            <td>
              <button class="btn_trash" data-blog-id="${
                blog._id
              }" data-comment-id="${
            comment._id
          }" onclick="deleteComment(event)">Delete</button>
            </td>
          `;
        });
      });
    })
    .catch((error) => {
      console.error("Error:", error.message);
      alert("Failed to fetch comments. Please try again later.");
    });
}

function deleteComment(event) {
  const button = event.target;
  const blogId = button.getAttribute("data-blog-id");
  const commentId = button.getAttribute("data-comment-id");

  fetch(`http://localhost:3000/api/comlike/comments/${blogId}/${commentId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const row = button.closest("tr");
      row.remove();
      alert("Comment deleted successfully!");
    })
    .catch((error) => {
      console.error("Error:", error.message);
      alert("Failed to delete comment. Please try again later.");
    });
}

document.addEventListener("DOMContentLoaded", fetchAndPopulateCommentsTable);
