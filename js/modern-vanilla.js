/**
 * Modern Vanilla JavaScript ES6+ Replacement for jQuery
 * Eurolit Website - Performance Optimized
 */

class EurolitApp {
    constructor() {
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onReady());
        } else {
            this.onReady();
        }
    }

    onReady() {
        this.initModernSlider();
        this.initImageHoverEffects();
        this.initNavigationEffects();
        this.initTabFunctionality();
        this.initToggleBoxes();
        this.initScrollToTop();
        this.initSearchFunctionality();
        this.initSidebarEffects();
        this.initFooterEffects();
        this.initPortfolioFilter();
        this.initFormHelpers();
    }

    // Modern Swiper Slider (already implemented)
    initModernSlider() {
        const carouselElement = document.querySelector('.eurolit-slider');
        if (carouselElement && window.Swiper) {
            const swiper = new window.Swiper('.eurolit-slider', {
                effect: 'slide',
                speed: 600,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                },
                loop: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    dynamicBullets: true,
                    dynamicMainBullets: 5,
                },
                keyboard: {
                    enabled: true,
                    onlyInViewport: true,
                },
                touchRatio: 1,
                touchAngle: 45,
                grabCursor: true,
                breakpoints: {
                    320: { spaceBetween: 10, slidesPerView: 1 },
                    768: { spaceBetween: 20, slidesPerView: 1 },
                    1024: { spaceBetween: 30, slidesPerView: 1 }
                },
                on: {
                    slideChange: function () {
                        // Optional analytics tracking
                    }
                }
            });

            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    swiper.autoplay.stop();
                } else {
                    swiper.autoplay.start();
                }
            });

            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                swiper.autoplay.stop();
            }
        }
    }

    // Image hover effects - vanilla replacement for jQuery animations
    initImageHoverEffects() {
        // Thumbnail hover effects
        const thumbnails = document.querySelectorAll('.thumbnail, .thumbs-rollover li a img, .project-gallery li a img, .gallery li a img');
        thumbnails.forEach(img => {
            img.addEventListener('mouseenter', () => {
                img.style.transition = 'opacity 0.3s ease';
                img.style.opacity = '0.5';
            });
            img.addEventListener('mouseleave', () => {
                img.style.opacity = '1';
            });
        });

        // Special thumbnail effects for certain pages
        const specialThumbnails = document.querySelectorAll('.thumbnail');
        specialThumbnails.forEach(thumb => {
            thumb.addEventListener('mouseenter', () => {
                // Set all thumbnails to 50% opacity
                specialThumbnails.forEach(t => t.style.opacity = '0.5');
                // Current thumbnail to full opacity
                thumb.style.opacity = '1';

                // Add image preview functionality if needed
                const imgContainer = document.getElementById('imgContainer');
                if (imgContainer) {
                    const previewImg = document.createElement('img');
                    previewImg.className = 'image';
                    previewImg.src = thumb.src;
                    imgContainer.appendChild(previewImg);
                }
            });

            thumb.addEventListener('mouseleave', () => {
                // Reset all thumbnails to full opacity
                specialThumbnails.forEach(t => t.style.opacity = '1');

                // Remove preview images
                const previewImages = document.querySelectorAll('.image');
                previewImages.forEach(img => img.remove());
            });
        });
    }

    // Navigation and menu effects
    initNavigationEffects() {
        // Submenu hover effects
        const submenuItems = document.querySelectorAll('ul.sf-menu>li>ul li');
        submenuItems.forEach(item => {
            const span = item.querySelector('a span');
            if (span) {
                item.addEventListener('mouseenter', () => {
                    span.style.transition = 'margin-left 0.3s ease';
                    span.style.marginLeft = '3px';
                });
                item.addEventListener('mouseleave', () => {
                    span.style.marginLeft = '0px';
                });
            }
        });

        // Blog posts hover effects
        const posts = document.querySelectorAll('#posts .post');
        posts.forEach(post => {
            const cover = post.querySelector('.thumb-shadow .post-thumbnail .cover');
            if (cover) {
                post.addEventListener('mouseenter', () => {
                    cover.style.transition = 'left 0.3s ease';
                    cover.style.left = '312px';
                });
                post.addEventListener('mouseleave', () => {
                    cover.style.left = '0px';
                });
            }
        });

        // Portfolio projects hover effects
        const projects = document.querySelectorAll('#projects-list .project');
        projects.forEach(project => {
            const cover = project.querySelector('.project-shadow .project-thumbnail .cover');
            if (cover) {
                project.addEventListener('mouseenter', () => {
                    cover.style.transition = 'top 0.3s ease';
                    cover.style.top = '133px';
                });
                project.addEventListener('mouseleave', () => {
                    cover.style.top = '0px';
                });
            }
        });
    }

    // Modern tab functionality
    initTabFunctionality() {
        const tabContainers = document.querySelectorAll('ul.tabs');
        tabContainers.forEach(tabContainer => {
            const tabs = tabContainer.querySelectorAll('li a');
            const panes = document.querySelectorAll('div.panes > div');

            tabs.forEach((tab, index) => {
                tab.addEventListener('click', (e) => {
                    e.preventDefault();

                    // Remove active class from all tabs
                    tabs.forEach(t => t.parentElement.classList.remove('active'));
                    // Add active class to clicked tab
                    tab.parentElement.classList.add('active');

                    // Hide all panes
                    panes.forEach(pane => {
                        pane.style.display = 'none';
                        pane.style.opacity = '0';
                    });

                    // Show corresponding pane with fade effect
                    if (panes[index]) {
                        panes[index].style.display = 'block';
                        setTimeout(() => {
                            panes[index].style.transition = 'opacity 0.3s ease';
                            panes[index].style.opacity = '1';
                        }, 10);
                    }
                });
            });
        });

        // Page-specific tab functionality (like flatness.html, projects.html, consulting.html)
        const hashTabs = document.querySelectorAll('.menu a');
        if (hashTabs.length > 0) {

            const showSection = (hash) => {
                // Handle different section patterns
                const sections = document.querySelectorAll('.content-section, .project-type-section');
                sections.forEach(section => section.style.display = 'none');

                const target = hash.substring(1);
                let targetSection = document.getElementById(target + '-section');

                // Fallback: try exact match
                if (!targetSection) {
                    targetSection = document.getElementById(target);
                }

                // Show target section or default
                if (targetSection) {
                    targetSection.style.display = 'block';
                } else {
                    // Try to find a default section
                    const defaultSection = document.getElementById('importance-section') ||
                                         document.getElementById('steel-fiber-section') ||
                                         document.getElementById('historic-section') ||
                                         sections[0];
                    if (defaultSection) defaultSection.style.display = 'block';
                }

                // Update active menu item
                const menuItems = document.querySelectorAll('.menu li');
                menuItems.forEach(item => item.classList.remove('active'));
                const activeLink = document.querySelector(`.menu a[href="${hash}"]`);
                if (activeLink) {
                    activeLink.parentElement.classList.add('active');
                }
            };

            hashTabs.forEach(tab => {
                tab.addEventListener('click', (e) => {
                    e.preventDefault();
                    const hash = tab.getAttribute('href');

                    // Store current scroll position
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                    // Update hash without scrolling
                    if (history.pushState) {
                        history.pushState(null, null, hash);
                    } else {
                        window.location.hash = hash;
                    }

                    // Show the section
                    showSection(hash);

                    // Restore scroll position to prevent unwanted jumping
                    window.scrollTo(0, scrollTop);
                });
            });

            window.addEventListener('hashchange', () => {
                const hash = window.location.hash;

                // Store current scroll position before processing hash change
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                if (hash) {
                    showSection(hash);
                } else {
                    // Show default section based on page
                    if (document.getElementById('importance-section')) {
                        showSection('#importance');
                    } else if (document.getElementById('steel-fiber-section')) {
                        showSection('#steel-fiber');
                    } else if (document.getElementById('historic-section')) {
                        showSection('#historic');
                    } else {
                        const firstSection = document.querySelector('.content-section, .project-type-section');
                        if (firstSection) {
                            firstSection.style.display = 'block';
                        }
                    }
                }

                // Restore scroll position after a small delay to ensure the hash change has been processed
                setTimeout(() => {
                    window.scrollTo(0, scrollTop);
                }, 0);
            });

            // Initialize on page load
            const initialHash = window.location.hash;
            if (initialHash) {
                showSection(initialHash);
            } else {
                // Show default section based on page
                if (document.getElementById('importance-section')) {
                    showSection('#importance');
                } else if (document.getElementById('steel-fiber-section')) {
                    showSection('#steel-fiber');
                } else if (document.getElementById('historic-section')) {
                    showSection('#historic');
                } else {
                    const firstSection = document.querySelector('.content-section, .project-type-section');
                    if (firstSection) {
                        firstSection.style.display = 'block';
                        // Set first menu item as active
                        const firstMenuItem = document.querySelector('.menu li');
                        if (firstMenuItem) firstMenuItem.classList.add('active');
                    }
                }
            }
        }
    }

    // Toggle boxes functionality
    initToggleBoxes() {
        const toggleTriggers = document.querySelectorAll('.toggle-trigger');
        toggleTriggers.forEach(trigger => {
            const container = trigger.nextElementSibling;
            if (container && container.classList.contains('toggle-container')) {
                container.style.display = 'none';

                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    trigger.classList.toggle('active');

                    if (container.style.display === 'none') {
                        container.style.display = 'block';
                        container.style.height = '0px';
                        container.style.overflow = 'hidden';
                        container.style.transition = 'height 0.5s ease';

                        // Get natural height
                        const naturalHeight = container.scrollHeight;
                        setTimeout(() => {
                            container.style.height = naturalHeight + 'px';
                        }, 10);

                        setTimeout(() => {
                            container.style.height = 'auto';
                            container.style.overflow = 'visible';
                        }, 500);
                    } else {
                        container.style.height = container.scrollHeight + 'px';
                        container.style.overflow = 'hidden';
                        container.style.transition = 'height 0.5s ease';

                        setTimeout(() => {
                            container.style.height = '0px';
                        }, 10);

                        setTimeout(() => {
                            container.style.display = 'none';
                        }, 500);
                    }
                });
            }
        });
    }

    // Scroll to top functionality
    initScrollToTop() {
        const scrollToTopBtn = document.getElementById('to-top');
        if (scrollToTopBtn) {
            scrollToTopBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // Search functionality
    initSearchFunctionality() {
        const searchInputs = document.querySelectorAll('input[type="text"]');
        searchInputs.forEach(input => {
            if (input.value === 'Search...' || input.placeholder === 'Search...') {
                input.addEventListener('focus', () => {
                    if (input.value === 'Search...') {
                        input.value = '';
                    }
                });

                input.addEventListener('blur', () => {
                    if (input.value === '') {
                        input.value = 'Search...';
                    }
                });
            }
        });
    }

    // Sidebar effects
    initSidebarEffects() {
        const sidebarItems = document.querySelectorAll('#sidebar>li>ul>li');
        sidebarItems.forEach(item => {
            const link = item.querySelector('a');
            if (link) {
                item.addEventListener('mouseenter', () => {
                    link.style.transition = 'margin-left 0.3s ease';
                    link.style.marginLeft = '5px';
                });
                item.addEventListener('mouseleave', () => {
                    link.style.marginLeft = '0px';
                });
            }
        });
    }

    // Footer effects
    initFooterEffects() {
        const footerItems = document.querySelectorAll('#footer .col .page_item');
        footerItems.forEach(item => {
            const link = item.querySelector('a');
            if (link) {
                item.addEventListener('mouseenter', () => {
                    link.style.transition = 'margin-left 0.3s ease';
                    link.style.marginLeft = '5px';
                });
                item.addEventListener('mouseleave', () => {
                    link.style.marginLeft = '0px';
                });
            }
        });
    }

    // Portfolio filter (simplified version of Quicksand)
    initPortfolioFilter() {
        const filterButtons = document.querySelectorAll('#portfolio-filter a');
        const portfolioList = document.getElementById('portfolio-list');

        if (filterButtons.length > 0 && portfolioList) {
            // Store original items
            const allItems = Array.from(portfolioList.querySelectorAll('li'));

            filterButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();

                    const filterClass = button.getAttribute('rel');

                    // Add fade out effect
                    portfolioList.style.transition = 'opacity 0.3s ease';
                    portfolioList.style.opacity = '0';

                    setTimeout(() => {
                        // Clear current items
                        portfolioList.innerHTML = '';

                        // Filter items
                        const filteredItems = filterClass === 'all'
                            ? allItems
                            : allItems.filter(item => item.classList.contains(filterClass));

                        // Add filtered items
                        filteredItems.forEach(item => {
                            portfolioList.appendChild(item.cloneNode(true));
                        });

                        // Fade in
                        portfolioList.style.opacity = '1';

                        // Reinitialize effects for new items
                        this.initImageHoverEffects();
                    }, 300);
                });
            });
        }
    }

    // Form helpers (basic tooltip functionality)
    initFormHelpers() {
        const formInputs = document.querySelectorAll('.form-poshytip');
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                // Create simple tooltip
                const tooltip = document.createElement('div');
                tooltip.className = 'simple-tooltip';
                tooltip.textContent = input.getAttribute('title') || input.getAttribute('data-tooltip');
                tooltip.style.cssText = `
                    position: absolute;
                    background: #ffeaa7;
                    color: #2d3436;
                    padding: 5px 10px;
                    border-radius: 4px;
                    font-size: 12px;
                    z-index: 1000;
                    pointer-events: none;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                `;

                document.body.appendChild(tooltip);

                const rect = input.getBoundingClientRect();
                tooltip.style.left = (rect.right + 5) + 'px';
                tooltip.style.top = (rect.top + rect.height / 2 - tooltip.offsetHeight / 2) + 'px';

                input._tooltip = tooltip;
            });

            input.addEventListener('blur', () => {
                if (input._tooltip) {
                    input._tooltip.remove();
                    delete input._tooltip;
                }
            });
        });
    }
}

// Utility functions to replace common jQuery patterns
const $ = {
    // Simple element selection
    select: (selector) => document.querySelector(selector),
    selectAll: (selector) => document.querySelectorAll(selector),

    // Animation helper
    animate: (element, properties, duration = 300) => {
        if (!element) return;

        element.style.transition = `all ${duration}ms ease`;
        Object.assign(element.style, properties);

        return new Promise(resolve => {
            setTimeout(resolve, duration);
        });
    },

    // Simple AJAX replacement (if needed)
    ajax: async (url, options = {}) => {
        try {
            const response = await fetch(url, options);
            return await response.json();
        } catch (error) {
            console.error('AJAX Error:', error);
            throw error;
        }
    }
};

// Initialize the app
new EurolitApp();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EurolitApp, $ };
}