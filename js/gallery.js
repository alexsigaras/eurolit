// Modern Gallery Implementation
document.addEventListener('DOMContentLoaded', function(){

    // Add JS styles indicator
    document.body.classList.add('hasJS');

    // Modern homepage gallery implementation
    const featureGallery = document.getElementById('feature_gallery');
    if (featureGallery) {
        const bigImages = featureGallery.querySelectorAll('.bigimg');

        if (bigImages.length > 0) {
            // Wrap images in container
            const bigimgsContainer = document.createElement('div');
            bigimgsContainer.className = 'bigimgs';

            bigImages.forEach(img => {
                bigimgsContainer.appendChild(img);
            });

            // Create pager
            const pager = document.createElement('ul');
            pager.className = 'menu';
            pager.id = 'feature_gallery_pager';

            featureGallery.appendChild(bigimgsContainer);
            featureGallery.appendChild(pager);

            let currentIndex = 0;
            let slideInterval;

            // Build pager thumbnails
            bigImages.forEach((slide, idx) => {
                const img = slide.querySelector('img');
                if (img) {
                    const listItem = document.createElement('li');
                    const anchor = document.createElement('a');
                    const thumb = document.createElement('img');
                    const span = document.createElement('span');

                    anchor.href = '#';
                    thumb.src = img.src;
                    thumb.className = 'thumb';

                    anchor.appendChild(thumb);
                    anchor.appendChild(span);
                    listItem.appendChild(anchor);
                    pager.appendChild(listItem);

                    anchor.addEventListener('click', function(e) {
                        e.preventDefault();
                        showSlide(idx);
                    });
                }
            });

            // Show specific slide
            function showSlide(index) {
                bigImages.forEach((img, i) => {
                    img.style.display = i === index ? 'block' : 'none';
                    img.style.opacity = i === index ? '1' : '0';
                });

                const pagerItems = pager.querySelectorAll('li');
                pagerItems.forEach((item, i) => {
                    item.classList.toggle('active', i === index);
                });

                currentIndex = index;
                onBefore.call(bigImages[index]);
            }

            // Auto-advance slides
            function startSlideshow() {
                slideInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % bigImages.length;
                    showSlide(currentIndex);
                }, 5000);
            }

            // Pause on hover
            featureGallery.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });

            featureGallery.addEventListener('mouseleave', startSlideshow);

            // Initialize
            showSlide(0);
            startSlideshow();
        }
    }

    // Modern carousel controls
    const nextButton = document.getElementById('mycarousel-next');
    const prevButton = document.getElementById('mycarousel-prev');
    const pagerElement = document.getElementById('feature_gallery_pager');

    if (nextButton && pagerElement) {
        nextButton.addEventListener('click', function(e) {
            e.preventDefault();
            const items = pagerElement.querySelectorAll('li');
            if (items.length > 0) {
                const current = pagerElement.querySelector('li.active');
                const currentIndex = Array.from(items).indexOf(current);
                const nextIndex = (currentIndex + 1) % items.length;
                items[nextIndex].querySelector('a').click();
            }
            return false;
        });
    }

    if (prevButton && pagerElement) {
        prevButton.addEventListener('click', function(e) {
            e.preventDefault();
            const items = pagerElement.querySelectorAll('li');
            if (items.length > 0) {
                const current = pagerElement.querySelector('li.active');
                const currentIndex = Array.from(items).indexOf(current);
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
                items[prevIndex].querySelector('a').click();
            }
            return false;
        });
    }
});

function onBefore() {
    const output = document.getElementById('output');
    if (output) {
        output.textContent = this.id;
    }
}