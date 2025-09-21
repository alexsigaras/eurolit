// Modern Vanilla JavaScript - No jQuery dependency
document.addEventListener('DOMContentLoaded', function() {

	// Modern Responsive Carousel ------------------------------------------------------ //

	// Initialize carousel only if element exists
	const carouselElement = document.querySelector('.eurolit-slider');
	if (carouselElement) {
		const swiper = new Swiper('.eurolit-slider', {
			// Smooth slide transition
			effect: 'slide',
			speed: 600,

			// Auto-play settings
			autoplay: {
				delay: 4000,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			},

			// Loop through slides
			loop: true,


			// Navigation
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},

			// Pagination
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
				dynamicBullets: true,
				dynamicMainBullets: 5,
			},

			// Keyboard navigation
			keyboard: {
				enabled: true,
				onlyInViewport: true,
			},

			// Touch/swipe settings
			touchRatio: 1,
			touchAngle: 45,
			grabCursor: true,

			// Responsive breakpoints
			breakpoints: {
				320: {
					spaceBetween: 10,
					slidesPerView: 1,
				},
				768: {
					spaceBetween: 20,
					slidesPerView: 1,
				},
				1024: {
					spaceBetween: 30,
					slidesPerView: 1,
				}
			},

			// Events
			on: {
				slideChange: function () {
					// Optional: Add analytics tracking here
					// console.log('Slide changed to:', this.activeIndex);
				}
			}
		});

		// Pause autoplay when page is not visible
		document.addEventListener('visibilitychange', function() {
			if (document.hidden) {
				swiper.autoplay.stop();
			} else {
				swiper.autoplay.start();
			}
		});

		// Handle reduced motion preference
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			swiper.autoplay.stop();
		}
	}
	
	// Modern Tooltips (replacing Poshytips) ------------------------------------------------------ //

	// Simple tooltip implementation for elements with 'poshytip' class
	document.querySelectorAll('.poshytip').forEach(element => {
		element.addEventListener('mouseenter', function(e) {
			const tooltip = document.createElement('div');
			tooltip.className = 'modern-tooltip tip-twitter';
			tooltip.textContent = this.getAttribute('title') || this.getAttribute('data-tooltip');
			tooltip.style.cssText = `
				position: absolute;
				background: rgba(0,0,0,0.8);
				color: white;
				padding: 5px 10px;
				border-radius: 4px;
				font-size: 12px;
				z-index: 9999;
				pointer-events: none;
			`;
			document.body.appendChild(tooltip);

			const rect = this.getBoundingClientRect();
			tooltip.style.left = (rect.left + rect.width/2 - tooltip.offsetWidth/2) + 'px';
			tooltip.style.top = (rect.bottom + 5) + 'px';

			this._tooltip = tooltip;
		});

		element.addEventListener('mouseleave', function() {
			if (this._tooltip) {
				this._tooltip.remove();
				this._tooltip = null;
			}
		});
	});

	// Form tooltips
	document.querySelectorAll('.form-poshytip').forEach(element => {
		element.addEventListener('focus', function(e) {
			const tooltip = document.createElement('div');
			tooltip.className = 'modern-tooltip tip-yellowsimple';
			tooltip.textContent = this.getAttribute('title') || this.getAttribute('data-tooltip');
			tooltip.style.cssText = `
				position: absolute;
				background: #fffbcc;
				color: #333;
				padding: 5px 10px;
				border: 1px solid #ddd;
				border-radius: 4px;
				font-size: 12px;
				z-index: 9999;
			`;
			document.body.appendChild(tooltip);

			const rect = this.getBoundingClientRect();
			tooltip.style.left = (rect.right + 5) + 'px';
			tooltip.style.top = rect.top + 'px';

			this._tooltip = tooltip;
		});

		element.addEventListener('blur', function() {
			if (this._tooltip) {
				this._tooltip.remove();
				this._tooltip = null;
			}
		});
	});
	
	// Modern Menu (replacing Superfish) ------------------------------------------------------ //

	const menuElement = document.querySelector("ul.sf-menu");
	if (menuElement) {
		const menuItems = menuElement.querySelectorAll('li');

		menuItems.forEach(item => {
			const submenu = item.querySelector('ul');
			if (submenu) {
				let hideTimeout;

				item.addEventListener('mouseenter', function() {
					clearTimeout(hideTimeout);
					submenu.style.display = 'block';
					submenu.style.height = 'auto';
				});

				item.addEventListener('mouseleave', function() {
					hideTimeout = setTimeout(() => {
						submenu.style.display = 'none';
					}, 800);
				});
			}
		});
	}
    
    // Scroll to top ------------------------------------------------------ //

	const scrollToTopElement = document.getElementById('to-top');
	if (scrollToTopElement) {
		scrollToTopElement.addEventListener('click', function(e) {
			e.preventDefault();
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth'
			});
		});
	}
		
	// Submenu rollover --------------------------------------------- //

	document.querySelectorAll("ul.sf-menu>li>ul li").forEach(item => {
		item.addEventListener('mouseenter', function() {
			const span = this.querySelector('a span');
			if (span) {
				span.style.transition = 'margin-left 0.2s ease';
				span.style.marginLeft = '3px';
			}
		});

		item.addEventListener('mouseleave', function() {
			const span = this.querySelector('a span');
			if (span) {
				span.style.marginLeft = '0px';
			}
		});
	});
	
	// Tweet Feed ------------------------------------------------------ //

	const tweetsElement = document.getElementById("tweets");
	if (tweetsElement) {
		// Modern Twitter integration would require API keys
		tweetsElement.innerHTML = '<p style="color: #666; font-style: italic;">Twitter feed temporarily unavailable</p>';
	}
	
	// Tweet arrows rollover --------------------------------------------- //

	const prevTweet = document.querySelector("#twitter #prev-tweet");
	if (prevTweet) {
		prevTweet.addEventListener('mouseenter', function() {
			this.style.transition = 'left 0.2s ease';
			this.style.left = '27px';
		});
		prevTweet.addEventListener('mouseleave', function() {
			this.style.left = '30px';
		});
	}

	const nextTweet = document.querySelector("#twitter #next-tweet");
	if (nextTweet) {
		nextTweet.addEventListener('mouseenter', function() {
			this.style.transition = 'right 0.2s ease';
			this.style.right = '27px';
		});
		nextTweet.addEventListener('mouseleave', function() {
			this.style.right = '30px';
		});
	}

	// Tweet cycle --------------------------------------------- //

	function tweet_cycle() {
		// Modern implementation would use IntersectionObserver or custom slider
		// For now, disabled since Twitter feed is not active
		console.log('Tweet cycle functionality disabled - Twitter feed not available');
	}
	
	// tabs ------------------------------------------------------ //

	// Modern tabs implementation
	const tabsContainer = document.querySelector("ul.tabs");
	const panesContainer = document.querySelector("div.panes");
	if (tabsContainer && panesContainer) {
		const tabs = tabsContainer.querySelectorAll('li a');
		const panes = panesContainer.querySelectorAll('div');

		tabs.forEach((tab, index) => {
			tab.addEventListener('click', function(e) {
				e.preventDefault();

				// Remove active class from all tabs and panes
				tabs.forEach(t => t.parentElement.classList.remove('active'));
				panes.forEach(p => {
					p.style.display = 'none';
					p.style.opacity = '0';
				});

				// Add active class to current tab
				this.parentElement.classList.add('active');

				// Show current pane with fade effect
				if (panes[index]) {
					panes[index].style.display = 'block';
					panes[index].style.transition = 'opacity 0.3s ease';
					setTimeout(() => {
						panes[index].style.opacity = '1';
					}, 10);
				}
			});
		});
	}
	
	// Thumbs rollover --------------------------------------------- //

	document.querySelectorAll('.thumbs-rollover li a img').forEach(img => {
		img.addEventListener('mouseenter', function() {
			this.style.transition = 'opacity 0.2s ease';
			this.style.opacity = '0.5';
		});

		img.addEventListener('mouseleave', function() {
			this.style.opacity = '1';
		});
	});
		
	
	// Blog posts rollover --------------------------------------------- //

	document.querySelectorAll('#posts .post').forEach(post => {
		post.addEventListener('mouseenter', function() {
			const cover = this.querySelector('.thumb-shadow .post-thumbnail .cover');
			if (cover) {
				cover.style.transition = 'left 0.2s ease';
				cover.style.left = '312px';
			}
		});

		post.addEventListener('mouseleave', function() {
			const cover = this.querySelector('.thumb-shadow .post-thumbnail .cover');
			if (cover) {
				cover.style.left = '0px';
			}
		});
	});
	
	// Portfolio projects rollover --------------------------------------------- //

	document.querySelectorAll('#projects-list .project').forEach(project => {
		project.addEventListener('mouseenter', function() {
			const cover = this.querySelector('.project-shadow .project-thumbnail .cover');
			if (cover) {
				cover.style.transition = 'top 0.2s ease';
				cover.style.top = '133px';
			}
		});

		project.addEventListener('mouseleave', function() {
			const cover = this.querySelector('.project-shadow .project-thumbnail .cover');
			if (cover) {
				cover.style.top = '0px';
			}
		});
	});
	
	// Sidebar rollover --------------------------------------------------- //

	document.querySelectorAll('#sidebar>li>ul>li').forEach(item => {
		item.addEventListener('mouseenter', function() {
			const link = this.querySelector('a');
			if (link) {
				link.style.transition = 'margin-left 0.2s ease';
				link.style.marginLeft = '5px';
			}
		});

		item.addEventListener('mouseleave', function() {
			const link = this.querySelector('a');
			if (link) {
				link.style.marginLeft = '0px';
			}
		});
	});
	
	// Modern Lightbox (replacing Fancybox and PrettyPhoto) --------------------------------------------------- //

	// Simple lightbox implementation for fancybox links
	document.querySelectorAll("a.fancybox, a[rel^='prettyPhoto']").forEach(link => {
		link.addEventListener('click', function(e) {
			e.preventDefault();
			const src = this.href;

			// Create lightbox overlay
			const overlay = document.createElement('div');
			overlay.style.cssText = `
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: rgba(0,0,0,0.8);
				z-index: 10000;
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;
			`;

			// Create image
			const img = document.createElement('img');
			img.src = src;
			img.style.cssText = `
				max-width: 90%;
				max-height: 90%;
				object-fit: contain;
			`;

			overlay.appendChild(img);
			document.body.appendChild(overlay);

			// Close on click
			overlay.addEventListener('click', function() {
				this.remove();
			});

			// Close on escape
			const escapeHandler = function(e) {
				if (e.key === 'Escape') {
					overlay.remove();
					document.removeEventListener('keydown', escapeHandler);
				}
			};
			document.addEventListener('keydown', escapeHandler);
		});
	});


	// Project gallery over --------------------------------------------- //

	document.querySelectorAll('.project-gallery li a img').forEach(img => {
		img.addEventListener('mouseenter', function() {
			this.style.transition = 'opacity 0.2s ease';
			this.style.opacity = '0.5';
		});

		img.addEventListener('mouseleave', function() {
			this.style.opacity = '1';
		});
	});
	
	
	// Modern Thumbs functions ------------------------------------------------------ //

	function thumbsFunctions(){
		// Gallery hover effects
		document.querySelectorAll('.gallery li a img').forEach(img => {
			img.addEventListener('mouseenter', function() {
				this.style.transition = 'opacity 0.2s ease';
				this.style.opacity = '0.5';
			});

			img.addEventListener('mouseleave', function() {
				this.style.opacity = '1';
			});
		});

		// Gallery tooltips
		document.querySelectorAll('.gallery a').forEach(link => {
			link.addEventListener('mouseenter', function(e) {
				const tooltip = document.createElement('div');
				tooltip.className = 'modern-tooltip tip-twitter';
				tooltip.textContent = this.getAttribute('title') || this.getAttribute('data-tooltip');
				tooltip.style.cssText = `
					position: absolute;
					background: rgba(0,0,0,0.8);
					color: white;
					padding: 5px 10px;
					border-radius: 4px;
					font-size: 12px;
					z-index: 9999;
					pointer-events: none;
				`;
				document.body.appendChild(tooltip);

				const rect = this.getBoundingClientRect();
				tooltip.style.left = (rect.left + rect.width/2 - tooltip.offsetWidth/2) + 'px';
				tooltip.style.top = (rect.top - 15 - tooltip.offsetHeight) + 'px';

				this._tooltip = tooltip;
			});

			link.addEventListener('mouseleave', function() {
				if (this._tooltip) {
					this._tooltip.remove();
					this._tooltip = null;
				}
			});
		});
	}
	// init
	thumbsFunctions();
	
	// Modern Portfolio Filter (replacing Quicksand) -----------------------------------------------------------//

	const portfolioList = document.querySelector('ul#portfolio-list');
	if (portfolioList) {
		// Add unique IDs to portfolio items
		const portfolioItems = portfolioList.querySelectorAll('li');
		portfolioItems.forEach((item, index) => {
			item.id = 'unique_item' + index;
		});

		// Portfolio filter functionality
		const filterLinks = document.querySelectorAll('#portfolio-filter a');
		filterLinks.forEach(link => {
			link.addEventListener('click', function(e) {
				e.preventDefault();
				const filterClass = this.getAttribute('rel');

				// Show/hide items based on filter
			portfolioItems.forEach(item => {
					if (filterClass === 'all' || item.classList.contains(filterClass)) {
						item.style.display = 'block';
						item.style.opacity = '0';
						item.style.transition = 'opacity 0.5s ease';
						setTimeout(() => {
							item.style.opacity = '1';
						}, 10);
					} else {
						item.style.opacity = '0';
						setTimeout(() => {
							item.style.display = 'none';
						}, 500);
					}
				});

				// Restart thumbs functions after filter
				setTimeout(() => {
					thumbsFunctions();
				}, 600);
			});
		});
	}

		
	// Modern Accordion ------------------------------------------------------ //

	document.querySelectorAll(".accordion").forEach(accordion => {
		const headers = accordion.querySelectorAll('.accordion-header, h3');
		headers.forEach(header => {
			header.addEventListener('click', function() {
				const content = this.nextElementSibling;
				if (content) {
					// Close all other panels
					headers.forEach(otherHeader => {
						if (otherHeader !== this) {
							const otherContent = otherHeader.nextElementSibling;
							if (otherContent) {
								otherContent.style.display = 'none';
								otherHeader.classList.remove('active');
							}
						}
					});

					// Toggle current panel
					if (content.style.display === 'none' || !content.style.display) {
						content.style.display = 'block';
						this.classList.add('active');
					} else {
						content.style.display = 'none';
						this.classList.remove('active');
					}
				}
			});
		});
	});
	
	// Modern Toggle box ------------------------------------------------------ //

	document.querySelectorAll(".toggle-container").forEach(container => {
		container.style.display = 'none';
	});

	document.querySelectorAll(".toggle-trigger").forEach(trigger => {
		trigger.addEventListener('click', function(e) {
			e.preventDefault();
			this.classList.toggle('active');
			const container = this.nextElementSibling;
			if (container && container.classList.contains('toggle-container')) {
				if (container.style.display === 'none' || !container.style.display) {
					container.style.display = 'block';
					container.style.transition = 'opacity 0.5s ease';
					container.style.opacity = '0';
					setTimeout(() => {
						container.style.opacity = '1';
					}, 10);
				} else {
					container.style.opacity = '0';
					setTimeout(() => {
						container.style.display = 'none';
					}, 500);
				}
			}
			return false;
		});
	});
	
	// Footer menu rollover --------------------------------------------------- //

	document.querySelectorAll('#footer .col .page_item').forEach(item => {
		item.addEventListener('mouseenter', function() {
			const link = this.querySelector('a');
			if (link) {
				link.style.transition = 'margin-left 0.2s ease';
				link.style.marginLeft = '5px';
			}
		});

		item.addEventListener('mouseleave', function() {
			const link = this.querySelector('a');
			if (link) {
				link.style.marginLeft = '0px';
			}
		});
	});

//close
});
	
// search clearance	
function defaultInput(target){
	if((target).value == 'Search...'){(target).value=''}
}

function clearInput(target){
	if((target).value == ''){(target).value='Search...'}
}



