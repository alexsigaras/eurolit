jQuery(document).ready(function(){
	/* Function for lavalamp navigation menu and dropdown */	
	jQuery("#topnav").lavaLamp({
		fx: "backout",
		speed: 700
	});
	jQuery(" #topnav ul ").css({display: "none"}); // Opera Fix
	jQuery(" #topnav li").hover(function(){
	jQuery(this).find('ul:first').css({visibility: "visible",display: "none"}).slideDown(400);
	},function(){
	jQuery(this).find('ul:first').css({visibility: "hidden",display: "none"});
	});
			
});

