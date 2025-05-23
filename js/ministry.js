document.addEventListener('DOMContentLoaded', function () {
    const heroImages = document.querySelectorAll('.hero-image');

    if (heroImages.length === 0) {
        console.error('No hero images found!');
        return;
    }

    let currentIndex = 0;

    // Initialize styles
    heroImages.forEach((img, index) => {
        img.classList.add('fade-image');
        img.style.opacity = '0';
        img.style.display = 'none';
    });

    // Show first image
    heroImages[currentIndex].style.display = 'block';
    requestAnimationFrame(() => {
        heroImages[currentIndex].style.opacity = '1';
    });

    function showNextImage() {
        const currentImage = heroImages[currentIndex];
        const nextIndex = (currentIndex + 1) % heroImages.length;
        const nextImage = heroImages[nextIndex];

        // Fade out current image
        currentImage.style.opacity = '0';

        // Wait for fade out before hiding and showing next
        setTimeout(() => {
            currentImage.style.display = 'none';

            // Prepare next image
            nextImage.style.display = 'block';

            // Use requestAnimationFrame to ensure next frame
            requestAnimationFrame(() => {
                nextImage.style.opacity = '1';
            });

            currentIndex = nextIndex;
        }, 1000); // Match this duration with CSS transition time
    }

    // Start looping
    setInterval(showNextImage, 6000);
});
