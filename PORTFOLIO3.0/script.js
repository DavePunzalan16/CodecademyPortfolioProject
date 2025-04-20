// DOM Elements
const preloader = document.querySelector(".preloader");
const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");
const header = document.querySelector("header");
const backToTop = document.querySelector(".back-to-top");
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links li a");
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const sections = document.querySelectorAll("section");
const contactForm = document.getElementById("contactForm");

// Preloader
window.addEventListener("load", () => {
    setTimeout(() => {
        preloader.classList.add("hide");
        // Start animations after preloader is hidden
        document.body.classList.add("loaded");
    }, 500);
});

// Custom Cursor
document.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;
    cursor.style.left = `${clientX}px`;
    cursor.style.top = `${clientY}px`;
    
    // Delay follower for smooth effect
    setTimeout(() => {
        cursorFollower.style.left = `${clientX}px`;
        cursorFollower.style.top = `${clientY}px`;
    }, 80);
});

// Cursor effects on hover
document.addEventListener("DOMContentLoaded", () => {
    const hoverElements = document.querySelectorAll("a, button, .project-card, .skill-card, .education-card");
    
    hoverElements.forEach(element => {
        element.addEventListener("mouseenter", () => {
            cursor.style.width = "20px";
            cursor.style.height = "20px";
            cursor.style.opacity = "0.5";
            cursorFollower.style.width = "40px";
            cursorFollower.style.height = "40px";
        });
        
        element.addEventListener("mouseleave", () => {
            cursor.style.width = "10px";
            cursor.style.height = "10px";
            cursor.style.opacity = "0.7";
            cursorFollower.style.width = "30px";
            cursorFollower.style.height = "30px";
        });
    });
});

// Hide cursor when leaving window
document.addEventListener("mouseout", () => {
    cursor.style.opacity = "0";
    cursorFollower.style.opacity = "0";
});

// Show cursor when entering window
document.addEventListener("mouseover", () => {
    cursor.style.opacity = "0.7";
    cursorFollower.style.opacity = "0.5";
});

// Sticky Header
window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 100) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
    
    // Back to top button
    if (scrollPosition > 500) {
        backToTop.classList.add("active");
    } else {
        backToTop.classList.remove("active");
    }
    
    // Active navigation based on scroll position
    let current = "";
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove("active");
        if (item.getAttribute("href") === `#${current}`) {
            item.classList.add("active");
        }
    });
});

// Mobile Menu Toggle
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
});

// Close mobile menu when clicking on links
navItems.forEach(item => {
    item.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
    });
});

// Back to top button functionality
backToTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Project Filtering
filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove("active"));
        
        // Add active class to clicked button
        btn.classList.add("active");
        
        const filter = btn.getAttribute("data-filter");
        
        projectCards.forEach(card => {
            const category = card.getAttribute("data-category");
            
            if (filter === "all" || filter === category) {
                card.style.display = "block";
                setTimeout(() => {
                    card.style.opacity = "1";
                    card.style.transform = "scale(1)";
                }, 200);
            } else {
                card.style.opacity = "0";
                card.style.transform = "scale(0.8)";
                setTimeout(() => {
                    card.style.display = "none";
                }, 500);
            }
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Skill progress animation on scroll
const skillSections = document.querySelector('.skills');
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkills() {
    if (!skillSections) return;
    
    const sectionPos = skillSections.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;
    
    if (sectionPos < screenPos) {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('style').split(':')[1];
            bar.style.width = width;
        });
    }
}

window.addEventListener('scroll', animateSkills);

// Form Submission with validation
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.elements.name.value;
        const email = contactForm.elements.email.value;
        const subject = contactForm.elements.subject.value;
        const message = contactForm.elements.message.value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showFormAlert("Please fill all fields", "error");
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormAlert("Please enter a valid email", "error");
            return;
        }
        
        // If validation passes, you would normally send the data to a server
        // For now, we'll just show a success message
        showFormAlert("Message sent successfully!", "success");
        contactForm.reset();
    });
}

// Helper function to validate email
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Helper function to show form alerts
function showFormAlert(message, type) {
    const alertDiv = document.createElement("div");
    alertDiv.className = `form-alert ${type}`;
    alertDiv.innerText = message;
    
    contactForm.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Animation on scroll
function animateOnScroll() {
    const elementsToAnimate = document.querySelectorAll('.project-card, .skill-card, .timeline-content, .education-card');
    
    elementsToAnimate.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);

// Glitch effect for hero text
function randomGlitch() {
    const glitchElement = document.querySelector('.glitch');
    if (!glitchElement) return;
    
    setInterval(() => {
        glitchElement.classList.add('active-glitch');
        
        setTimeout(() => {
            glitchElement.classList.remove('active-glitch');
        }, 200);
    }, 3000);
}

randomGlitch();

// Type writer effect for multiple elements
function typeWriter() {
    const elements = document.querySelectorAll('.typewriter');
    
    elements.forEach(element => {
        const text = element.dataset.text;
        const speed = 100;
        let i = 0;
        
        function typing() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            }
        }
        
        typing();
    });
}

// Add CSS class for animations after page load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.body.classList.add('content-loaded');
        typeWriter();
    }, 1000);
    
    // Initialize animations on scroll
    animateOnScroll();
    animateSkills();
});