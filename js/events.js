document.addEventListener('DOMContentLoaded', function() {
    // Countdown Timer
    function updateCountdown() {
        // Set the target date (July 15, 2023 9:00 AM)
        const targetDate = new Date('July 15, 2023 09:00:00').getTime();
        const now = new Date().getTime();
        const timeLeft = targetDate - now;
        
        // If the event has passed
        if (timeLeft < 0) {
            document.getElementById('countdown-days').textContent = '00';
            document.getElementById('countdown-hours').textContent = '00';
            document.getElementById('countdown-minutes').textContent = '00';
            document.getElementById('countdown-seconds').textContent = '00';
            return;
        }
        
        // Calculate time units
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // Add leading zeros
        document.getElementById('countdown-days').textContent = days < 10 ? '0' + days : days;
        document.getElementById('countdown-hours').textContent = hours < 10 ? '0' + hours : hours;
        document.getElementById('countdown-minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('countdown-seconds').textContent = seconds < 10 ? '0' + seconds : seconds;
    }
    
    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Event Filtering
    const filterButton = document.getElementById('filter-button');
    const categorySelect = document.getElementById('event-category');
    const monthSelect = document.getElementById('event-month');
    const eventCards = document.querySelectorAll('.event-card');
    
    filterButton.addEventListener('click', function() {
        const selectedCategory = categorySelect.value;
        const selectedMonth = monthSelect.value;
        
        eventCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardMonth = card.getAttribute('data-month');
            
            // Show all cards if both filters are set to "all"
            if (selectedCategory === 'all' && selectedMonth === 'all') {
                card.style.display = 'flex';
                return;
            }
            
            // Check if card matches both filters
            const matchesCategory = selectedCategory === 'all' || cardCategory === selectedCategory;
            const matchesMonth = selectedMonth === 'all' || cardMonth === selectedMonth;
            
            if (matchesCategory && matchesMonth) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    // Fade on scroll animation
    const fadeElements = document.querySelectorAll('.fade-on-scroll');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }
    
    // Check elements on load
    checkFade();
    
    // Check elements on scroll
    window.addEventListener('scroll', checkFade);
    
    // Pagination (for demo purposes)
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    
    paginationButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all buttons
            paginationButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // In a real implementation, you would load different events here
            // For demo purposes, we'll just scroll to the top of the events grid
            document.querySelector('.events-grid').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});