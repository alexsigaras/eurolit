document.addEventListener('DOMContentLoaded', function(){
	/* Modern navigation menu with smooth animations */
	const topNav = document.getElementById("topnav");
	if (topNav) {
		// Modern lava lamp effect replacement
		const navItems = topNav.querySelectorAll('li');
		let indicator = document.createElement('div');
		indicator.className = 'nav-indicator';
		indicator.style.cssText = `
			position: absolute;
			background: rgba(255,255,255,0.2);
			border-radius: 4px;
			transition: all 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55);
			pointer-events: none;
			z-index: -1;
		`;
		topNav.appendChild(indicator);

		// Set initial position
		const activeItem = topNav.querySelector('li.active') || navItems[0];
		if (activeItem) {
			updateIndicator(activeItem);
		}

		navItems.forEach(item => {
			item.addEventListener('mouseenter', () => {
				updateIndicator(item);
			});

			item.addEventListener('mouseleave', () => {
				const activeItem = topNav.querySelector('li.active') || navItems[0];
				updateIndicator(activeItem);
			});
		});

		function updateIndicator(item) {
			const rect = item.getBoundingClientRect();
			const navRect = topNav.getBoundingClientRect();
			indicator.style.width = rect.width + 'px';
			indicator.style.height = rect.height + 'px';
			indicator.style.left = (rect.left - navRect.left) + 'px';
			indicator.style.top = (rect.top - navRect.top) + 'px';
		}
	}

	// Hide dropdown menus initially (Opera Fix replacement)
	const dropdownMenus = document.querySelectorAll("#topnav ul");
	dropdownMenus.forEach(menu => {
		menu.style.display = "none";
	});

	// Dropdown functionality
	const menuItems = document.querySelectorAll("#topnav li");
	menuItems.forEach(item => {
		item.addEventListener('mouseenter', function(){
			const submenu = this.querySelector('ul:first-child');
			if (submenu) {
				submenu.style.visibility = "visible";
				submenu.style.display = "block";
				submenu.style.opacity = "0";
				submenu.style.transition = "opacity 0.4s ease";
				setTimeout(() => {
					submenu.style.opacity = "1";
				}, 10);
			}
		});

		item.addEventListener('mouseleave', function(){
			const submenu = this.querySelector('ul:first-child');
			if (submenu) {
				submenu.style.opacity = "0";
				setTimeout(() => {
					submenu.style.visibility = "hidden";
					submenu.style.display = "none";
				}, 400);
			}
		});
	});
});