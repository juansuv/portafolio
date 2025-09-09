// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

// Mobile Navigation Toggle
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
}

// Close mobile menu when clicking on a link
function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
}

// Smooth scroll to sections
function smoothScrollToSection(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (correspondingNavLink) {
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                correspondingNavLink.classList.add('active');
            }
        }
    });
}

// Navbar background on scroll and progress indicator
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
}

// Scroll progress indicator
function initializeScrollProgress() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    function updateScrollProgress() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = `${progress}%`;
    }
    
    window.addEventListener('scroll', updateScrollProgress);
}

// Generic component loader
async function loadComponent(componentName, placeholderId) {
    try {
        const response = await fetch(`components/${componentName}.html`);
        if (response.ok) {
            const componentHTML = await response.text();
            const placeholder = document.getElementById(placeholderId);
            if (placeholder) {
                placeholder.innerHTML = componentHTML;
                
                // Add entrance animation
                placeholder.style.opacity = '0';
                placeholder.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    placeholder.style.transition = 'all 0.6s ease-out';
                    placeholder.style.opacity = '1';
                    placeholder.style.transform = 'translateY(0)';
                }, 100);
                
                return true;
            }
        } else {
            console.warn(`Could not load ${componentName} component`);
        }
    } catch (error) {
        console.error(`Error loading ${componentName}:`, error);
    }
    return false;
}

// Load footer component
async function loadFooter() {
    const loaded = await loadComponent('footer', 'footer-placeholder');
    if (loaded) {
        // Initialize tooltips for social links after footer loads
        setTimeout(() => {
            initializeTooltips();
        }, 200);
    }
}

// Load services content for servicios.html
async function loadServicesContent() {
    const loaded = await loadComponent('servicios', 'services-content');
    if (loaded) {
        // Initialize scroll reveal for services content
        setTimeout(() => {
            initializeScrollReveal();
        }, 200);
    }
}

// Load thank you content for gracias.html  
async function loadThanksContent() {
    const loaded = await loadComponent('gracias', 'thanks-content');
    if (loaded) {
        // Initialize countdown after thank you page loads
        setTimeout(() => {
            initializeCountdown();
        }, 200);
    }
}

// Initialize countdown for thank you page
function initializeCountdown() {
    let countdown = 5;
    const countdownElement = document.getElementById('countdown');
    
    if (countdownElement) {
        const timer = setInterval(() => {
            countdown--;
            countdownElement.textContent = countdown;
            
            if (countdown <= 0) {
                clearInterval(timer);
                window.location.href = 'index.html';
            }
        }, 1000);
    }
}

// Enhanced form validation with real-time feedback
function validateForm(formData) {
    const errors = [];
    
    const name = formData.get('name')?.trim();
    const email = formData.get('email')?.trim();
    const subject = formData.get('subject')?.trim();
    const message = formData.get('message')?.trim();
    
    if (!name || name.length < 2) {
        errors.push('❌ El nombre debe tener al menos 2 caracteres');
    }
    
    if (!email || !isValidEmail(email)) {
        errors.push('❌ Por favor ingresa un email válido (ejemplo@dominio.com)');
    }
    
    if (!subject || subject.length < 3) {
        errors.push('❌ El asunto debe tener al menos 3 caracteres');
    }
    
    if (!message || message.length < 10) {
        errors.push('❌ El mensaje debe tener al menos 10 caracteres');
    }
    
    // Advanced validations
    if (name && name.length > 50) {
        errors.push('❌ El nombre no puede tener más de 50 caracteres');
    }
    
    if (subject && subject.length > 100) {
        errors.push('❌ El asunto no puede tener más de 100 caracteres');
    }
    
    if (message && message.length > 1000) {
        errors.push('❌ El mensaje no puede tener más de 1000 caracteres');
    }
    
    return errors;
}

// Real-time input validation
function initializeRealTimeValidation() {
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    
    formInputs.forEach(input => {
        // Add character counters for relevant fields
        if (input.name === 'subject' || input.name === 'message') {
            addCharacterCounter(input);
        }
        
        input.addEventListener('blur', () => validateSingleField(input));
        input.addEventListener('input', () => {
            clearFieldError(input);
            updateCharacterCounter(input);
        });
    });
}

