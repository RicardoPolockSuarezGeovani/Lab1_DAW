document.addEventListener('DOMContentLoaded', () => {
    const albumView = document.getElementById('album-view');
    const modalView = document.getElementById('modal-view');
    const modalImageContainer = document.querySelector('.modal-image-container');
    const prevButton = document.querySelector('.modal-nav.prev');
    const nextButton = document.querySelector('.modal-nav.next');
    
    let currentImageIndex = 0;
    let isModalOpen = false;
    
    function createImage(src, isThumbnail = true) {
        const image = document.createElement('img');
        image.src = src;
        if (isThumbnail) {
            image.alt = "Miniatura de animal";
            image.classList.add('thumbnail');
        } else {
            image.alt = "Imagen completa de animal";
        }
        return image;
    }
    
    function showModal(index) {
        currentImageIndex = index;
        const imageSrc = PHOTO_LIST[currentImageIndex];
        const image = createImage(imageSrc, false);
        
        modalImageContainer.innerHTML = '';
        modalImageContainer.appendChild(image);
        
        document.body.classList.add('no-scroll');
        modalView.classList.add('active');
        modalView.classList.remove('hidden');
        isModalOpen = true;
    }
    
    function hideModal() {
        document.body.classList.remove('no-scroll');
        modalView.classList.remove('active');
        setTimeout(() => {
            modalView.classList.add('hidden');
        }, 300);
        isModalOpen = false;
    }
    
    function navigate(direction) {
        if (direction === 'prev') {
            currentImageIndex = (currentImageIndex - 1 + PHOTO_LIST.length) % PHOTO_LIST.length;
        } else if (direction === 'next') {
            currentImageIndex = (currentImageIndex + 1) % PHOTO_LIST.length;
        }
        showModal(currentImageIndex);
    }
    
    function handleKeyDown(e) {
        if (!isModalOpen) return;
        
        switch (e.key) {
            case 'Escape':
                hideModal();
                break;
            case 'ArrowLeft':
                navigate('prev');
                break;
            case 'ArrowRight':
                navigate('next');
                break;
        }
    }
    
    function initGallery() {
        PHOTO_LIST.forEach((photoSrc, index) => {
            const image = createImage(photoSrc);
            image.addEventListener('click', () => showModal(index));
            albumView.appendChild(image);
        });
        
        prevButton.addEventListener('click', (e) => {
            e.stopPropagation();
            navigate('prev');
        });
        
        nextButton.addEventListener('click', (e) => {
            e.stopPropagation();
            navigate('next');
        });
        
        modalView.addEventListener('click', (e) => {
            if (e.target === modalView || e.target.classList.contains('modal-image-container')) {
                hideModal();
            }
        });
        
        document.addEventListener('keydown', handleKeyDown);
    }
    
    initGallery();
});