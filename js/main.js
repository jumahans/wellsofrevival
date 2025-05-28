document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Change icon based on menu state
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navLinks && navLinks.classList.contains('active') && 
            !event.target.closest('.nav-links') && 
            !event.target.closest('.mobile-menu-btn')) {
            navLinks.classList.remove('active');
            
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Video Sound Toggle
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
    
    // Activities Carousel
    const carousel = document.querySelector('.activities-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (carousel && prevBtn && nextBtn) {
        const itemWidth = carousel.querySelector('.activity-item').offsetWidth + 32; // width + margin
        
        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({
                left: -itemWidth,
                behavior: 'smooth'
            });
        });
        
        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({
                left: itemWidth,
                behavior: 'smooth'
            });
        });
    }
    
    // Announcement Bar Animation
    const announcementBar = document.querySelector('.announcement-bar');
    if (announcementBar) {
        const announcements = [
            "Join us this Sunday from  8:00 AM to 12 Noon",
            "Fellowship meeting from 6:00 PM to 9:30 PM",
        ];
        
        let currentIndex = 0;
        
        setInterval(() => {
            const content = announcementBar.querySelector('p');
            content.style.opacity = 0;
            
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % announcements.length;
                content.textContent = announcements[currentIndex];
                content.style.opacity = 1;
            }, 500);
        }, 5000);
    }
});