function validateSingleField(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    switch (input.name) {
        case 'name':
            if (!value || value.length < 2) {
                errorMessage = 'Mínimo 2 caracteres';
                isValid = false;
            }
            break;
        case 'email':
            if (!value || !isValidEmail(value)) {
                errorMessage = 'Email inválido';
                isValid = false;
            }
            break;
        case 'subject':
            if (!value || value.length < 3) {
                errorMessage = 'Mínimo 3 caracteres';
                isValid = false;
            }
            break;
        case 'message':
            if (!value || value.length < 10) {
                errorMessage = 'Mínimo 10 caracteres';
                isValid = false;
            }
            break;
    }
    
    if (!isValid) {
        showFieldError(input, errorMessage);
    } else {
        clearFieldError(input);
    }
    
    return isValid;
}

function showFieldError(input, message) {
    clearFieldError(input);
    
    input.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    
    input.parentNode.appendChild(errorDiv);
}

function clearFieldError(input) {
    input.classList.remove('error');
    const existingError = input.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function addCharacterCounter(input) {
    const maxLength = input.name === 'subject' ? 100 : 1000;
    const counter = document.createElement('div');
    counter.className = 'character-counter';
    counter.textContent = `0 / ${maxLength}`;
    
    input.parentNode.appendChild(counter);
}

function updateCharacterCounter(input) {
    const counter = input.parentNode.querySelector('.character-counter');
    if (counter) {
        const length = input.value.length;
        const maxLength = input.name === 'subject' ? 100 : 1000;
        counter.textContent = `${length} / ${maxLength}`;
        
        if (length > maxLength * 0.9) {
            counter.style.color = 'var(--secondary)';
        } else if (length > maxLength) {
            counter.style.color = '#ef4444';
        } else {
            counter.style.color = 'var(--text-secondary)';
        }
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show form message
function showFormMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Insert message before form
    contactForm.parentNode.insertBefore(messageDiv, contactForm);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
    
    // Scroll to message
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Handle form submission
async function handleFormSubmission(event) {
    event.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
    // Validate form
    const errors = validateForm(formData);
    if (errors.length > 0) {
        showFormMessage(errors.join('<br>'), 'error');
        return;
    }
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitButton.disabled = true;
    
    try {
        // For testing purposes, we'll use mailto backup directly
        // You can uncomment the Formspree code once you've set up your account
        
         
        // Try to send form data to Formspree (uncomment when ready)
        const response = await fetch('https://formspree.io/f/mpwjbdjn', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            trackFormSubmission(formData);
            window.location.href = 'components/gracias.html';
            return;
        }
        
        
        // Use mailto backup (this will work immediately)
        await handleMailtoBackup(formData);
        
        // For immediate testing, also redirect to thank you page
        // (the mailto will handle email creation)
        setTimeout(() => {
            window.location.href = 'gracias.html';
        }, 2000);
        
    } catch (error) {
        // Fallback to mailto
        console.log('Using mailto backup:', error);
        await handleMailtoBackup(formData);
    } finally {
        // Reset button
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
    }
}

// Backup method using mailto
async function handleMailtoBackup(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject') || 'Mensaje desde el portafolio';
    const message = formData.get('message');
    
    const emailBody = `Hola Juan Diego,

Mi nombre es: ${name}
Email de contacto: ${email}

Mensaje:
${message}

---
Este mensaje fue enviado desde tu portafolio web.`;
    
    const mailtoLink = `mailto:juan.suva25@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Show success message first
    showFormMessage(
        'Se abrirá tu cliente de correo para enviar el mensaje. Si no se abre automáticamente, puedes escribir directamente a juan.suva25@gmail.com',
        'success'
    );
    
    // Track attempt
    trackFormSubmission(formData);
    
    // Reset form
    contactForm.reset();
    
    // Small delay then open mailto
    setTimeout(() => {
        window.location.href = mailtoLink;
        
        // Also redirect to thank you page after a few seconds
        setTimeout(() => {
            window.location.href = 'gracias.html';
        }, 3000);
    }, 1500);
}

// Helper function to track form submissions
function trackFormSubmission(formData) {
    // For analytics tracking (optional)
    console.log('Form submitted successfully:', Object.fromEntries(formData));
    
    // You can add Google Analytics or other tracking here
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
            event_category: 'Contact',
            event_label: 'Portfolio Contact Form'
        });
    }
}

// Enhanced scroll reveal system
function initializeScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .timeline-item, .skill-category, .service-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Add stagger delay for grouped elements
                const siblings = Array.from(entry.target.parentNode.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.1}s`;
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        // Add appropriate reveal class if not already present
        if (!element.classList.contains('reveal') && 
            !element.classList.contains('reveal-left') && 
            !element.classList.contains('reveal-right') && 
            !element.classList.contains('reveal-scale')) {
            element.classList.add('reveal');
        }
        observer.observe(element);
    });
}

// Get appropriate animation type based on element
function getAnimationType(element) {
    if (element.classList.contains('timeline-item')) {
        return 'fadeInLeft';
    } else if (element.classList.contains('service-card')) {
        return 'slideInFromBottom';
    } else if (element.classList.contains('pricing-card')) {
        return 'bounceIn';
    } else {
        return 'fadeInUp';
    }
}

// Add parallax effect to hero section
function initializeParallaxEffects() {
    const heroSection = document.querySelector('.hero');
    const profileImage = document.querySelector('.profile-image');
    
    if (!heroSection) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.2;
        
        if (profileImage) {
            profileImage.style.transform = `translateY(${rate}px) scale(1)`;
        }
        
        // Add subtle parallax to hero stats
        const heroStats = document.querySelector('.hero-stats');
        if (heroStats) {
            heroStats.style.transform = `translateY(${rate * 0.5}px)`;
        }
    });
}

