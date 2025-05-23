document.addEventListener('DOMContentLoaded', function() {
    // Announcements filtering functionality
    const categorySelect = document.getElementById('announcement-category');
    const searchInput = document.getElementById('announcement-search');
    const searchButton = document.getElementById('search-button');
    const announcementCards = document.querySelectorAll('.announcement-card');
    
    // Filter announcements by category
    function filterByCategory(category) {
        announcementCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Filter announcements by search term
    function filterBySearch(searchTerm) {
        searchTerm = searchTerm.toLowerCase();
        
        announcementCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const content = card.querySelector('.announcement-body p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || content.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Event listener for category select
    if (categorySelect) {
        categorySelect.addEventListener('change', function() {
            filterByCategory(this.value);
        });
    }
    
    // Event listener for search button
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            filterBySearch(searchInput.value);
        });
    }
    
    // Event listener for search input (search as you type)
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            // Search when Enter key is pressed
            if (e.key === 'Enter') {
                filterBySearch(this.value);
            }
            
            // Clear results when search field is cleared
            if (this.value === '') {
                announcementCards.forEach(card => {
                    card.style.display = 'block';
                });
            }
        });
    }
    
    // Announcement card hover effects
    announcementCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });
    
    // Subscription form handling
    const subscribeForm = document.getElementById('announcement-subscribe-form');
    
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('subscribe-name');
            const emailInput = document.getElementById('subscribe-email');
            
            // Simple validation
            if (nameInput.value.trim() === '' || emailInput.value.trim() === '') {
                alert('Please fill in all fields.');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For demo purposes, we'll just show a success message
            
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'subscribe-success';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>Thank you for subscribing to our announcements!</p>
            `;
            
            // Replace form with success message
            subscribeForm.innerHTML = '';
            subscribeForm.appendChild(successMessage);
        });
    }
    
    // Pagination functionality
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    
    paginationButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all buttons
            paginationButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // In a real application, you would load different announcements here
            // For demo purposes, we'll just scroll to top of announcements grid
            document.querySelector('.announcements-grid').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});