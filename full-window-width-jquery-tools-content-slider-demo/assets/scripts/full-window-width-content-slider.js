/* 
 Full window width content slider by Oskar Engdahl
 http://www.musca.se/full-window-width-jquery-tools-content-slider-demo/
 
 This code is licensed under GPL and free to use. 
 http://www.gnu.org/licenses/gpl.html
*/
$(function() {
	$("HTML").addClass("JS"); 
	var i = $(window).width();
	if (i > 959){ $('#items > div').css({ width: i }); }
	// Scrollable settings
	$("#header-content").scrollable({ easing: 'easeInOutBack', speed: 900, circular: true }).navigator({ navi: '#navigation' }
	).autoscroll({ autoplay: false, autopause: false, interval: 5000 });
	// Window resize code
	window.api = $("#header-content").data("scrollable");
	$(window).resize(function() {
		var a = 1 + window.api.getIndex(); // If autoscroll is disabled, delete: 1 + .
		var w = $(window).width();
		if (w > 959) {
			var l = a * w
			$('#items').css({ left: + - +l });
			$('#items > div').css({ width: w });
		} else {
			$('#items > div').css({ width: 960 });
		}
	});
	// On/off toggle code
	$("#toggle").bind("click", function() {
		if ($(this).attr('class') == "off")
			$(this).attr('class', "on");
		else
			$(this).attr('class', "off");
	});
});