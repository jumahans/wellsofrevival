document.addEventListener('DOMContentLoaded', function () {
    const galleryGrid = document.querySelector('.gallery-grid');
    const galleryPrev = document.querySelector('.gallery-prev');
    const galleryNext = document.querySelector('.gallery-next');
    const galleryItems = document.querySelectorAll('.gallery-item');

    const itemsPerPage = 8;
    let currentPage = 0;

    function showGalleryPage(page) {
        const start = page * itemsPerPage;
        const end = start + itemsPerPage;

        galleryItems.forEach((item, index) => {
            item.style.display = index >= start && index < end ? 'block' : 'none';
        });
    }

    if (galleryPrev && galleryNext) {
        galleryPrev.addEventListener('click', () => {
            if (currentPage > 0) {
                currentPage--;
                showGalleryPage(currentPage);
            }
        });

        galleryNext.addEventListener('click', () => {
            const maxPage = Math.floor((galleryItems.length - 1) / itemsPerPage);
            if (currentPage < maxPage) {
                currentPage++;
                showGalleryPage(currentPage);
            }
        });
    }

    // Init first page
    showGalleryPage(currentPage);

    // Modal functionality
    const modal = document.querySelector('.gallery-modal');
    const modalImg = document.getElementById('modal-image');
    const modalCaption = document.querySelector('.modal-caption');
    const closeModal = document.querySelector('.close-modal');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');

    let currentModalIndex = 0;

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentModalIndex = index;
            openModal(index);
        });
    });

    function openModal(index) {
        const img = galleryItems[index].querySelector('img');
        const caption = galleryItems[index].querySelector('h4')?.textContent || img.alt;

        modalImg.src = img.src;
        modalCaption.textContent = caption;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModalFunc() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunc);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });

    modalPrev?.addEventListener('click', () => {
        currentModalIndex = (currentModalIndex - 1 + galleryItems.length) % galleryItems.length;
        openModal(currentModalIndex);
    });

    modalNext?.addEventListener('click', () => {
        currentModalIndex = (currentModalIndex + 1) % galleryItems.length;
        openModal(currentModalIndex);
    });
    // section for block content 

    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                modalPrev?.click();
            } else if (e.key === 'ArrowRight') {
                modalNext?.click();
            } else if (e.key === 'Escape') {
                closeModalFunc();
            }
        }
    });
});
