document.addEventListener('DOMContentLoaded', function() {
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validate form (basic validation)
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For demo purposes, we'll just show a success message
            
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Thank You!</h3>
                <p>Your message has been sent successfully. We'll get back to you soon.</p>
            `;
            
            // Replace form with success message
            const formContainer = document.querySelector('.form-container');
            formContainer.innerHTML = '';
            formContainer.appendChild(successMessage);
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Form input animations
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
    
    formInputs.forEach(input => {
        // Add focus class when input is focused
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        // Remove focus class when input loses focus
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on page load
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });
});