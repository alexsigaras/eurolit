/**
 * Modern Lightbox - Vanilla JavaScript replacement for Fancybox
 * Lightweight, accessible, and performant
 */

class ModernLightbox {
    constructor(options = {}) {
        this.options = {
            closeOnOverlayClick: true,
            closeOnEscapeKey: true,
            showCloseButton: true,
            showNavigation: true,
            animationDuration: 300,
            ...options
        };

        this.currentIndex = 0;
        this.images = [];
        this.isOpen = false;

        this.init();
    }

    init() {
        this.createLightboxHTML();
        this.bindEvents();
        this.initializeImages();
    }

    createLightboxHTML() {
        const lightboxHTML = `
            <div id="modern-lightbox" class="modern-lightbox" style="display: none;">
                <div class="lightbox-overlay"></div>
                <div class="lightbox-container">
                    <div class="lightbox-content">
                        <img class="lightbox-image" src="" alt="">
                        <div class="lightbox-title"></div>
                    </div>
                    <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
                    <button class="lightbox-prev" aria-label="Previous image">&#8249;</button>
                    <button class="lightbox-next" aria-label="Next image">&#8250;</button>
                    <div class="lightbox-counter">
                        <span class="current">1</span> / <span class="total">1</span>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', lightboxHTML);

        // Add CSS styles
        const styles = `
            <style>
                .modern-lightbox {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 9999;
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity ${this.options.animationDuration}ms ease, visibility ${this.options.animationDuration}ms ease;
                }

                .modern-lightbox.active {
                    opacity: 1;
                    visibility: visible;
                }

                .lightbox-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    cursor: pointer;
                }

