// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li a');
const header = document.querySelector('header');
const sections = document.querySelectorAll('section');
const contactForm = document.getElementById('contactForm');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Scroll to section when nav link is clicked
navLinksItems.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Active link highlighting on scroll
window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (window.scrollY > 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Highlight active navigation link based on scroll position
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Form validation
    if (!name || !email || !subject || !message) {
        showAlert('Please fill in all fields', 'danger');
        return;
    }
    
    // Email validation
    if (!isValidEmail(email)) {
        showAlert('Please enter a valid email address', 'danger');
        return;
    }
    
    // Here you would normally send the form data to a server
    // For demonstration purposes, we'll just show a success message
    
    // Clear the form
    contactForm.reset();
    
    // Show success message
    showAlert('Your message has been sent. Thank you!', 'success');
});

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to show alerts
function showAlert(message, type) {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${type}`;
    alertDiv.innerText = message;
    
    // Insert alert before the form
    contactForm.parentElement.insertBefore(alertDiv, contactForm);
    
    // Remove alert after 3 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Animation on scroll
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.skill-item, .cert-card, .about-text, .contact-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
});

// Add animation class for initial elements in viewport
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS for animations
    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
        .skill-item, .cert-card, .about-text, .contact-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .alert {
            padding: 10px 15px;
            margin-bottom: 20px;
            border-radius: 4px;
            font-weight: 500;
        }
        
        .danger {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        
        .success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        header.scrolled {
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .hamburger.active .line:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active .line:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active .line:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
    `;
    document.head.appendChild(styleSheet);
    
    // Trigger scroll event to animate initial elements
    window.dispatchEvent(new Event('scroll'));
    
    // Add download functionality for resume
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('This would download your resume as a PDF in a real implementation');
        });
    }
});