document.addEventListener('DOMContentLoaded', function() {
    // Testimonial slider functionality
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');
    let currentSlide = 0;
    
    // Hide all slides except the first one
    function initSlider() {
        testimonialSlides.forEach((slide, index) => {
            if (index !== 0) {
                slide.style.display = 'none';
            }
        });
    }
    
    // Show the current slide
    function showSlide(index) {
        // Hide all slides
        testimonialSlides.forEach(slide => {
            slide.style.display = 'none';
        });
        
        // Show the current slide with fade-in animation
        testimonialSlides[index].style.display = 'block';
        testimonialSlides[index].classList.add('fade-in');
        
        // Remove the animation class after animation completes
        setTimeout(() => {
            testimonialSlides[index].classList.remove('fade-in');
        }, 1000);
    }
    
    // Next slide function
    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    }
    
    // Previous slide function
    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
        showSlide(currentSlide);
    }
    
    // Initialize the slider
    if (testimonialSlides.length > 0) {
        initSlider();
        
        // Add event listeners to navigation buttons
        if (prevButton && nextButton) {
            prevButton.addEventListener('click', prevSlide);
            nextButton.addEventListener('click', nextSlide);
        }
        
        // Auto-advance slides every 5 seconds
        setInterval(nextSlide, 5000);
    }
    
    // Animate category cards on hover
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.category-icon').style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.category-icon').style.transform = 'translateY(0)';
        });
    });
});