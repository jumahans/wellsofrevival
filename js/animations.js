document.addEventListener('DOMContentLoaded', function() {
    // Scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // Add fade-on-scroll class to elements we want to animate
    const sectionsToAnimate = document.querySelectorAll('section > h2, .pastor-feature, .leadership-grid, .activities-carousel, .times-container, .location-container');
    
    sectionsToAnimate.forEach(section => {
        section.classList.add('fade-on-scroll');
    });
    
    // Run on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Scripture Animation
    const scriptureElement = document.querySelector('.scripture-animation p');
    if (scriptureElement) {
        const scriptureText = scriptureElement.textContent;
        scriptureElement.textContent = '';
        
        let charIndex = 0;
        
        const typeWriter = setInterval(() => {
            if (charIndex < scriptureText.length) {
                scriptureElement.textContent += scriptureText.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typeWriter);
            }
        }, 50);
    }
    
    // Hero Section Parallax Effect
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        });
    }
    
    // Smooth hover effects for leadership cards
    const leaderCards = document.querySelectorAll('.leader-card');
    leaderCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.leader-info').style.transform = 'translateY(0)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.leader-info').style.transform = 'translateY(100%)';
        });
    });
    
    // Pastor image hover effect
    const pastorImage = document.querySelector('.pastor-image');
    if (pastorImage) {
        pastorImage.addEventListener('mouseenter', function() {
            this.querySelector('.pastor-info').style.transform = 'translateY(0)';
        });
        
        pastorImage.addEventListener('mouseleave', function() {
            this.querySelector('.pastor-info').style.transform = 'translateY(100%)';
        });
    }
});