// Add magnetic effect to buttons
function initializeMagneticButtons() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.02)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0) scale(1)';
        });
    });
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/\D/g, ''));
                const suffix = counter.textContent.replace(/\d/g, '');
                
                animateCounter(counter, 0, target, 2000, suffix);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// Counter animation function
function animateCounter(element, start, end, duration, suffix) {
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * easeOutCubic);
        
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = end + suffix;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Initialize typing animation for hero text
function initializeTypingAnimation() {
    const roleElement = document.querySelector('.hero-title .role');
    if (!roleElement) return;
    
    const roles = [
        'Software Engineer Fullstack',
        'Python Developer',
        'Ruby Developer',
        'Cloud Architect',
        'AI/ML Engineer'
    ];
    
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    
    function typeRole() {
        const currentRole = roles[currentRoleIndex];
        
        if (isDeleting) {
            roleElement.textContent = currentRole.substring(0, currentCharIndex - 1);
            currentCharIndex--;
        } else {
            roleElement.textContent = currentRole.substring(0, currentCharIndex + 1);
            currentCharIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && currentCharIndex === currentRole.length) {
            typeSpeed = 2000; // Wait before deleting
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            typeSpeed = 500; // Wait before typing next role
        }
        
        setTimeout(typeRole, typeSpeed);
    }
    
    // Start typing animation after a brief delay
    setTimeout(typeRole, 1000);
}

// Parallax effect for hero section
function handleParallaxScroll() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    heroSection.style.transform = `translateY(${rate}px)`;
}

// Initialize profile image loading
function initializeProfileImage() {
    const profileImage = document.querySelector('.profile-image');
    if (!profileImage) return;
    
    // Handle image load success
    profileImage.addEventListener('load', function() {
        this.style.opacity = '1';
        this.style.animation = 'fadeIn 1s ease-in-out forwards';
    });
    
    // Handle image load error - fallback to placeholder
    profileImage.addEventListener('error', function() {
        const heroImage = this.parentElement;
        heroImage.innerHTML = `
            <div class="image-placeholder">
                <i class="fas fa-user-circle"></i>
            </div>
        `;
        
        // Add animation to placeholder
        const placeholder = heroImage.querySelector('.image-placeholder');
        if (placeholder) {
            placeholder.style.animation = 'fadeIn 1s ease-in-out forwards';
        }
    });
}

