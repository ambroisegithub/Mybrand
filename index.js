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

// function formatDoc(cmd, value = null) {
//   if (value) {
//     document.execCommand(cmd, false, value);
//   } else {
//     document.execCommand(cmd);
//   }
// }

// function addLink() {
//   const url = prompt("Insert url");
//   formatDoc("createLink", url);
// }

// const content = document.getElementById("content");

// content.addEventListener("mouseenter", function () {
//   const a = content.querySelectorAll("a");
//   a.forEach((item) => {
//     item.addEventListener("mouseenter", function () {
//       content.setAttribute("contenteditable", false);
//       item.target = "_blank";
//     });
//     item.addEventListener("mouseleave", function () {
//       content.setAttribute("contenteditable", true);
//     });
//   });
// });

// const showCode = document.getElementById("show-code");
// let active = false;

// showCode.addEventListener("click", function () {
//   showCode.dataset.active = !active;
//   active = !active;
//   if (active) {
//     content.textContent = content.innerHTML;
//     content.setAttribute("contenteditable", false);
//   } else {
//     content.innerHTML = content.textContent;
//     content.setAttribute("contenteditable", true);
//   }
// });

// const filename = document.getElementById("filename");

// function fileHandle(value) {
//   if (value === "new") {
//     content.innerHTML = "";
//     filename.value = "untitled";
//   } else if (value === "txt") {
//     const blob = new Blob([content.innerText]);
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `${filename.value}.txt`;
//     link.click();
//   } else if (value === "pdf") {
//     html2pdf(content).save(filename.value);
//   }
// }

// document.getElementById("singleBlogs").addEventListener("click", function () {
//   window.location.href = "singleBlog.html";
// });

// document.getElementById("goToSignup").addEventListener("click", function () {
// 	window.location.href = "register.html";
//   });

document.addEventListener("DOMContentLoaded", function () {
  renderBlogs();
  attachClickEventToButtons();
});

function renderBlogs() {
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  const blogSectionMain = document.querySelector(".blogSectionmain");

  blogs.forEach((blog, index) => {
      const blogDiv = document.createElement("div");
      blogDiv.classList.add("blogSection");
      blogDiv.dataset.blogId = index; // Set a data attribute to store the blog id

      blogDiv.innerHTML = `
      <div class="blogpartOne">
        <img src="${blog.image}" alt="">
      </div>
      <div class="blogpartTwo">
        <p class="blogP">
          <span class="businessspanone">${blog.title}</span>
          <span class="businessspantwo">${blog.date}</span>
        </p>
        <p class="waitUntill">
          <p class="until">${blog.description}</p>
        </p>
      </div>
      <div class="blogpartThree">
        <div>
        <button class="singleBlogs" type="button">Read More >></button>
        </div>
      </div>
      `;

      blogSectionMain.appendChild(blogDiv);
  });
}

function attachClickEventToButtons() {
  const singleBlogButtons = document.querySelectorAll(".singleBlogs");

  singleBlogButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
          // Redirect to singleBlog.html with the blog id as a parameter
          window.location.href = `singleBlog.html?id=${index}`;
      });
  });
}