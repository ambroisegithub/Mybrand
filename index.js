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

  // Get the subscription email input element
  const subscriptionEmailInput = document.getElementById("subscriptionEmail");

  // Add an input event listener to clear the subscription error when typing starts
  subscriptionEmailInput.addEventListener("input", () =>
    clearError("subscriptionError")
  );
});

function renderBlogs() {
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  const blogSectionMain = document.querySelector(".blogSectionmain");

  blogs.forEach((blog, index) => {
    const blogDiv = document.createElement("div");
    blogDiv.classList.add("blogSection");
    blogDiv.dataset.blogId = index;

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
      window.location.href = `singleBlog.html?id=${index}`;
    });
  });
}

// document.addEventListener("DOMContentLoaded", function () {
//   renderContacts();

// });
// contactus.js

function contactValidation() {
  const fullName = document.getElementById("fullName");
  const emailAdress = document.getElementById("emailAdress");
  const phoneNumber = document.getElementById("phoneNumber");
  const subject = document.getElementById("subject");
  const message = document.getElementById("message");

  const errors = [];

  if (!fullName || fullName.value.trim() === "") {
    errors.push("Full Name is Required");
  }
  if (!emailAdress || emailAdress.value.trim() === "") {
    errors.push("Email Address is Required");
  }
  if (!phoneNumber || phoneNumber.value.trim() === "") {
    errors.push("Phone Number is Required");
  }
  if (!subject || subject.value.trim() === "") {
    errors.push("Subject is Required");
  }
  if (!message || message.value.trim() === "") {
    errors.push("Message is Required");
  }

  document.getElementById("fullnameError").textContent = errors.includes(
    "Full Name is Required"
  )
    ? "Full Name is Required"
    : "";

  document.getElementById("emailadressError").textContent = errors.includes(
    "Email Address is Required"
  )
    ? "Email Address is Required"
    : "";

  document.getElementById("phonenumberError").textContent = errors.includes(
    "Phone Number is Required"
  )
    ? "Phone Number is Required"
    : "";

  document.getElementById("subjectError").textContent = errors.includes(
    "Subject is Required"
  )
    ? "Subject is Required"
    : "";
  document.getElementById("messageError").textContent = errors.includes(
    "Message is Required"
  )
    ? "Message is Required"
    : "";

  // Check if there are any validation errors and return if true
  if (errors.length > 0) {
    return;
  }

  // Call the correct function to store contact data
  storeContactUs(
    fullName.value,
    phoneNumber.value,
    emailAdress.value,
    subject.value,
    message.value
  );
}

// Function to store contact data in local storage
function storeContactUs(fullName, phoneNumber, emailAdress, subject, message) {
  const contactData = {
    fullName: fullName,
    phoneNumber: phoneNumber,
    emailAdress: emailAdress,
    subject: subject,
    message: message,
  };

  let existingContacts = JSON.parse(localStorage.getItem("contacts")) || [];

  // Check for duplicates based on your conditions
  const isDuplicate = existingContacts.some(
    (contact) =>
      contact.fullName === fullName &&
      contact.emailAdress === emailAdress &&
      contact.phoneNumber === phoneNumber &&
      contact.subject === subject &&
      contact.message === message
  );

  // Only add new contact if it doesn't already exist
  if (!isDuplicate) {
    existingContacts.push(contactData);

    // Store the updated contacts back in local storage
    localStorage.setItem("contacts", JSON.stringify(existingContacts));
  }
}
fullName.addEventListener("input", () => clearError("fullnameError"));
phoneNumber.addEventListener("input", () => clearError("phonenumberError"));
emailAdress.addEventListener("input", () => clearError("emailadressError"));
subject.addEventListener("input", () => clearError("subjectError"));
message.addEventListener("input", () => clearError("messageError"));

function clearError(errorId) {
  document.getElementById(errorId).textContent = "";
}

// document.addEventListener("DOMContentLoaded", function () {
//   renderBlogs();
//   attachClickEventToButtons();
// });

document.addEventListener("DOMContentLoaded", function () {
  // renderBlogs();
  attachClickEventToButtons();

  // Get the subscription email input element
  const subscriptionEmailInput = document.getElementById("subscriptionEmail");

  // Add an input event listener to clear the subscription error when typing starts
  subscriptionEmailInput.addEventListener("input", () =>
    clearError("subscriptionError")
  );
});


function subscribeToNewsletter() {
  const emailInput = document.getElementById("subscriptionEmail");
  const subscriptionError = document.getElementById("subscriptionError");

  const email = emailInput.value.trim();

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    if (subscriptionError) subscriptionError.textContent = "Invalid email format";
    return;
  }

  // Call the function to subscribe (you can implement this function as needed)
  subscribe(email);

  // Clear input and errors after a successful subscription
  if (emailInput) emailInput.value = "";
  if (subscriptionError) subscriptionError.textContent = "";
}

function subscribe(email) {
  const subscriptions = JSON.parse(localStorage.getItem("subscriptions")) || [];

  // Check for duplicates based on your conditions
  const isDuplicate = subscriptions.some((subscriber) => subscriber.email === email);

  // Only add new subscription if it doesn't already exist
  if (!isDuplicate) {
    const newSubscriber = { email: email, /* Add any additional information here */ };

    subscriptions.push(newSubscriber);

    // Store the updated subscriptions back in local storage
    localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
    alert("Thank you for subscribing to the newsletter!");
  }
}

function clearError(errorId) {
  document.getElementById(errorId).textContent = "";
}
