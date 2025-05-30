// Beliefs Section Animation and Interaction
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize AOS (Animate On Scroll) if not already initialized
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
    
    // Custom scroll animations for elements without AOS
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Add animation classes to elements
    const beliefItems = document.querySelectorAll('.belief-item');
    const authorityItems = document.querySelectorAll('.authority-item');
    const autonomyContent = document.querySelector('.autonomy-content');
    const categoryTitles = document.querySelectorAll('.category-title');
    
    // Animate belief items with staggered delay
    beliefItems.forEach((item, index) => {
        if (!item.hasAttribute('data-aos')) {
            item.classList.add('animate-on-scroll');
            item.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(item);
        }
    });
    
    // Animate authority items
    authorityItems.forEach((item, index) => {
        if (!item.hasAttribute('data-aos')) {
            item.classList.add('slide-in-left');
            item.style.transitionDelay = `${index * 0.15}s`;
            observer.observe(item);
        }
    });
    
    // Animate autonomy content
    if (autonomyContent && !autonomyContent.hasAttribute('data-aos')) {
        autonomyContent.classList.add('fade-in-up');
        observer.observe(autonomyContent);
    }
    
    // Animate category titles
    categoryTitles.forEach((title, index) => {
        title.classList.add('animate-on-scroll');
        title.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(title);
    });
    
    // Add hover effects for belief items
    beliefItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Parallax effect for section background
    const beliefsSection = document.querySelector('.beliefs-section');
    if (beliefsSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const sectionTop = beliefsSection.offsetTop;
            const sectionHeight = beliefsSection.offsetHeight;
            const windowHeight = window.innerHeight;
            
            // Check if section is in viewport
            if (scrolled + windowHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
                const yPos = -(scrolled - sectionTop) * 0.1;
                beliefsSection.style.backgroundPosition = `center ${yPos}px`;
            }
        });
    }
    
    // Counter animation for authority items
    const authorityNumbers = document.querySelectorAll('.authority-number');
    authorityNumbers.forEach(number => {
        observer.observe(number);
        
        number.addEventListener('animationstart', function() {
            const finalNumber = parseInt(this.textContent);
            let currentNumber = 0;
            const increment = finalNumber / 20;
            
            const counter = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= finalNumber) {
                    this.textContent = finalNumber;
                    clearInterval(counter);
                } else {
                    this.textContent = Math.floor(currentNumber);
                }
            }, 50);
        });
    });
    
    // Smooth scroll for internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading animation
    const beliefsContent = document.querySelector('.beliefs-content');
    if (beliefsContent) {
        beliefsContent.style.opacity = '0';
        beliefsContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            beliefsContent.style.transition = 'all 0.8s ease';
            beliefsContent.style.opacity = '1';
            beliefsContent.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Add ripple effect to belief items
    beliefItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(230, 126, 34, 0.1);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
        });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }
        
        @keyframes fadeInScale {
            0% {
                opacity: 0;
                transform: scale(0.8);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes slideInFromLeft {
            0% {
                opacity: 0;
                transform: translateX(-100px);
            }
            100% {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes bounceIn {
            0% {
                opacity: 0;
                transform: scale(0.3);
            }
            50% {
                transform: scale(1.05);
            }
            70% {
                transform: scale(0.9);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Enhanced scroll-triggered animations
    const createScrollTrigger = (element, animationClass, delay = 0) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add(animationClass);
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(element);
    };
    
    // Apply different animations to different elements
    beliefItems.forEach((item, index) => {
        if (!item.classList.contains('animated')) {
            item.style.animation = 'none';
            createScrollTrigger(item, 'fadeInScale', index * 100);
        }
    });
    
    // Text typing effect for category titles
    const typeWriter = (element, text, speed = 50) => {
        element.innerHTML = '';
        let i = 0;
        
        const timer = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    };
    
    // Apply typing effect to category titles when they come into view
    categoryTitles.forEach(title => {
        const originalText = title.textContent;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter(entry.target, originalText, 80);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(title);
    });
    
    // Progressive loading of belief items
    const progressiveLoad = () => {
        beliefItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 150);
        });
    };
    
    // Icon animation on hover
    const beliefIcons = document.querySelectorAll('.belief-icon i');
    beliefIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.6s ease-in-out';
        });
        
        icon.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
    
    // Staggered animation for authority items
    const staggerAuthority = () => {
        authorityItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
                item.style.animation = 'slideInFromLeft 0.6s ease-out';
            }, index * 200);
        });
    };
    
    // Trigger staggered animation when authority section is visible
    const authoritySection = document.querySelector('.belief-category:nth-child(2)');
    if (authoritySection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    staggerAuthority();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(authoritySection);
    }
    
    // Enhanced hover effects for belief items
    beliefItems.forEach(item => {
        const icon = item.querySelector('.belief-icon i');
        const title = item.querySelector('.belief-text h4');
        
        item.addEventListener('mouseenter', function() {
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.color = 'var(--accent-color)';
            }
            if (title) {
                title.style.color = 'var(--accent-color)';
            }
            this.style.boxShadow = '0 15px 35px rgba(44, 62, 80, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.color = 'var(--primary-color)';
            }
            if (title) {
                title.style.color = 'var(--primary-color)';
            }
            this.style.boxShadow = 'var(--shadow-light)';
        });
    });
    
    // Floating animation for belief icons
    const floatingAnimation = () => {
        beliefIcons.forEach((icon, index) => {
            icon.style.animation = `float 3s ease-in-out infinite`;
            icon.style.animationDelay = `${index * 0.2}s`;
        });
    };
    
    // Add floating keyframes
    const floatingStyle = document.createElement('style');
    floatingStyle.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-10px);
            }
        }
        
        @keyframes glow {
            0%, 100% {
                box-shadow: 0 0 5px rgba(230, 126, 34, 0.3);
            }
            50% {
                box-shadow: 0 0 20px rgba(230, 126, 34, 0.6);
            }
        }
    `;
    document.head.appendChild(floatingStyle);
    
    // Initialize floating animation
    setTimeout(floatingAnimation, 1000);
    
    // Scroll progress indicator for the section
    const createScrollProgress = () => {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--accent-color), #D35400);
            z-index: 1000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const sectionTop = beliefsSection.offsetTop;
            const sectionHeight = beliefsSection.offsetHeight;
            const scrollTop = window.pageYOffset;
            const windowHeight = window.innerHeight;
            
            if (scrollTop >= sectionTop && scrollTop <= sectionTop + sectionHeight) {
                const progress = ((scrollTop - sectionTop) / sectionHeight) * 100;
                progressBar.style.width = Math.min(progress, 100) + '%';
            } else if (scrollTop < sectionTop) {
                progressBar.style.width = '0%';
            } else {
                progressBar.style.width = '100%';
            }
        });
    };
    
    // Initialize scroll progress
    createScrollProgress();
    
    // Add entrance animation for the entire section
    const sectionEntrance = () => {
        beliefsSection.style.opacity = '0';
        beliefsSection.style.transform = 'translateY(50px)';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transition = 'all 1s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(beliefsSection);
    };
    
    // Initialize section entrance
    sectionEntrance();
    
    // Performance optimization: Debounce scroll events
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };
    
    // Apply debouncing to scroll events
    const debouncedScrollHandler = debounce(() => {
        // Any scroll-based animations can be added here
    }, 10);
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // Cleanup function for better performance
    const cleanup = () => {
        window.removeEventListener('scroll', debouncedScrollHandler);
    };
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', cleanup);
    
    console.log('Beliefs section animations initialized successfully!');


// Additional utility functions for enhanced interactivity
const BeliefsAnimations = {
    // Method to restart animations
    restartAnimations: function() {
        const animatedElements = document.querySelectorAll('.animated');
        animatedElements.forEach(element => {
            element.classList.remove('animated');
            setTimeout(() => {
                element.classList.add('animated');
            }, 100);
        });
    },
    
    // Method to pause all animations
    pauseAnimations: function() {
        const style = document.createElement('style');
        style.id = 'pause-animations';
        style.textContent = '*, *::before, *::after { animation-play-state: paused !important; }';
        document.head.appendChild(style);
    },
    
    // Method to resume animations
    resumeAnimations: function() {
        const pauseStyle = document.getElementById('pause-animations');
        if (pauseStyle) {
            pauseStyle.remove();
        }
    },
    
    // Method to highlight a specific belief
    highlightBelief: function(index) {
        const beliefItems = document.querySelectorAll('.belief-item');
        if (beliefItems[index]) {
            beliefItems[index].style.animation = 'glow 1s ease-in-out 3';
            beliefItems[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
};

// Make utility functions globally available
window.BeliefsAnimations = BeliefsAnimations;

