// Common Eurolit website JavaScript

// Cufon font replacement
function initCufon() {
    if (typeof Cufon !== 'undefined') {
        Cufon.replace('h1')('h2')('h3')('h4')('h5')('h6')('.slider-text h1', {textShadow: '#000 2px 0px 2px'})('.slider-text .button');
    }
}

// Content preloader initialization
function initPreloader() {
    if (typeof jQuery !== 'undefined') {
        jQuery(document).ready(function(){
            jQuery("#content").preloader();
        });
    }
}

// Remove noscript styles when JavaScript is enabled
function removeNoscriptStyles() {
    if (typeof jQuery !== 'undefined') {
        jQuery('#noscript').remove();
    }
}

// Initialize common functionality
jQuery(document).ready(function() {
    initPreloader();
    removeNoscriptStyles();
});

// Initialize Cufon after page load
if (typeof Cufon !== 'undefined') {
    initCufon();
    // Fix Cufon IE problems
    Cufon.now();
}