// Lazy loading for images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Function to handle service links and pre-fill contact form
function initializeServiceLinks() {
    // Handle service links click
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('service-link') || e.target.closest('.service-link')) {
            const link = e.target.classList.contains('service-link') ? e.target : e.target.closest('.service-link');
            const serviceType = link.getAttribute('data-service');
            
            if (serviceType) {
                // Store service type in localStorage
                localStorage.setItem('selectedService', serviceType);
            }
        }
    });
}

// Function to pre-fill contact form based on stored service
function handleServicePreFill() {
    const serviceType = localStorage.getItem('selectedService');
    
    if (serviceType) {
        const messageTextarea = document.getElementById('message');
        const subjectInput = document.getElementById('subject');
        
        if (messageTextarea) {
            let predefinedMessage = '';
            let predefinedSubject = '';
            
            switch (serviceType) {
                case 'proyecto':
                    predefinedSubject = 'Cotización para Proyecto Completo';
                    predefinedMessage = `Hola Juan Diego,

Me interesa cotizar un proyecto completo de desarrollo. Me gustaría discutir:

- Alcance del proyecto:
- Tecnologías requeridas:
- Timeframe estimado:
- Presupuesto aproximado:

Por favor, contactame para agendar una reunión y discutir los detalles.

Saludos,`;
                    break;
                    
                case 'consultoria':
                    predefinedSubject = 'Agendar Sesión de Consultoría Técnica';
                    predefinedMessage = `Hola Juan Diego,

Me interesa agendar una sesión de consultoría técnica. Necesito ayuda con:

- Tema específico:
- Duración estimada:
- Modalidad preferida (presencial/virtual):
- Fechas disponibles:

Espero tu respuesta para coordinar la sesión.

Saludos,`;
                    break;
                    
                case 'mantenimiento':
                    predefinedSubject = 'Contratar Servicio de Mantenimiento';
                    predefinedMessage = `Hola Juan Diego,

Me interesa contratar el servicio de mantenimiento mensual. Mi proyecto incluye:

- Tipo de aplicación:
- Tecnologías utilizadas:
- Tráfico/usuarios aproximados:
- Servicios actuales de hosting:

Me gustaría conocer más detalles sobre el plan de mantenimiento.

Saludos,`;
                    break;
                    
                case 'general':
                    predefinedSubject = 'Consulta sobre Servicios de Desarrollo';
                    predefinedMessage = `Hola Juan Diego,

Me interesa conocer más sobre tus servicios de desarrollo. Tengo un proyecto en mente que incluye:

- Descripción del proyecto:
- Objetivo principal:
- Timeframe deseado:
- Presupuesto estimado:

Me gustaría agendar una llamada para discutir los detalles.

Saludos,`;
                    break;
            }
            
            if (predefinedMessage) {
                messageTextarea.value = predefinedMessage;
                if (subjectInput && predefinedSubject) {
                    subjectInput.value = predefinedSubject;
                }
                
                // Clear the stored service
                localStorage.removeItem('selectedService');
                
                // Scroll to contact section smoothly after a brief delay
                setTimeout(() => {
                    const contactSection = document.querySelector('#contact');
                    if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 200);
            }
        }
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Load components based on current page
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    
    // Always load footer
    loadFooter();
    
    // Load specific page content
    if (currentPage === 'servicios' || currentPage === '') {
        const servicesContent = document.getElementById('services-content');
        if (servicesContent) {
            loadServicesContent();
        }
    }
    
    if (currentPage === 'gracias') {
        const thanksContent = document.getElementById('thanks-content');
        if (thanksContent) {
            loadThanksContent();
        }
    }
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only handle internal links
            if (href.startsWith('#')) {
                e.preventDefault();
                closeMobileMenu();
                smoothScrollToSection(href);
            } else if (href.includes('index.html#')) {
                // Handle cross-page navigation
                const targetId = href.split('#')[1];
                if (window.location.pathname.includes('servicios.html')) {
                    // If on services page, navigate to index with hash
                    window.location.href = href;
                } else {
                    // If on index page, smooth scroll
                    e.preventDefault();
                    smoothScrollToSection('#' + targetId);
                }
            }
        });
    });
    
    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
    }
    
    // Initialize animations
    initializeScrollReveal();
    animateCounters();
    initializeTypingAnimation();
    initializeProfileImage();
    initializeLazyLoading();
    
    // Initialize enhanced UX features
    initializeRealTimeValidation();
    initializeParallaxEffects();
    initializeMagneticButtons();
    initializeScrollProgress();
    initializeTooltips();
    
    // Initialize service links and handle pre-filling contact form
    initializeServiceLinks();
    handleServicePreFill();
    
    // Handle ESC key to close mobile menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
    
    // Click outside to close mobile menu
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            closeMobileMenu();
        }
    });
});

