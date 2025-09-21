// Modern Tab functionality for contact page
document.addEventListener('DOMContentLoaded', function(){
    // Tab functionality - hide all content and show first tab
    document.querySelectorAll(".tab-content").forEach(content => {
        content.style.display = 'none';
    });

    const firstTab = document.querySelector("ul.tabs li:first-child");
    const firstContent = document.querySelector(".tab-content:first-child");

    if (firstTab) {
        firstTab.classList.add("active");
        firstTab.style.display = 'block';
    }

    if (firstContent) {
        firstContent.style.display = 'block';
    }

    // Tab click handler
    document.querySelectorAll("ul.tabs li").forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all tabs
            document.querySelectorAll("ul.tabs li").forEach(t => {
                t.classList.remove("active");
            });

            // Add active class to clicked tab
            this.classList.add("active");

            // Hide all tab content
            document.querySelectorAll(".tab-content").forEach(content => {
                content.style.display = 'none';
                content.style.opacity = '0';
            });

            // Find and show active tab content
            const link = this.querySelector("a");
            if (link) {
                const activeTab = link.getAttribute("href");
                const activeContent = document.querySelector(activeTab);
                if (activeContent) {
                    activeContent.style.display = 'block';
                    activeContent.style.transition = 'opacity 0.3s ease';
                    setTimeout(() => {
                        activeContent.style.opacity = '1';
                    }, 10);
                }
            }

            return false;
        });
    });
});