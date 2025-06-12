document.addEventListener('DOMContentLoaded', function() {
    // Sermon filtering functionality
    const filterButton = document.getElementById('filter-button');
    const sermonCards = document.querySelectorAll('.sermon-card');
    
    if (filterButton) {
        filterButton.addEventListener('click', function() {
            const speakerFilter = document.getElementById('speaker-filter').value;
            const topicFilter = document.getElementById('topic-filter').value;
            const seriesFilter = document.getElementById('series-filter').value;
            
            sermonCards.forEach(card => {
                const speakerMatch = speakerFilter === 'all' || card.dataset.speaker === speakerFilter;
                const topicMatch = topicFilter === 'all' || card.dataset.topic === topicFilter;
                const seriesMatch = seriesFilter === 'all' || card.dataset.series === seriesFilter;
                
                if (speakerMatch && topicMatch && seriesMatch) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Sermon card hover effects
    sermonCards.forEach(card => {
        const thumbnail = card.querySelector('.sermon-thumbnail');
        const playButton = card.querySelector('.play-button');
        
        card.addEventListener('mouseenter', function() {
            playButton.style.opacity = '1';
            playButton.style.transform = 'translate(-50%, -50%) scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            playButton.style.opacity = '0.7';
            playButton.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
    
    // Pagination functionality
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    
    paginationButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            paginationButtons.forEach(btn => btn.classList.remove('active'));
            
            this.classList.add('active');
            document.querySelector('.sermon-grid').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});