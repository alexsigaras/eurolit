// Modern Image Zoomer - Vanilla JavaScript Implementation
class Zoomer {
    constructor(elements, options = {}) {
        this.options = {
            speedView: 200,
            speedRemove: 400,
            altAnim: false,
            speedTitle: 400,
            debug: false,
            ...options
        };

        this.elements = typeof elements === 'string' ?
            document.querySelectorAll(elements) :
            elements;

        this.init();
    }

    debug(message) {
        if (this.options.debug) {
            if (typeof console !== "undefined" && typeof console.log !== "undefined") {
                console.log(message);
            } else {
                alert(message);
            }
        }
    }

    init() {
        if (this.options.debug) {
            this.debug('speedView: ' + this.options.speedView);
            this.debug('speedRemove: ' + this.options.speedRemove);
            this.debug('altAnim: ' + this.options.altAnim);
            this.debug('speedTitle: ' + this.options.speedTitle);
        }

        this.elements.forEach(element => {
            this.setupZoom(element);
        });
    }

    setupZoom(element) {
        const img = element.querySelector('img');
        if (!img) return;

        element.addEventListener('mouseenter', () => {
            element.style.zIndex = '10';

            img.classList.add('hover');

            // Apply zoom animation
            img.style.transition = `all ${this.options.speedView}ms ease`;
            img.style.transform = 'scale(1.5)';
            img.style.marginTop = '-110px';
            img.style.marginLeft = '-110px';
            img.style.top = '80%';
            img.style.left = '70%';
            img.style.width = '150px';
            img.style.height = '120px';
            img.style.padding = '20px';

            // Show title if altAnim is enabled
            if (this.options.altAnim) {
                const alt = img.getAttribute('alt');
                if (alt && alt.length > 0) {
                    const titleSpan = document.createElement('span');
                    titleSpan.className = 'title';
                    titleSpan.textContent = alt;
                    titleSpan.style.cssText = `
                        z-index: 10;
                        position: absolute;
                        float: left;
                        margin-left: -42px;
                        margin-top: 90px;
                        transition: all ${this.options.speedTitle}ms ease;
                    `;
                    element.insertBefore(titleSpan, element.firstChild);
                }
            }
        });

        element.addEventListener('mouseleave', () => {
            element.style.zIndex = '0';

            img.classList.remove('hover');

            // Reset zoom animation
            img.style.transition = `all ${this.options.speedRemove}ms ease`;
            img.style.transform = 'scale(1)';
            img.style.marginTop = '0';
            img.style.marginLeft = '0';
            img.style.top = '0';
            img.style.left = '0';
            img.style.width = '100px';
            img.style.height = '100px';
            img.style.padding = '5px';

            // Remove title
            const titleElement = element.querySelector('.title');
            if (titleElement) {
                titleElement.remove();
            }
        });
    }
}

// Global function to maintain compatibility with existing code
function initZoomer(selector, options) {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
        new Zoomer(elements, options);
    }
}

// Auto-initialize on DOM ready if elements exist
document.addEventListener('DOMContentLoaded', function() {
    // Look for common zoomer classes and initialize them
    const zoomElements = document.querySelectorAll('.zoom, .zoomer');
    if (zoomElements.length > 0) {
        new Zoomer(zoomElements);
    }
});