document.addEventListener('DOMContentLoaded', function() {
    // Calendar view switching functionality
    const monthViewBtn = document.getElementById('month-view');
    const weekViewBtn = document.getElementById('week-view');
    const listViewBtn = document.getElementById('list-view');
    
    const monthViewContainer = document.getElementById('month-view-container');
    const weekViewContainer = document.getElementById('week-view-container');
    const listViewContainer = document.getElementById('list-view-container');
    
    // Function to switch views
    function switchView(viewType) {
        // Hide all views
        monthViewContainer.style.display = 'none';
        weekViewContainer.style.display = 'none';
        listViewContainer.style.display = 'none';
        
        // Remove active class from all buttons
        monthViewBtn.classList.remove('active');
        weekViewBtn.classList.remove('active');
        listViewBtn.classList.remove('active');
        
        // Show selected view and activate button
        if (viewType === 'month') {
            monthViewContainer.style.display = 'block';
            monthViewBtn.classList.add('active');
        } else if (viewType === 'week') {
            weekViewContainer.style.display = 'block';
            weekViewBtn.classList.add('active');
        } else if (viewType === 'list') {
            listViewContainer.style.display = 'block';
            listViewBtn.classList.add('active');
        }
    }
    
    // Add event listeners to view buttons
    monthViewBtn.addEventListener('click', function() {
        switchView('month');
    });
    
    weekViewBtn.addEventListener('click', function() {
        switchView('week');
    });
    
    listViewBtn.addEventListener('click', function() {
        switchView('list');
    });
    
    // Month navigation functionality
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const currentMonthDisplay = document.getElementById('current-month');
    
    // Array of month names
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    // Current date tracking
    let currentDate = new Date();
    let currentMonthIndex = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    // Update month display
    function updateMonthDisplay() {
        currentMonthDisplay.textContent = `${monthNames[currentMonthIndex]} ${currentYear}`;
    }
    
    // Navigate to previous month
    prevMonthBtn.addEventListener('click', function() {
        currentMonthIndex--;
        if (currentMonthIndex < 0) {
            currentMonthIndex = 11;
            currentYear--;
        }
        updateMonthDisplay();
        // In a real application, you would update the calendar grid here
    });
    
    // Navigate to next month
    nextMonthBtn.addEventListener('click', function() {
        currentMonthIndex++;
        if (currentMonthIndex > 11) {
            currentMonthIndex = 0;
            currentYear++;
        }
        updateMonthDisplay();
        // In a real application, you would update the calendar grid here
    });
    
    // Event details popup functionality
    const calendarCells = document.querySelectorAll('.calendar-cell');
    
    calendarCells.forEach(cell => {
        const eventIndicators = cell.querySelectorAll('.event-indicator');
        
        eventIndicators.forEach(indicator => {
            indicator.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Get event details
                const eventType = this.classList[1]; // e.g., sunday-service, bible-study
                const eventName = this.querySelector('span').textContent;
                const date = cell.querySelector('.date') ? cell.querySelector('.date').textContent : '';
                
                // Create popup content
                let eventTime = '';
                let eventLocation = '';
                
                if (eventType === 'sunday-service') {
                    eventTime = '9:00 AM - 12:00 PM';
                    eventLocation = 'Main Sanctuary';
                } else if (eventType === 'bible-study') {
                    eventTime = '6:00 PM - 7:30 PM';
                    eventLocation = 'Fellowship Hall';
                } else if (eventType === 'special-event') {
                    if (eventName === 'Worship Night') {
                        eventTime = '6:00 PM - 8:00 PM';
                        eventLocation = 'Main Sanctuary';
                    } else if (eventName === 'Prayer & Fasting') {
                        eventTime = 'All Day';
                        eventLocation = 'Various Locations';
                    }
                }
                
                // Create and show popup
                const popup = document.createElement('div');
                popup.className = 'event-popup';
                popup.innerHTML = `
                    <div class="event-popup-content">
                        <span class="close-popup">&times;</span>
                        <h3>${eventName}</h3>
                        <p><i class="fas fa-calendar-alt"></i> June ${date}, 2023</p>
                        <p><i class="fas fa-clock"></i> ${eventTime}</p>
                        <p><i class="fas fa-map-marker-alt"></i> ${eventLocation}</p>
                        <div class="popup-actions">
                            <a href="#" class="popup-btn">Add to My Calendar</a>
                            <a href="#" class="popup-btn">View Details</a>
                        </div>
                    </div>
                `;
                
                // Add popup to body
                document.body.appendChild(popup);
                
                // Close popup when clicking the close button
                popup.querySelector('.close-popup').addEventListener('click', function() {
                    document.body.removeChild(popup);
                });
                
                // Close popup when clicking outside
                popup.addEventListener('click', function(e) {
                    if (e.target === popup) {
                        document.body.removeChild(popup);
                    }
                });
            });
        });
    });
});