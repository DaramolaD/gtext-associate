// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Header Scroll Effect
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// Countdown Timer
function updateCountdown() {
    const targetDate = new Date('May 18, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    const timeRemaining = targetDate - now;
    
    if (timeRemaining > 0) {
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        
        document.getElementById('countdown-days').textContent = days.toString().padStart(2, '0');
        document.getElementById('countdown-hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('countdown-minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('countdown-seconds').textContent = seconds.toString().padStart(2, '0');
    } else {
        document.getElementById('countdown-days').textContent = '00';
        document.getElementById('countdown-hours').textContent = '00';
        document.getElementById('countdown-minutes').textContent = '00';
        document.getElementById('countdown-seconds').textContent = '00';
    }
}

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);

// Schedule Tabs
const scheduleTabs = document.querySelectorAll('.schedule-tab');
const scheduleDays = document.querySelectorAll('.schedule-day');

scheduleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        scheduleTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Hide all schedule days
        scheduleDays.forEach(day => day.classList.remove('active'));
        
        // Show the selected day
        const dayId = tab.getAttribute('data-day');
        document.getElementById(dayId).classList.add('active');
    });
});

// Testimonial Slider
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
const testimonialPrev = document.querySelector('.testimonial-prev');
const testimonialNext = document.querySelector('.testimonial-next');
let currentSlide = 0;

function showSlide(index) {
    // Hide all slides
    testimonialSlides.forEach(slide => slide.classList.remove('active'));
    
    // Remove active class from all dots
    testimonialDots.forEach(dot => dot.classList.remove('active'));
    
    // Show the selected slide
    testimonialSlides[index].classList.add('active');
    
    // Add active class to the corresponding dot
    testimonialDots[index].classList.add('active');
    
    currentSlide = index;
}

// Add click event to dots
testimonialDots.forEach(dot => {
    dot.addEventListener('click', () => {
        const slideIndex = parseInt(dot.getAttribute('data-slide'));
        showSlide(slideIndex);
    });
});

// Add click events to arrows
testimonialPrev.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
    showSlide(currentSlide);
});

testimonialNext.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(currentSlide);
});

// Auto-advance slides every 5 seconds
setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(currentSlide);
}, 5000);

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Toggle active class on the clicked item
        item.classList.toggle('active');
        
        // Optional: Close other items when one is opened
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
    });
});

// Form Submission
const registrationForm = document.getElementById('registration-form');

registrationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const experience = document.getElementById('experience').value;
    const goals = document.getElementById('goals').value;
    
    // Here you would typically send this data to your server
    // For this example, we'll just show a success message
    
    // Create success message
    const formContainer = registrationForm.parentElement;
    formContainer.innerHTML = `
        <div class="text-center">
            <div style="font-size: 4rem; color: var(--secondary); margin-bottom: 20px;">🎉</div>
            <h3 style="color: var(--primary); font-size: 1.8rem; margin-bottom: 20px;">Congratulations, ${name}!</h3>
            <p class="mb-2">Your spot in the 21-Day High Ticket Real Estate Sales Challenge has been secured.</p>
            <p class="mb-4">We've sent a confirmation email to <strong>${email}</strong> with all the details you need to prepare for this transformative experience.</p>
            <div style="padding: 20px; background-color: rgba(166, 124, 82, 0.1); border-radius: 10px; margin-bottom: 30px;">
                <p style="font-weight: 600; color: var(--primary);">Mark your calendar for May 18th, 2025!</p>
                <p>We'll send you reminder emails with preparation materials as we get closer to the start date.</p>
            </div>
            <a href="#" class="btn btn-secondary">Return to Homepage</a>
        </div>
    `;
    
    // Scroll to the success message
    formContainer.scrollIntoView({ behavior: 'smooth' });
});

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.about-card, .speaker-card, .schedule-item, .benefit-item');

function checkReveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial styles
revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Check on load and scroll
window.addEventListener('load', checkReveal);
window.addEventListener('scroll', checkReveal);
