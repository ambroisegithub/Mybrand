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

document.addEventListener("DOMContentLoaded", function () {
  // attachClickEventToButtons();

  // Get the subscription email input element
  const subscriptionEmailInput = document.getElementById("subscriptionEmail");

  // Add an input event listener to clear the subscription error when typing starts
  subscriptionEmailInput.addEventListener("input", () =>
    clearError("subscriptionError")
  );
});
document.addEventListener("DOMContentLoaded", function () {
  fetchAndRenderBlogs();
  // attachClickEventToButtons();

  // Get the subscription email input element
  const subscriptionEmailInput = document.getElementById("subscriptionEmail");

  // Add an input event listener to clear the subscription error when typing starts
  subscriptionEmailInput.addEventListener("input", () =>
    clearError("subscriptionError")
  );
});

document.addEventListener("DOMContentLoaded", function () {
  // fetchAndRenderBlogs();
  // attachClickEventToButtons();
});

function fetchAndRenderBlogs() {
  fetch("http://localhost:3000/api/blog/getall-blog")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      renderFetchedBlogs(data.data); // Assuming the response has a 'data' property containing the blog data
    })
    .catch((error) => {
      console.error("Error:", error.message);
      alert("Failed to fetch blogs. Please try again later.");
    });
}

function renderFetchedBlogs(blogs) {
  const fetchedBlogsContainer = document.querySelector(".fetchedBlogs");

  blogs.forEach((blog, index) => {
    const blogDiv = document.createElement("div");
    blogDiv.classList.add("blogSection");
    blogDiv.dataset.blogId = blog._id; // Use actual blog ID from the database

    const formattedDate = new Date(blog.blogDate).toISOString().split("T")[0];

    blogDiv.innerHTML = `
        <div class="blogpartOne">
            <img src="${blog.blogImage}" alt="">
        </div>
        <div class="blogpartTwo">
            <p class="blogP">
                <span class="businessspanone">${blog.blogTitle}</span>
                <span class="businessspantwo">${formattedDate}</span>
            </p>
            <p class="waitUntill">
                <p class="until">${blog.blogDescription}</p>
            </p>
        </div>
        <div class="blogpartThree">
            <div>
                <button class="singleBlogs" type="button" onclick="redirectToSingleBlog('${blog._id}')">Read More >></button>
            </div>
        </div>
    `;

    fetchedBlogsContainer.appendChild(blogDiv);
  });
}

function redirectToSingleBlog(blogId) {
  window.location.href = `singleBlog.html?id=${blogId}`;
}

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
  // attachClickEventToButtons();

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
    if (subscriptionError)
      subscriptionError.textContent = "Invalid email format";
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
  const isDuplicate = subscriptions.some(
    (subscriber) => subscriber.email === email
  );

  // Only add new subscription if it doesn't already exist
  if (!isDuplicate) {
    const newSubscriber = {
      email: email /* Add any additional information here */,
    };

    subscriptions.push(newSubscriber);

    // Store the updated subscriptions back in local storage
    localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
    alert("Thank you for subscribing to the newsletter!");
  }
}

function clearError(errorId) {
  document.getElementById(errorId).textContent = "";
}
