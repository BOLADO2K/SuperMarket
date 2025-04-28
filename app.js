// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Product filter
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        productCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Testimonial slider
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.testimonial-dot');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentSlide = 0;

function showSlide(n) {
    // Hide all slides
    testimonialSlides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Calculate new slide index
    currentSlide = (n + testimonialSlides.length) % testimonialSlides.length;
    
    // Show current slide
    testimonialSlides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Next/previous controls
nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

// Dot controls
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto slide change every 5 seconds
setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add to cart animation
const addToCartBtns = document.querySelectorAll('.add-to-cart');
const cartCount = document.querySelector('.cart-count');
let count = parseInt(cartCount.textContent);

addToCartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        count++;
        cartCount.textContent = count;
        
        // Create flying item effect
        const flyingItem = document.createElement('div');
        flyingItem.className = 'flying-item';
        flyingItem.innerHTML = '<i class="fas fa-shopping-basket"></i>';
        
        const rect = btn.getBoundingClientRect();
        flyingItem.style.left = rect.left + 'px';
        flyingItem.style.top = rect.top + 'px';
        
        document.body.appendChild(flyingItem);
        
        const cartRect = document.querySelector('.cart-icon').getBoundingClientRect();
        
        const animation = flyingItem.animate([
            { 
                left: rect.left + 'px',
                top: rect.top + 'px',
                opacity: 1,
                transform: 'scale(1)'
            },
            { 
                left: cartRect.left + 'px',
                top: cartRect.top + 'px',
                opacity: 0,
                transform: 'scale(0.5)'
            }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        });
        
        animation.onfinish = () => {
            flyingItem.remove();
        };
    });
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    
    // Simple validation
    if (emailInput.value && emailInput.value.includes('@')) {
        alert('Obrigado por assinar nossa newsletter! Em breve você receberá nossas ofertas.');
        emailInput.value = '';
    } else {
        alert('Por favor, insira um e-mail válido.');
    }
});