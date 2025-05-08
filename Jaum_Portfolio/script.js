// Theme Switcher
const toggleButton = document.getElementById("theme-toggle");
toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  toggleButton.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// Contact Form Validation
const form = document.getElementById("contact-form");
const formMsg = document.getElementById("form-msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    formMsg.textContent = "Please fill out all fields.";
    formMsg.style.color = "red";
    return;
  }

  // Simulate form submission
  formMsg.textContent = "Message sent successfully!";
  formMsg.style.color = "green";
  form.reset();
});




// script for the contact number

const contactInput = document.getElementById("contact");
const contactError = document.getElementById("contact-error");

let timeout = null;

contactInput.addEventListener("input", () => {
  const number = contactInput.value;

  /*

  //Auto-convert local PH numbers starting with 0 to +63
  if (number.startsWith("0") && number.length === 11)  {
    number = "+63" + number.slice(1);
  }
  
  */

  const apiKey = "310be36d83e94e2d8e18e7b3463c17af";        // API key is here  ! ! !
  const url = `https://phonevalidation.abstractapi.com/v1/?api_key=${apiKey}&phone=${encodeURIComponent(number)}`;
  // Delay API call until user pauses typing (debounce)
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    if (number.length < 11) {
      contactError.textContent = "";
      return;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.valid) {
          contactError.textContent = "✔ Valid number";
          contactError.style.color = "green";
        } else {
          contactError.textContent = "✘ Invalid number";
          contactError.style.color = "red";
        }
      })
      .catch((err) => {
        contactError.textContent = "Error checking number.";
        contactError.style.color = "red";
      });
  }, 600); // delay in milliseconds
});


//script for email verification
const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");
let emailTimeout = null;

emailInput.addEventListener("input", () => {
  const email = emailInput.value.trim();

  clearTimeout(emailTimeout);
  emailTimeout = setTimeout(() => {
    if (!email.includes("@") || email.length < 5) {
      emailError.textContent = "";
      return;
    }

    const apiKey = "7aa641276d0944429ab9d0227caa2483"; // Replace with your real API key
    const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${encodeURIComponent(email)}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.deliverability === "DELIVERABLE") {
          emailError.textContent = "✔ Valid email address";
          emailError.style.color = "green";
        } else {
          emailError.textContent = "✘ Invalid or undeliverable email";
          emailError.style.color = "red";
        }
      })
      .catch((err) => {
        emailError.textContent = "Error validating email.";
        emailError.style.color = "red";
      });
  }, 600);
});


document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById('imageOverlay');
  const overlayImage = document.getElementById('overlayImage');

  document.querySelectorAll('.click-to-enlarge').forEach(img => {
    img.addEventListener('click', () => {
      overlayImage.src = img.src;
      overlay.classList.add('active');
    });
  });

  overlay.addEventListener('click', () => {
    overlay.classList.remove('active');
    overlayImage.src = '';
  });
});
