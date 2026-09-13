// AK Media India - Website Interactivity

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('open');
    });
}

// Form submission handling
const brandForm = document.getElementById('brand-quote-form');
const creatorForm = document.getElementById('creator-quote-form');

if (brandForm) {
    brandForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Show success message or handle form submission
        alert('Thank you! We will contact you shortly.');
        brandForm.reset();
    });
}

if (creatorForm) {
    creatorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Show success message or handle form submission
        alert('Thank you! We will review your application and get back to you.');
        creatorForm.reset();
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // Only prevent default for internal links
        if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Intersection Observer for animation triggers
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add animation class to elements that should animate in
document.querySelectorAll('.benefit-card, .stat-number, .testimonial-item').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});

// Dual form switching
const brandFormLink = document.querySelector('[href="#brand-form"]');
const creatorFormLink = document.querySelector('[href="#creator-form"]');
const formsContainer = document.querySelector('.forms-container');

if (brandFormLink && formsContainer) {
    brandFormLink.addEventListener('click', (e) => {
        e.preventDefault();
        formsContainer.style.display = 'block';
        document.getElementById('brand-form')?.scrollIntoView({ behavior: 'smooth' });
    });
}

if (creatorFormLink && formsContainer) {
    creatorFormLink.addEventListener('click', (e) => {
        e.preventDefault();
        formsContainer.style.display = 'block';
        document.getElementById('creator-form')?.scrollIntoView({ behavior: 'smooth' });
    });
}

// Close forms when clicking outside
document.addEventListener('click', (e) => {
    if (formsContainer && !formsContainer.contains(e.target) && e.target !== brandFormLink && e.target !== creatorFormLink) {
        formsContainer.style.display = 'none';
    }
});

// Keyboard navigation for mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
    }
});

// Lazy loading for images
if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Fallback for browsers that don't support native lazy loading
    const lazyImages = [].slice.call(document.querySelectorAll('img[loading="lazy"]'));
    if ('IntersectionObserver' in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src || lazyImage.src;
                    lazyImage.classList.remove('lazy');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
}

// Performance: Close mobile menu when clicking a link
if (mainNav) {
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('open')) {
                mainNav.classList.remove('open');
            }
        });
    });
}

// Analytics: Simple page view tracking (placeholder for actual analytics)
const trackPageView = () => {
    // Replace with actual analytics implementation
    console.log('Page view tracked');
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    trackPageView();

    // Add animation classes
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });
});