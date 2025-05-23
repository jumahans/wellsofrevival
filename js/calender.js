document.addEventListener('DOMContentLoaded', function() {
    // Add wrapper and inner container for calendar grid
    const calendarGrid = document.querySelector('.calendar-grid');
    if (calendarGrid) {
        // Create wrapper and inner container
        const calendarWrapper = document.createElement('div');
        calendarWrapper.className = 'calendar-wrapper';
        
        const calendarInner = document.createElement('div');
        calendarInner.className = 'calendar-inner';
        
        // Add scroll notice for mobile
        const scrollNotice = document.createElement('div');
        scrollNotice.className = 'calendar-scroll-notice';
        scrollNotice.innerHTML = '<i class="fas fa-arrows-alt-h"></i> Swipe horizontally to view the full calendar';
        
        // Move calendar content to inner container
        const calendarHeader = calendarGrid.querySelector('.calendar-header');
        const calendarBody = calendarGrid.querySelector('.calendar-body');
        
        if (calendarHeader && calendarBody) {
            calendarInner.appendChild(calendarHeader.cloneNode(true));
            calendarInner.appendChild(calendarBody.cloneNode(true));
            
            calendarHeader.remove();
            calendarBody.remove();
            
            calendarWrapper.appendChild(calendarInner);
            calendarGrid.appendChild(scrollNotice);
            calendarGrid.appendChild(calendarWrapper);
        }
    }
    
    // Add wrapper and inner container for week view
    const weekView = document.querySelector('.calendar-week-view');
    if (weekView) {
        // Create wrapper and inner container
        const weekViewWrapper = document.createElement('div');
        weekViewWrapper.className = 'week-view-wrapper';
        
        const weekViewInner = document.createElement('div');
        weekViewInner.className = 'week-view-inner';
        
        // Add scroll notice for mobile
        const scrollNotice = document.createElement('div');
        scrollNotice.className = 'calendar-scroll-notice';
        scrollNotice.innerHTML = '<i class="fas fa-arrows-alt-h"></i> Swipe horizontally to view the full week';
        
        // Move week view content to inner container
        const weekHeader = weekView.querySelector('.week-header');
        const weekBody = weekView.querySelector('.week-body');
        
        if (weekHeader && weekBody) {
            weekViewInner.appendChild(weekHeader.cloneNode(true));
            weekViewInner.appendChild(weekBody.cloneNode(true));
            
            weekHeader.remove();
            weekBody.remove();
            
            weekViewWrapper.appendChild(weekViewInner);
            weekView.appendChild(scrollNotice);
            weekView.appendChild(weekViewWrapper);
        }
    }
    
    // View switching functionality
    const viewButtons = document.querySelectorAll('.view-btn');
    const calendarViews = [
        document.querySelector('.calendar-grid'),
        document.querySelector('.calendar-week-view'),
        document.querySelector('.calendar-list-view')
    ];
    
    viewButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            viewButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all views
            calendarViews.forEach(view => {
                if (view) view.style.display = 'none';
            });
            
            // Show selected view
            if (calendarViews[index]) {
                calendarViews[index].style.display = 'block';
            }
        });
    });
    
    // Event popup functionality
    const eventIndicators = document.querySelectorAll('.event-indicator');
    const eventPopup = document.querySelector('.event-popup');
    const closePopup = document.querySelector('.close-popup');
    
    if (eventIndicators.length > 0 && eventPopup) {
        eventIndicators.forEach(indicator => {
            indicator.addEventListener('click', function() {
                eventPopup.style.display = 'flex';
                
                // Prevent body scrolling when popup is open
                document.body.style.overflow = 'hidden';
            });
        });
        closePopup.addEventListener('click', function() {
            eventPopup.style.display = 'none';
            
            // Re-enable body scrolling
            document.body.style.overflow = '';
        });
        
        // Close popup when clicking outside content
        eventPopup.addEventListener('click', function(e) {
            if (e.target === eventPopup) {
                eventPopup.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
        
        // Close popup with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && eventPopup.style.display === 'flex') {
                eventPopup.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
    
    // Month navigation functionality
    const prevMonthBtn = document.querySelector('.prev-month-btn');
    const nextMonthBtn = document.querySelector('.next-month-btn');
    const currentMonthDisplay = document.querySelector('.current-month');
    
    if (prevMonthBtn && nextMonthBtn && currentMonthDisplay) {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        let currentDate = new Date();
        
        // Update month display
        function updateMonthDisplay() {
            currentMonthDisplay.textContent = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
        }
        
        // Initial display
        updateMonthDisplay();
        
        // Previous month button
        prevMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            updateMonthDisplay();
            // In a real implementation, you would update the calendar grid here
        });
        
        // Next month button
        nextMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            updateMonthDisplay();
            // In a real implementation, you would update the calendar grid here
        });
    }
    
    // Responsive calendar cells - adjust height based on width
    function adjustCalendarCellHeight() {
        const calendarCells = document.querySelectorAll('.calendar-cell');
        
        calendarCells.forEach(cell => {
            // Get the computed width of the cell
            const width = cell.offsetWidth;
            
            // Set the height to match the width for a square aspect ratio
            // Subtract padding to maintain the square appearance
            const paddingTop = parseInt(window.getComputedStyle(cell).paddingTop);
            const paddingBottom = parseInt(window.getComputedStyle(cell).paddingBottom);
            const totalPadding = paddingTop + paddingBottom;
            
            // Set minimum height to ensure content fits
            const minHeight = 60;
            const calculatedHeight = Math.max(width - totalPadding, minHeight);
            
            // Apply the height
            cell.style.height = `${calculatedHeight}px`;
        });
    }
    
    // Call on load and resize
    if (document.querySelector('.calendar-cell')) {
        adjustCalendarCellHeight();
        window.addEventListener('resize', adjustCalendarCellHeight);
    }
    
    // Handle overflow of event indicators in calendar cells
    function handleEventOverflow() {
        const calendarCells = document.querySelectorAll('.calendar-cell');
        
        calendarCells.forEach(cell => {
            const indicators = cell.querySelectorAll('.event-indicator');
            if (indicators.length <= 3) return; // No need to handle if 3 or fewer events
            
            // Get cell dimensions
            const cellHeight = cell.offsetHeight;
            const dateHeight = cell.querySelector('.date') ? cell.querySelector('.date').offsetHeight : 0;
            const availableHeight = cellHeight - dateHeight - 20; // Subtract date height and some padding
            
            // Calculate how many events can fit
            const indicatorHeight = 24; // Approximate height of each indicator including margin
            const maxEvents = Math.floor(availableHeight / indicatorHeight);
            
            // If we can't fit all events, add a "more" indicator
            if (maxEvents < indicators.length) {
                // Hide excess events
                for (let i = maxEvents - 1; i < indicators.length; i++) {
                    indicators[i].style.display = 'none';
                }
                
                // Check if "more" indicator already exists
                let moreIndicator = cell.querySelector('.more-events');
                
                if (!moreIndicator) {
                    // Create "more" indicator
                    moreIndicator = document.createElement('div');
                    moreIndicator.className = 'event-indicator more-events';
                    moreIndicator.textContent = `+ ${indicators.length - (maxEvents - 1)} more`;
                    
                    // Add click event to show all events in popup
                    moreIndicator.addEventListener('click', function(e) {
                        e.stopPropagation(); // Prevent triggering parent events
                        
                        // Show popup with all events for this day
                        const eventPopup = document.querySelector('.event-popup');
                        if (eventPopup) {
                            // Update popup content with all events for this day
                            const popupTitle = eventPopup.querySelector('h3');
                            if (popupTitle) {
                                const dateText = cell.querySelector('.date').textContent;
                                popupTitle.textContent = `Events for ${months[currentDate.getMonth()]} ${dateText}`;
                            }
                            
                            eventPopup.style.display = 'flex';
                            document.body.style.overflow = 'hidden';
                        }
                    });
                    
                    cell.appendChild(moreIndicator);
                } else {
                    // Update existing "more" indicator
                    moreIndicator.textContent = `+ ${indicators.length - (maxEvents - 1)} more`;
                }
            }
        });
    }
    
    // Call on load and resize
    if (document.querySelector('.calendar-cell')) {
        // Delay to ensure calendar cells have been properly sized
        setTimeout(handleEventOverflow, 100);
        window.addEventListener('resize', function() {
            setTimeout(handleEventOverflow, 100);
        });
    }
});