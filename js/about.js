document.addEventListener('DOMContentLoaded', function() {
    // Handle mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Toggle between menu and close icons
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Sound toggle for videos
    const soundToggles = document.querySelectorAll('.sound-toggle');
    
    soundToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const video = this.closest('.video-item').querySelector('video');
            const icon = this.querySelector('i');
            
            if (video.muted) {
                video.muted = false;
                icon.classList.remove('fa-volume-mute');
                icon.classList.add('fa-volume-up');
            } else {
                video.muted = true;
                icon.classList.remove('fa-volume-up');
                icon.classList.add('fa-volume-mute');
            }
        });
    });
    
    // Carousel controls
    const carousel = document.querySelector('.activities-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (carousel && prevBtn && nextBtn) {
        const itemWidth = carousel.querySelector('.activity-item').offsetWidth + 32; // Width + margin
        
        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: -itemWidth, behavior: 'smooth' });
        });
        
        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: itemWidth, behavior: 'smooth' });
        });
    }
    
    // Fade on scroll animation
    const fadeElements = document.querySelectorAll('.fade-on-scroll');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.8) {
                element.classList.add('visible');
            }
        });
    }
    
    // Check elements on initial load
    checkFade();
    
    // Check elements on scroll
    window.addEventListener('scroll', checkFade);
});