jQuery(document).ready(function() {
	jQuery("#twitter").getTwitter({
		userName: "templatesquare",
		numTweets: 1,
		loaderText: "Loading tweets...",
		slideIn: false,
		slideDuration: 750,
		showHeading:false,
		showProfileLink: false,
		showTimestamp: false
	});
});
