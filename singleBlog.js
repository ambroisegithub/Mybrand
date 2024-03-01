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
    renderAllOtherBlogs(blogId);
  }
});

function renderSingleBlog(blogId) {
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  const singleBlogSection = document.querySelector(".singleblogOne");

  const blog = blogs[blogId];
  singleBlogSection.innerHTML = `
      <img src="${blog.image}" alt="">
      <div class="businessbetween">
          <h1>${blog.title}</h1>
          <p>${blog.date}</p>
      </div>
      <p>${blog.description}</p>
  `;
}

function renderAllOtherBlogs(excludeBlogId) {
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  const allBlogsSection = document.querySelector(".AllBlogs");

  blogs.forEach((blog, index) => {
    if (index !== excludeBlogId) {
      const blogDiv = document.createElement("div");
      blogDiv.classList.add("blogDescription");

      blogDiv.innerHTML = `
              <img src="${blog.image}" alt="">
              <div class="busInfo">
                  <h1>${blog.title}</h1>
                  <p>${blog.date}</p>
                  <button class="more" onclick="redirectToSingleBlog(${index})">Read More</button>
              </div>
              <p>${blog.description}</p>
          `;

      allBlogsSection.appendChild(blogDiv);
    }
  });
}

function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function redirectToSingleBlog(blogId) {
  window.location.href = `singleBlog.html?id=${blogId}`;
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

  return true;  // Change this based on your validation logic
}

function saveComment(commentData) {
  // Retrieve existing comments from local storage
  let comments = JSON.parse(localStorage.getItem("UserComments")) || [];

  // Generate a unique commentId
  commentData.commentId = comments.length > 0 ? Math.max(...comments.map(comment => comment.commentId)) + 1 : 1;

  // Add the new comment to the array
  comments.push(commentData);

  // Save the updated comments array to local storage
  localStorage.setItem("UserComments", JSON.stringify(comments));

  // Display a success message or perform any additional actions
  alert("Comment posted successfully!");
}
