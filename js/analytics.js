// Google Analytics 4 (gtag) initialization
(function() {
    // Load gtag script
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-NC1NCK6NK5';
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-NC1NCK6NK5');

    // Make gtag globally available
    window.gtag = gtag;
})();