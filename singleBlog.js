let openHam = document.querySelector("#openHam");
let closeHam = document.querySelector("#closeHam");
let navigationItems = document.querySelector("#navigation-items");

const hamburgerEvent = (navigation, close, open) => {
  navigationItems.style.display = navigation;
  closeHam.style.display = close;
  openHam.style.display = open;
};

openHam.addEventListener("click", () =>
  hamburgerEvent("flex", "block", "none")
);
closeHam.addEventListener("click", () =>
  hamburgerEvent("none", "none", "block")
);

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function formatDoc(cmd, value = null) {
  if (value) {
    document.execCommand(cmd, false, value);
  } else {
    document.execCommand(cmd);
  }
}

function addLink() {
  const url = prompt("Insert url");
  formatDoc("createLink", url);
}

const content = document.getElementById("content");

content.addEventListener("mouseenter", function () {
  const a = content.querySelectorAll("a");
  a.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      content.setAttribute("contenteditable", false);
      item.target = "_blank";
    });
    item.addEventListener("mouseleave", function () {
      content.setAttribute("contenteditable", true);
    });
  });
});

const showCode = document.getElementById("show-code");
let active = false;

showCode.addEventListener("click", function () {
  showCode.dataset.active = !active;
  active = !active;
  if (active) {
    content.textContent = content.innerHTML;
    content.setAttribute("contenteditable", false);
  } else {
    content.innerHTML = content.textContent;
    content.setAttribute("contenteditable", true);
  }
});

const filename = document.getElementById("filename");

function fileHandle(value) {
  if (value === "new") {
    content.innerHTML = "";
    filename.value = "untitled";
  } else if (value === "txt") {
    const blob = new Blob([content.innerText]);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename.value}.txt`;
    link.click();
  } else if (value === "pdf") {
    html2pdf(content).save(filename.value);
  }
}

// fetching Single blogs and all blogs

document.addEventListener("DOMContentLoaded", function () {
  const blogId = getQueryParam("id");
  if (blogId !== null) {
    renderSingleBlog(blogId);
    fetchAndRenderAllBlogs();
  }
});

function renderSingleBlog(blogId) {
  fetch(`http://localhost:3000/api/blog/getone-blog/${blogId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const formattedDate = new Date(data.data.blogDate)
        .toISOString()
        .split("T")[0];

      const singleBlogSection = document.querySelector(".singleblogOne");
      singleBlogSection.innerHTML = `
           <img src="${data.data.blogImage}" alt="">
           <div class="businessbetween">
               <p>${data.data.blogTitle}</p>
               <p>${formattedDate}</p>
           </div>
           <p>${data.data.blogDescription}</p>
       `;
    })
    .catch((error) => {
      console.error("Error:", error.message);
      alert("Failed to fetch blog. Please try again later.");
    });
}

function fetchAndRenderAllBlogs() {
  fetch("http://localhost:3000/api/blog/getall-blog")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      renderAllOtherBlogs(data.data);
    })
    .catch((error) => {
      console.error("Error:", error.message);
      alert("Failed to fetch blogs. Please try again later.");
    });
}

function renderAllOtherBlogs(blogs) {
  const allBlogsSection = document.querySelector(".AllBlogs");
  blogs.forEach((blog) => {
    const blogDiv = document.createElement("div");
    blogDiv.classList.add("blogDescription");
    const formattedDate = new Date(blog.blogDate).toISOString().split("T")[0];

    blogDiv.innerHTML = `
             <img src="${blog.blogImage}" alt="">
             <div class="busInfo">
                 <p>${blog.blogTitle}</p>
                 <p>${formattedDate}</p>
                 <button class="more" onclick="redirectToSingleBlog('${blog._id}')">Read More</button>
             </div>
             <p>${blog.blogDescription}</p>
         `;
    allBlogsSection.appendChild(blogDiv);
  });
}

function redirectToSingleBlog(blogId) {
  window.location.href = `singleBlog.html?id=${blogId}`;
}

function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function addComment(event) {
  event.preventDefault();

  const email = document.querySelector('input[name="email"]').value.trim();
  const subject = document.querySelector('input[name="subject"]').value.trim();
  const comment = document.getElementById("content").innerHTML.trim();

  const isValid = validateComment(email, subject, comment);

  if (isValid) {
    const commentData = {
      email,
      subject,
      comment,
      seen: false, // Set the initial value to false
    };

    // Use the blogId obtained from the URL
    const blogId = getQueryParam("id");
    commentData.blogId = blogId;

    // Call the function to save the comment
    saveComment(commentData);

    // Close the comment form
    closeForm();
  }
}

function validateComment(email, subject, comment) {
  // Perform validation and display any error messages if needed
  // Return true if the data is valid, false otherwise

  return true; // Change this based on your validation logic
}

function saveComment(commentData) {
  // Retrieve existing comments from local storage
  let comments = JSON.parse(localStorage.getItem("UserComments")) || [];

  // Generate a unique commentId
  commentData.commentId =
    comments.length > 0
      ? Math.max(...comments.map((comment) => comment.commentId)) + 1
      : 1;

  // Add the new comment to the array
  comments.push(commentData);

  // Save the updated comments array to local storage
  localStorage.setItem("UserComments", JSON.stringify(comments));

  // Display a success message or perform any additional actions
  alert("Comment posted successfully!");
}