// Scroll event listeners
window.addEventListener('scroll', () => {
    updateActiveNavLink();
    handleNavbarScroll();
    // handleParallaxScroll(); // Uncomment if you want parallax effect
});

// Resize event listener
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Add styles for form messages
const messageStyles = `
.form-message {
    margin-bottom: 1.5rem;
    padding: 1rem;
    border-radius: var(--radius);
    border: 1px solid;
    animation: slideInDown 0.3s ease;
}

.form-message.success {
    background-color: #f0fdf4;
    border-color: #22c55e;
    color: #166534;
}

.form-message.error {
    background-color: #fef2f2;
    border-color: #ef4444;
    color: #991b1b;
}

.message-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.message-content i {
    font-size: 1.25rem;
    flex-shrink: 0;
}

@keyframes slideInDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.menu-open {
    overflow: hidden;
}
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = messageStyles;
document.head.appendChild(styleSheet);

// Utility functions
const utils = {
    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function
    throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    },
    
    // Format phone number
    formatPhoneNumber(phoneNumber) {
        const cleaned = phoneNumber.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return `+${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
        }
        return phoneNumber;
    },
    
    // Copy text to clipboard
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);
                return successful;
            } catch (err) {
                document.body.removeChild(textArea);
                return false;
            }
        }
    }
};

// Performance optimization: Use throttled scroll handler
window.addEventListener('scroll', utils.throttle(() => {
    updateActiveNavLink();
    handleNavbarScroll();
}, 16)); // ~60fps

// Custom tooltip system
function initializeTooltips() {
    let tooltipElement = null;
    
    function createTooltip() {
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        document.body.appendChild(tooltip);
        console.log('Tooltip element created');
        return tooltip;
    }
    
    function showTooltip(element, text) {
        if (!tooltipElement) {
            tooltipElement = createTooltip();
        }
        
        tooltipElement.textContent = text;
        
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        
        // Calculate absolute position in the page
        const elementTop = rect.top + scrollTop;
        const elementLeft = rect.left + scrollLeft;
        
        // Position tooltip above the element with enough space
        const left = elementLeft + (rect.width / 2);
        const top = elementTop - 80; // 100px above to avoid covering
        
        tooltipElement.style.left = left + 'px';
        tooltipElement.style.top = top + 'px';
        tooltipElement.style.transform = 'translateX(-50%)';
        
        console.log('Positioning tooltip:', { left, top, elementTop, elementLeft, text });
        
        // Show tooltip
        requestAnimationFrame(() => {
            tooltipElement.classList.add('show');
        });
    }
    
    function hideTooltip() {
        if (tooltipElement) {
            tooltipElement.classList.remove('show');
        }
    }
    
    // Add event listeners only to skill tags with data-tooltip
    const tooltipElements = document.querySelectorAll('.skill-tag[data-tooltip]');
    console.log('Found skill tags with tooltips:', tooltipElements.length);
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            const text = element.getAttribute('data-tooltip');
            console.log('Hovering skill tag:', text);
            if (text) {
                showTooltip(element, text);
            }
        });
        
        element.addEventListener('mouseleave', hideTooltip);
        
        element.addEventListener('focus', () => {
            const text = element.getAttribute('data-tooltip');
            if (text) {
                showTooltip(element, text);
            }
        });
        
        element.addEventListener('blur', hideTooltip);
    });
    
    // Hide tooltip on scroll
    window.addEventListener('scroll', hideTooltip);
    window.addEventListener('resize', hideTooltip);
}

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { utils };
}