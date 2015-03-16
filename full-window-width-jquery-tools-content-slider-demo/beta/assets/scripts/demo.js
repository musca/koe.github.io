var _gaq=[['_setAccount','UA-21499673-1'],['_trackPageview']];(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.src='//www.google-analytics.com/ga.js';s.parentNode.insertBefore(g,s)}(document,'script'))
WebFontConfig = {
        google: { families: [ 'Crimson Text:600', 'Droid Sans' ] }
      };
      (function() {
        var wf = document.createElement('script');
        wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
            '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
      })();
/* 
	Full window width content slider by Karl Oskar Engdahl
	for more information visit:
	http://www.musca.se/full-window-width-jquery-tools-content-slider-demo/

	This code is licensed under GPL and free to use. 
	http://www.gnu.org/licenses/gpl.html
*/
$(function() {
	// Sets the slides width on page load
	if ($(window).width() > 959){ $('#items > div').css({ width: $(window).width() }); }
	// Scrollable, Navigator and Autoscroll settings.
	$('#slider').scrollable({ 
		circular: true, 
		touch: false, 
		easing: 'linear', 
		speed: 1100
	}).navigator({ 
		navi: '#navigation' 
	}).autoscroll({ 
		autoplay: true,
		autopause:true, 
		interval: 5000 
	}).fullwidth();
	// Window resize code
	api = $('#slider').data('scrollable');
	$(window).resize(function() {
		var a = 1 + api.getIndex();
		var w = $(window).width();
		if (w > 959) {
			var l = a * w
			$('#items').css({ left: + - +l });
			$('#items > div').css({ width: w });
		} else {
			$('#items > div').css({ width: 960 });
		}
	});


	// Configuration code
	conf = $('#slider').scrollable().getConf();
   	$('#easing').change(function() {
   		var easing = $(this).val();
   		conf.easing = easing
   		$('#easing-value').text(easing);
   	});
   	head.ready(function() {
   		//$('.on_off :checkbox').iphoneStyle();
   		$('.on_off :checkbox').iphoneStyle({
    		onChange: function(){
    			if(document.getElementById('on_off_on').checked==false) {
			        api.stop();
			    } else {
			        api.play();
			    }  
    		}
        });
        if(document.getElementById('on_off_on').checked==false) { api.stop(); }
		jQuery('#SliderSingle').slider({
	        from: 400,
	        to: 4000,
	        step: 100,
	        round: 0,
	        dimension: '&nbsp;MS',
	        skin: "round_plastic",
	        callback: function() {
	        	var value = parseInt($('#SliderSingle').val());
	            conf.speed = value
	            $('#value').text(value);
	    	}
		});
	}); 
});

	
