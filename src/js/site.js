window.addEventListener("load", init, false);
function init() {
  var greeting = document.getElementById("greeting"),
      now = new Date(),
      h = now.getHours();
  // Show Greeting
  if (h > 0 && h < 4) {
    greeting.innerHTML = 'Have a great night';
  } else if (h >= 4 && h < 12) {
    greeting.innerHTML = 'Good morning';
  } else if (h >= 12 && h < 18) {
    greeting.innerHTML = 'Good afternoon';
  } else {
    greeting.innerHTML = 'Good evening';
  }
  document.documentElement.removeAttribute("class");
};
var o = $;
$(document).ready(function() {   
  o("body").addClass('loaded');
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

        var tmp = '<li>' +
                  '  <a href="'+repos[i].html_url+'">'+repos[i].name+'</a> '+
                  '  <span class="language">'+repos[i].language+'</span><br> '+
                  '  <span>'+repos[i].description+'</span> '+
                  '</li>';

        tmpHolder.push(tmp);
      };
      o("#github-projects").append(tmpHolder.join(''));
      // alert(tmpHolder)
      //document.getElementById('github-projects').innerHTML = tmpHolder.join('');
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
	  		
	  		li =	'<li>' +
    	  			'  <a href="'+items[u].media.m.replace('_m','_b')+'" class="zoom" rel="group">' +
    	  			'    <img src=data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw== onload=lzld(this) onerror=lzld(this) data-src="'+items[u].media.m+'" alt="{{title}}" />' +
    	  			'  </a>' + 
    	  			'</li>'
	       imgHolder.push(li);
	  	};

      o("#flickr-feed").append(imgHolder.join(''));

	  	o('#flickr-feed, #flickr li').css('height', $('#flickr li').width() + 'px');
  		o(window).resize(function() {
  			o('#flickr li').css('height', o('#flickr li').width() + 'px');
  		});   
	  }
	});

	o('#flickr-feed').delegate('a','click', function(e) {
    // alert(topPos);
    var url = o(this).attr('href');
    //alert(url);
    o('#flickr > img').remove();
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
	  	// o('#flickr h3').after('<img src="/assets/images/logo.svg" id="imgLoading">');
      o('#flickrLoader').css('display', 'block');
	    objImagePreloader.onload = function() {
	      o('#flickr > img').remove();
	      callback();
	      objImagePreloader.onload=function(){};
	    }
	  }

	  function callback(){           
      //window.scrollTo(topPos,topPos)
      o('#flickrLoader').css('display', 'none');
      o('#flickr h3').after(objImagePreloader);
      fImg = o('#flickr > img');
      fImg.addClass('show');
	  	var imgHeight = fImg.height();
      if (imgHeight > 730) {
      	o('#flickr > img').css('max-width', '730');
	    }
      scrollWindow(o('#flickr').offset().top);
	  }
	}

  // Scrolls to the top position of the offset value that you pass.
  function scrollWindow(topPos){
    window.scrollTo(0, topPos);
  }
  
  
  // Get issues
  // $.ajax({
  //   url: "https://api.github.com/repos/musca/musca.github.io/issues",
  //   callback: "foo",
  //   success: function (data) {
  //     Object.keys(data);
  //     Object.keys(data).forEach(function (key) {
  //       if ("blog.musca.se | " + data[key].title == document.title) {
  //         var comments = data[key].comments
  //         if (comments >= 1) {
  //           var v = (comments == 1) ? 'comment' : 'comments';
  //           $("#comments-wrapper").append("if you like to comment, head over <a href="+data[key].html_url+">here</a>");
  //           $("#comments").html("<a href=''>show "+comments+" "+v+"</a> ");
  //           $("#comments").on('click', 'a', function(event) {
  //             event.preventDefault()
  //             getComments(data[key].number);
  //             $("#comments").html("showing "+comments+" "+v+"");
  //           });
  //         } else {
  //           // $("#comments").on('click', 'a', function(event) {
  //           //   event.preventDefault()
  //           //   $("#comments-wrapper").addClass("loaded");
  //           //   $("#comments").html("Be the first!");
  //           // });
  //           $("#comments").html("There is no comments on this post. <a href="+data[key].html_url+" id=be-the-first>Be the first!</a>");
  //         }
  //
  //       }
  //     });
  //     $("#comments").addClass("loaded");
  //   }
  // });
  // // Get comments
  // function getComments(id) {
  //   $.ajax({
  //     url: "https://api.github.com/repos/musca/musca.github.io/issues/"+id+"/comments",
  //     callback: "foo",
  //     success: function (data) {
  //       var tmpHolder = [];
  //       Object.keys(data);
  //       Object.keys(data).forEach(function (key) {
  //         var user = data[key].user;
  //         var tmp =
  //           '<li>' +
  //           '  <div class="gravtar">'+
  //           '    <a href="'+user.html_url+'" class="user">'+
  //           '      <img src=https://gravatar.com/avatar/'+user.gravatar_id+'>'+
  //           '    </a>'+
  //           '    <a href="'+user.html_url+'" class="user">'+user.login+'</a>'+
  //           '  </div>'+
  //           '  <div class="comment">'+data[key].body+'</div>'+
  //           '</li>';
  //         tmpHolder.push(tmp);
  //       });
  //       $("#comments-ul").append(tmpHolder.join('')).addClass("loaded");
  //       $("#comments-wrapper").addClass("loaded");
  //     }
  //   });
  // }
});