                .lightbox-container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 50px;
                    box-sizing: border-box;
                }

                .lightbox-content {
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                    text-align: center;
                    transform: scale(0.8);
                    transition: transform ${this.options.animationDuration}ms ease;
                }

                .modern-lightbox.active .lightbox-content {
                    transform: scale(1);
                }

                .lightbox-image {
                    max-width: 100%;
                    max-height: 100%;
                    height: auto;
                    border-radius: 8px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
                }

                .lightbox-title {
                    color: white;
                    background: rgba(0, 0, 0, 0.7);
                    padding: 10px 15px;
                    margin-top: 10px;
                    border-radius: 4px;
                    font-size: 14px;
                    line-height: 1.4;
                }

                .lightbox-close,
                .lightbox-prev,
                .lightbox-next {
                    position: absolute;
                    background: rgba(255, 255, 255, 0.9);
                    border: none;
                    color: #333;
                    font-size: 24px;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                    z-index: 10001;
                }

                .lightbox-close:hover,
                .lightbox-prev:hover,
                .lightbox-next:hover {
                    background: white;
                    transform: scale(1.1);
                }

                .lightbox-close {
                    top: 20px;
                    right: 20px;
                    font-size: 30px;
                }

                .lightbox-prev {
                    left: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                }

                .lightbox-next {
                    right: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                }

                .lightbox-counter {
                    position: absolute;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(0, 0, 0, 0.7);
                    color: white;
                    padding: 8px 15px;
                    border-radius: 20px;
                    font-size: 14px;
                }

                @media (max-width: 768px) {
                    .lightbox-container {
                        padding: 20px;
                    }

                    .lightbox-close,
                    .lightbox-prev,
                    .lightbox-next {
                        width: 44px;
                        height: 44px;
                        font-size: 18px;
                    }

                    .lightbox-close {
                        top: 10px;
                        right: 10px;
                    }

                    .lightbox-prev {
                        left: 10px;
                    }

                    .lightbox-next {
                        right: 10px;
                    }

                    .lightbox-counter {
                        bottom: 10px;
                        font-size: 12px;
                        padding: 6px 12px;
                    }
                }

                /* Hide navigation buttons when only one image */
                .modern-lightbox.single-image .lightbox-prev,
                .modern-lightbox.single-image .lightbox-next,
                .modern-lightbox.single-image .lightbox-counter {
                    display: none;
                }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);

        // Get DOM elements
        this.lightbox = document.getElementById('modern-lightbox');
        this.overlay = this.lightbox.querySelector('.lightbox-overlay');
        this.image = this.lightbox.querySelector('.lightbox-image');
        this.title = this.lightbox.querySelector('.lightbox-title');
        this.closeBtn = this.lightbox.querySelector('.lightbox-close');
        this.prevBtn = this.lightbox.querySelector('.lightbox-prev');
        this.nextBtn = this.lightbox.querySelector('.lightbox-next');
        this.counter = this.lightbox.querySelector('.lightbox-counter');
        this.currentSpan = this.lightbox.querySelector('.current');
        this.totalSpan = this.lightbox.querySelector('.total');
    }

    bindEvents() {
        // Close button
        this.closeBtn.addEventListener('click', () => this.close());

        // Overlay click
        if (this.options.closeOnOverlayClick) {
            this.overlay.addEventListener('click', () => this.close());
        }

        // Navigation
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());

        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (!this.isOpen) return;

            switch (e.key) {
                case 'Escape':
                    if (this.options.closeOnEscapeKey) this.close();
                    break;
                case 'ArrowLeft':
                    this.prev();
                    break;
                case 'ArrowRight':
                    this.next();
                    break;
            }
        });

        // Prevent closing when clicking on image
        this.image.addEventListener('click', (e) => e.stopPropagation());
    }

    initializeImages() {
        // Find all fancybox links and groups
        const fancyboxLinks = document.querySelectorAll('a.fancybox, a[rel^="example"], a[id^="example"], a[id^="various"]');

        fancyboxLinks.forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                // Build image group
                const rel = link.getAttribute('rel') || link.getAttribute('id') || 'single';
                this.images = [];

                if (rel.includes('group') || rel.includes('example_group')) {
                    // Group images
                    const groupLinks = document.querySelectorAll(`a[rel="${rel}"]`);
                    groupLinks.forEach(groupLink => {
                        this.images.push({
                            src: groupLink.href,
                            title: groupLink.title || groupLink.querySelector('img')?.alt || ''
                        });
                    });
                    this.currentIndex = Array.from(groupLinks).indexOf(link);
                } else {
                    // Single image
                    this.images = [{
                        src: link.href,
                        title: link.title || link.querySelector('img')?.alt || ''
                    }];
                    this.currentIndex = 0;
                }

                this.open();
            });
        });
    }

    open() {
        if (this.images.length === 0) return;

        this.isOpen = true;
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        // Set single image class if only one image
        if (this.images.length === 1) {
            this.lightbox.classList.add('single-image');
        } else {
            this.lightbox.classList.remove('single-image');
        }

        this.updateImage();
        this.lightbox.style.display = 'block';

        // Trigger animation
        setTimeout(() => {
            this.lightbox.classList.add('active');
        }, 10);
    }

    close() {
        this.isOpen = false;
        document.body.style.overflow = ''; // Restore scrolling

        this.lightbox.classList.remove('active');

        setTimeout(() => {
            this.lightbox.style.display = 'none';
        }, this.options.animationDuration);
    }

    updateImage() {
        if (this.currentIndex >= this.images.length) return;

        const currentImage = this.images[this.currentIndex];

        // Preload image
        const img = new Image();
        img.onload = () => {
            this.image.src = currentImage.src;
            this.title.textContent = currentImage.title;
            this.title.style.display = currentImage.title ? 'block' : 'none';
        };
        img.src = currentImage.src;

        // Update counter
        this.currentSpan.textContent = this.currentIndex + 1;
        this.totalSpan.textContent = this.images.length;
    }

    prev() {
        if (this.images.length <= 1) return;

        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateImage();
    }

    next() {
        if (this.images.length <= 1) return;

        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateImage();
    }
}

// Initialize the modern lightbox when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ModernLightbox();
    });
} else {
    new ModernLightbox();
}