/**
 * QINE SYSTEMS - MAIN JAVASCRIPT
 * Handles navigation, animations, form validation, and interactive features
 */

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Throttle function to limit execution rate
 */
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ========================================
// THEME TOGGLE FUNCTIONALITY
// ========================================

class ThemeToggle {
    constructor() {
        this.themeToggle = document.querySelector('.theme-toggle');
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.init();
    }
    
    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Add click event listener
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        
        // Announce theme change for screen readers
        this.announce(`Theme changed to ${this.currentTheme} mode`);
    }
    
    setTheme(theme) {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }
    
    announce(message) {
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('role', 'status');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.className = 'sr-only';
        liveRegion.textContent = message;
        document.body.appendChild(liveRegion);
        
        setTimeout(() => {
            document.body.removeChild(liveRegion);
        }, 1000);
    }
}

// ========================================
// NAVIGATION FUNCTIONALITY
// ========================================

class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        this.navLinks = document.getElementById('nav-links');
        this.navLinkItems = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        // Handle scroll events for navbar styling
        window.addEventListener('scroll', throttle(() => {
            this.handleScroll();
        }, 100));
        
        // Mobile menu toggle
        if (this.mobileMenuToggle) {
            this.mobileMenuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
        
        // Close mobile menu when clicking nav links
        this.navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-wrapper')) {
                this.closeMobileMenu();
            }
        });
        
        // Smooth scroll for anchor links
        this.setupSmoothScroll();
    }
    
    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }
    
    toggleMobileMenu() {
        const isExpanded = this.mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        this.mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        this.navLinks.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (!isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    closeMobileMenu() {
        this.mobileMenuToggle.setAttribute('aria-expanded', 'false');
        this.navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    setupSmoothScroll() {
        this.navLinkItems.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Only handle anchor links
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        const navbarHeight = this.navbar.offsetHeight;
                        const targetPosition = targetElement.offsetTop - navbarHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
}

// ========================================
// FORM VALIDATION & SUBMISSION
// ========================================

class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.nameInput = document.getElementById('name');
        this.emailInput = document.getElementById('email');
        this.messageInput = document.getElementById('message');
        this.submitButton = this.form?.querySelector('button[type="submit"]');
        
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        // Real-time validation
        this.nameInput.addEventListener('blur', () => this.validateName());
        this.emailInput.addEventListener('blur', () => this.validateEmail());
        this.messageInput.addEventListener('blur', () => this.validateMessage());
        
        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
        
        // Clear errors on input
        [this.nameInput, this.emailInput, this.messageInput].forEach(input => {
            input.addEventListener('input', () => {
                this.clearError(input);
            });
        });
    }
    
    validateName() {
        const value = this.nameInput.value.trim();
        if (value === '') {
            this.showError(this.nameInput, 'Name is required');
            return false;
        } else if (value.length < 2) {
            this.showError(this.nameInput, 'Name must be at least 2 characters');
            return false;
        }
        this.clearError(this.nameInput);
        return true;
    }
    
    validateEmail() {
        const value = this.emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (value === '') {
            this.showError(this.emailInput, 'Email is required');
            return false;
        } else if (!emailRegex.test(value)) {
            this.showError(this.emailInput, 'Please enter a valid email address');
            return false;
        }
        this.clearError(this.emailInput);
        return true;
    }
    
    validateMessage() {
        const value = this.messageInput.value.trim();
        if (value === '') {
            this.showError(this.messageInput, 'Message is required');
            return false;
        } else if (value.length < 10) {
            this.showError(this.messageInput, 'Message must be at least 10 characters');
            return false;
        }
        this.clearError(this.messageInput);
        return true;
    }
    
    showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        input.classList.add('error');
        errorElement.textContent = message;
        input.setAttribute('aria-invalid', 'true');
    }
    
    clearError(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        input.classList.remove('error');
        errorElement.textContent = '';
        input.setAttribute('aria-invalid', 'false');
    }
    
    async handleSubmit() {
        // Validate all fields
        const isNameValid = this.validateName();
        const isEmailValid = this.validateEmail();
        const isMessageValid = this.validateMessage();
        
        if (!isNameValid || !isEmailValid || !isMessageValid) {
            // Focus first invalid field
            if (!isNameValid) this.nameInput.focus();
            else if (!isEmailValid) this.emailInput.focus();
            else if (!isMessageValid) this.messageInput.focus();
            return;
        }
        
        // Disable submit button
        this.submitButton.disabled = true;
        this.submitButton.textContent = 'Submitting...';
        
        // Simulate form submission (replace with actual API call)
        await this.simulateSubmission();
        
        // Show success message
        this.showSuccess();
        
        // Reset form
        this.form.reset();
        
        // Re-enable submit button
        this.submitButton.disabled = false;
        this.submitButton.textContent = 'Submit Application';
    }
    
    simulateSubmission() {
        // Simulate API call delay
        return new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    showSuccess() {
        const successElement = document.querySelector('.form-success');
        successElement.textContent = '✓ Thank you! Your message has been received. We\'ll get back to you soon.';
        successElement.classList.add('show');
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successElement.classList.remove('show');
        }, 5000);
    }
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.course-card, .perk-card, .roadmap-card, .about-card, .certification-card, .partnership-callout');
        this.init();
    }
    
    init() {
        // Add fade-in class to elements
        this.elements.forEach(element => {
            element.classList.add('fade-in');
        });
        
        // Check viewport on scroll
        window.addEventListener('scroll', throttle(() => {
            this.checkViewport();
        }, 100));
        
        // Initial check
        this.checkViewport();
    }
    
    checkViewport() {
        this.elements.forEach(element => {
            if (this.isElementInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }
    
    isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        return (
            rect.top <= windowHeight * 0.85 &&
            rect.bottom >= 0
        );
    }
}

// ========================================
// PARTICLE ANIMATION ENHANCEMENT
// ========================================

class ParticleEnhancement {
    constructor() {
        this.particles = document.querySelectorAll('.particle');
        this.init();
    }
    
    init() {
        // Add random animation delays for more organic movement
        this.particles.forEach((particle, index) => {
            const randomDelay = Math.random() * 5;
            const randomDuration = 15 + Math.random() * 10;
            particle.style.animationDelay = `${randomDelay}s`;
            particle.style.animationDuration = `${randomDuration}s`;
        });
    }
}

// ========================================
// KEYBOARD NAVIGATION ENHANCEMENT
// ========================================

class KeyboardNavigation {
    constructor() {
        this.init();
    }
    
    init() {
        // Trap focus in mobile menu when open
        document.addEventListener('keydown', (e) => {
            const mobileMenu = document.getElementById('nav-links');
            const isMenuOpen = mobileMenu.classList.contains('active');
            
            if (isMenuOpen && e.key === 'Escape') {
                const nav = new Navigation();
                nav.closeMobileMenu();
            }
        });
        
        // Enhance button interactions
        document.querySelectorAll('.btn, .nav-link, .channel-link').forEach(element => {
            element.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    element.click();
                }
            });
        });
    }
}

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        // Lazy load images if any are added in the future
        if ('IntersectionObserver' in window) {
            this.setupLazyLoading();
        }
        
        // Preload critical fonts
        this.preloadFonts();
    }
    
    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    preloadFonts() {
        const fonts = [
            { family: 'Inter', weight: '400' },
            { family: 'Inter', weight: '700' },
            { family: 'JetBrains Mono', weight: '400' }
        ];
        
        fonts.forEach(font => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'font';
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }
}

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================

