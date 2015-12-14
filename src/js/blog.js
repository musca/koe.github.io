//= require includes/*.js
//= require vendor/*.js
'use strict';
var o = $;
$(document).ready(function() {
  var didScroll = false;
  var didResize = false;
  var bLazy = new Blazy();  
  var header = document.querySelector(".intro");
  var video = document.querySelector("video");

  if (header) {
    
    setHeaderHeight();
    alignContent();
    
    function alignContent() {
      var headerContent = document.querySelector(".header-content");
      var margin = headerContent.offsetHeight / 2;
      headerContent.style.marginTop = "-"+margin+"px";
    }
    
    function setHeaderHeight() {
      header.style.height = verge.viewportH()+"px";
    }
  
    function pauseVideo() {
      if (verge.inViewport(video, -verge.viewportH() / 2)) {
        if (video.paused) video.play();    
      } else {
        video.pause();
      }
    }
  
    window.onscroll = function() {
      didScroll = true;
    };
    
    window.onresize = function() {
      didResize = true;
    };
  
    setInterval(function() {
      if (didScroll) {
        didScroll = false;
        // Check header position and then
        pauseVideo();
      }
      if (didResize) {
        setHeaderHeight();
      }
    }, 1000);
  }
  
  document.getElementById("content").addEventListener('complete', function(event){
   var grid = document.getElementById('grid');
   salvattore.recreateColumns(grid);
   setTimeout(bLazy.revalidate, 50);
   getData()
  }, false);
  
  o("body").addClass('loaded');
  
  // Open side menu
  $(".open-side-menu, .close-side-menu").click(function(event) {
    event.preventDefault();
    $("body").toggleClass("side-menu-showing");
    $(".overlay-holder").toggleClass("overlay");
  });
  
  // Close side menu and overlay 
  $(".overlay-holder").click(function() {
    closeOverlay();
  });
  
  function closeOverlay() {
    $(".overlay-holder, .side-menu, body")
    .removeClass("overlay side-menu-showing");
  }
  
  function isRoot() {
      return location.pathname == "/";
  }
  
  (function () {
    // Get github repos   
    atomic.get('https://api.github.com/users/musca/repos?sort=updated')
    .success(function (data, xhr) {
      var tmpHolder = [];

      for (var i = 0; i < 5; i++) {
        tmpHolder.push(
          '<li>' +
          '  <a href="'+data[i].html_url+'">'+data[i].name+'</a>' +
          '  <span class="language smaller-text">'+data[i].language+'</span><br>' +
          '  <p>'+data[i].description+'</p>' +
          '</li>'
        );
      };
      o(".github-projects").append(tmpHolder.join(''));
    })
    .error(function (data, xhr) {

    })
    .always(function (data, xhr) {

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
  })();
});