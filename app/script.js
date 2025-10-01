// Menu Toggle
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

// Mobile Menu Toggle
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// Scroll Active Link
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
            });
            let activeLink = document.querySelector('header nav a[href*=' + id + ']');
            if(activeLink) {
                activeLink.classList.add('active');
            }
        }
    });

    // Close mobile menu on scroll
    if(navbar.classList.contains('active')) {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    }
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if(navbar.classList.contains('active')) {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        }
    });
});

// Initialize EmailJS
emailjs.init("ZZlw1VUIyqwMyEb1R");

// Form Validation
function validateForm() {
    const fullName = document.getElementById("full-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!fullName || !email || !phone || !subject || !message) {
        Swal.fire({
            icon: "warning",
            title: "Missing Information",
            text: "Please fill in all fields.",
            confirmButtonColor: "#00ffee"
        });
        return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Email",
            text: "Please enter a valid email address.",
            confirmButtonColor: "#00ffee"
        });
        return false;
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Phone",
            text: "Please enter a valid phone number (10-15 digits).",
            confirmButtonColor: "#00ffee"
        });
        return false;
    }

    return true;
}

// Contact Form Submission
document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validateForm()) return;

    // Show loading state
    Swal.fire({
        title: 'Sending...',
        text: 'Please wait while we send your message',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    // Collect form data
    const templateParams = {
        fullName: document.getElementById("full-name").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        subject: document.getElementById("subject").value.trim(),
        message: document.getElementById("message").value.trim(),
    };

    // Send email using EmailJS
    emailjs.send("service_q30nn9r", "template_f7pbrnv", templateParams)
        .then(function (response) {
            Swal.fire({
                icon: "success",
                title: "Message Sent!",
                text: "Thank you for reaching out! I'll get back to you soon.",
                confirmButtonColor: "#00ffee"
            });
            console.log("Success:", response.status, response.text);

            // Clear form fields
            document.getElementById("contact-form").reset();
        })
        .catch(function (error) {
            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Failed to send the message. Please try again or contact me directly.",
                confirmButtonColor: "#00ffee"
            });
            console.error("Error:", error);
        });
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll reveal animation observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Logo hover effect
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('mouseenter', function() {
        this.classList.add('logo-hover');
    });
    logo.addEventListener('mouseleave', function() {
        this.classList.remove('logo-hover');
    });
}

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}