class AccessibilityEnhancer {
    constructor() {
        this.init();
    }
    
    init() {
        // Add skip link
        this.addSkipLink();
        
        // Announce page changes for screen readers
        this.setupLiveRegions();
        
        // Enhance focus visibility
        this.enhanceFocusVisibility();
    }
    
    addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#home';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
    
    setupLiveRegions() {
        // Announce navigation changes
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                const section = link.textContent;
                this.announce(`Navigating to ${section}`);
            });
        });
    }
    
    announce(message) {
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('role', 'status');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.className = 'sr-only';
        liveRegion.textContent = message;
        document.body.appendChild(liveRegion);
        
        setTimeout(() => {
            document.body.removeChild(liveRegion);
        }, 1000);
    }
    
    enhanceFocusVisibility() {
        // Add focus-visible polyfill behavior for older browsers
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });
    }
}

// ========================================
// COURSE CARD INTERACTIONS
// ========================================

class CourseCardInteractions {
    constructor() {
        this.cards = document.querySelectorAll('.course-card');
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            // Add hover effects with sound (optional)
            card.addEventListener('mouseenter', () => {
                this.handleCardHover(card);
            });
            
            // Add click tracking
            const button = card.querySelector('.btn-card');
            if (button && !button.disabled) {
                button.addEventListener('click', (e) => {
                    this.trackCourseClick(card);
                });
            }
        });
    }
    
    handleCardHover(card) {
        // Optional: Add subtle animation enhancement
        const icon = card.querySelector('.card-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => {
                icon.style.transform = '';
            }, 300);
        }
    }
    
    trackCourseClick(card) {
        const courseTitle = card.querySelector('.card-title').textContent;
        console.log(`Course clicked: ${courseTitle}`);
        
        // Optional: Send analytics event
        // analytics.track('course_clicked', { course: courseTitle });
    }
}

// ========================================
// INITIALIZATION
// ========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    new ThemeToggle();
    new Navigation();
    new ContactForm();
    new ScrollAnimations();
    new ParticleEnhancement();
    new KeyboardNavigation();
    new PerformanceOptimizer();
    new AccessibilityEnhancer();
    new CourseCardInteractions();
    
    console.log('🚀 Qine Systems initialized successfully');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page hidden');
    } else {
        console.log('Page visible');
    }
});

// Prevent console errors in production
if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};
}

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ThemeToggle,
        Navigation,
        ContactForm,
        ScrollAnimations,
        ParticleEnhancement,
        KeyboardNavigation,
        PerformanceOptimizer,
        AccessibilityEnhancer,
        CourseCardInteractions
    };
}
