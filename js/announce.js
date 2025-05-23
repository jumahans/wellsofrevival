document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButton = document.getElementById('filter-button');
    const categorySelect = document.getElementById('announcement-category');
    const dateSelect = document.getElementById('announcement-date');
    const searchInput = document.getElementById('announcement-search');
    const announcementCards = document.querySelectorAll('.announcement-card');
    
    if (filterButton) {
        filterButton.addEventListener('click', function() {
            const selectedCategory = categorySelect ? categorySelect.value : 'all';
            const selectedDate = dateSelect ? dateSelect.value : 'all';
            const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
            
            announcementCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                const cardDate = card.getAttribute('data-date');
                const cardTitle = card.querySelector('h3').textContent.toLowerCase();
                const cardContent = card.querySelector('.announcement-body').textContent.toLowerCase();
                
                // Check if card matches all filters
                const matchesCategory = selectedCategory === 'all' || cardCategory === selectedCategory;
                const matchesDate = selectedDate === 'all' || cardDate === selectedDate;
                const matchesSearch = searchTerm === '' || 
                                     cardTitle.includes(searchTerm) || 
                                     cardContent.includes(searchTerm);
                
                if (matchesCategory && matchesDate && matchesSearch) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Search on enter key
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter' && filterButton) {
                filterButton.click();
            }
        });
    }
    
    // Subscribe form functionality
    const subscribeForm = document.querySelector('.subscribe-form form');
    const subscribeSuccess = document.querySelector('.subscribe-success');
    
    if (subscribeForm && subscribeSuccess) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would send the form data to a server
            // For demo purposes, we'll just show the success message
            subscribeForm.style.display = 'none';
            subscribeSuccess.style.display = 'block';
        });
    }
    
    // Pagination functionality
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    
    if (paginationButtons.length > 0) {
        paginationButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all buttons
                paginationButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // In a real implementation, you would load different announcements here
                // For demo purposes, we'll just scroll to the top of the announcements grid
                document.querySelector('.announcements-grid').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }
    
    // Responsive card heights
    function equalizeCardHeights() {
        // Reset heights first
        announcementCards.forEach(card => {
            card.style.height = 'auto';
        });
        
        // Only equalize heights on larger screens
        if (window.innerWidth >= 768) {
            // Group cards by rows
            const rows = {};
            
            announcementCards.forEach(card => {
                // Skip hidden cards
                if (card.style.display === 'none') return;
                
                const rect = card.getBoundingClientRect();
                const row = Math.floor(rect.top);
                
                if (!rows[row]) rows[row] = [];
                rows[row].push(card);
            });
            
            // Set equal height for each row
            Object.values(rows).forEach(rowCards => {
                let maxHeight = 0;
                
                // Find max height in this row
                rowCards.forEach(card => {
                    maxHeight = Math.max(maxHeight, card.offsetHeight);
                });
                
                // Apply max height to all cards in this row
                rowCards.forEach(card => {
                    card.style.height = `${maxHeight}px`;
                });
            });
        }
    }
    
    // Call on load and resize
    if (announcementCards.length > 0) {
        // Delay to ensure images are loaded
        setTimeout(equalizeCardHeights, 100);
        window.addEventListener('resize', equalizeCardHeights);
    }
});