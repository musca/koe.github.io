//= include ['includes/header.js', 'vendor/*.js'] 
var o = $;

$(document).ready(function() {   
  o("body").addClass('loaded');
  var bLazy = new Blazy({ 
      // options
  });
  // Get github repos
  o.ajax({
      url: 'https://api.github.com/users/musca/repos?sort=updated'
    , type: 'jsonp'
    , method: 'get'
    , jsonpCallback: 'callback'
    , fail: function (err) { 
      alert("err");
    }
    , success: function (data) {
      
      var repos = data.data,
          tmpHolder = [];

      for (var i = 0; i < 5; i++) {

        var tmp = '  <a href="'+repos[i].html_url+'">'+repos[i].name+'</a> '+
                  '  <span class="language smaller-text">'+repos[i].language+'</span><br> '+
                  '  <p>'+repos[i].description+'</p> ';

        tmpHolder.push('<li>' + tmp + '</li>');
      };
      o(".github-projects").append(tmpHolder.join(''));
    }
  });
  //Flickr stream
	o.ajax({
	    url: 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&id=64589350@N05&lang=en-us'
	  , type: 'jsonp'
	  , method: 'get'
	  , jsonpCallback: 'jsoncallback'
	  , error: function (err) { 
	  	alert(err);
	  }
	  , success: function (data) {
	  	var items = data.items,
          imgHolder = [],
          li;

	  	items.sort(function() {return 0.5 - Math.random()});

	  	for (var u = 0; u < 6; u++) {
	  		li =	'  <a href="'+items[u].media.m.replace('_m','_b')+'" class="zoom" rel="group">' +
    	  			'    <img src=data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==   data-src="'+items[u].media.m+'" alt="flickr pictures" class="b-lazy"/>' +
              '  </a>';
        imgHolder.push('<li>' + li + '</li>');
	  	};

      o(".flickr-feed").append(imgHolder.join(''));
      var bLazy = new Blazy({ 
          // options
      });
	  	o('.flickr-feed, .flickr li').css('height', $('.flickr li').width() + 'px');
  		o(window).resize(function() {
  			o('.flickr li').css('height', o('.flickr li').width() + 'px');
  		});   
	  }
	});

	o('.flickr-feed').delegate('a','click', function(e) {
    // alert(topPos);
    var url = o(this).attr('href');
    //alert(url);
    o('.flickr > img').remove();
    PreloadImage(url);
    e.preventDefault();
  });

	function PreloadImage(imgSrc, callback){
	  var objImagePreloader = new Image();

	  objImagePreloader.src = imgSrc;
	  if(objImagePreloader.complete){   
      callback();
	   	objImagePreloader.onload=function(){};
	  }
	  else{
      o('.flickrLoader').css('display', 'block');
	    objImagePreloader.onload = function() {
	      o('.flickr > img').remove();
	      callback();
	      objImagePreloader.onload=function(){};
	    }
	  }

	  function callback() {           
      //window.scrollTo(topPos,topPos)
      o('.flickrLoader').css('display', 'none');
      o('.flickr h3').after(objImagePreloader);
      fImg = o('#flickr > img');
      fImg.addClass('show');
	  	var imgHeight = fImg.height();
      if (imgHeight > 730) {
      	o('.flickr > img').css('max-width', '730');
	    }
      scrollWindow(o('.flickr').offset().top);
	  }
	}
  // Scrolls to the top position of the offset value that you pass.
  function scrollWindow(topPos){
    window.scrollTo(0, topPos);
  }
});