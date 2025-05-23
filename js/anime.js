document.addEventListener('DOMContentLoaded', function() {
    // Fade-in animations for hero sections
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200 * index);
    });
    
    // Fade-in on scroll animations
    const fadeOnScrollElements = document.querySelectorAll('.fade-on-scroll');
    
    function checkFade() {
        fadeOnScrollElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial check on page load
    checkFade();
    
    // Check on scroll
    window.addEventListener('scroll', checkFade);
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
});