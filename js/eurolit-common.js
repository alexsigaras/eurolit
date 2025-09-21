// Common Eurolit website JavaScript - Modern Vanilla Implementation

// Remove noscript styles when JavaScript is enabled
function removeNoscriptStyles() {
    const noscriptElement = document.getElementById('noscript');
    if (noscriptElement) {
        noscriptElement.remove();
    }
}

// Modern content loader (replaces jQuery preloader)
function initContentLoader() {
    const content = document.getElementById('content');
    if (content) {
        // Simple fade-in effect for content
        content.style.opacity = '0';
        content.style.transition = 'opacity 0.3s ease';

        // Ensure content is visible after DOM is ready
        setTimeout(() => {
            content.style.opacity = '1';
        }, 100);
    }
}

// Initialize common functionality when DOM is ready
function initCommonFunctionality() {
    removeNoscriptStyles();
    initContentLoader();
}

// Modern DOMContentLoaded replacement for jQuery(document).ready()
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCommonFunctionality);
} else {
    // DOM already loaded
    initCommonFunctionality();
}