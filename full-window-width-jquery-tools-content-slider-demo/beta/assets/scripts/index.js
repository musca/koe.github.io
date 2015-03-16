/* 
 * Full window width content slider by Karl Oskar Engdahl
 * for more information visit:
 * http://www.musca.se/full-window-width-jquery-tools-content-slider-demo
 */

// var _gaq=[['_setAccount','UA-21499673-1'],['_trackPageview']];(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.src='//www.google-analytics.com/ga.js';s.parentNode.insertBefore(g,s)}(document,'script'))

$(function() {
  // set menu height
  menuSize();

  // Scrollable, Navigator and Autoscroll settings.
  $('#slider').scrollable({ 
    circular: false, 
    touch: false, 
    easing: 'linear', 
    speed: 400
  }).navigator({ 
    navi: '#navigation',
    history: true,
    idPrefix: 'slide'
  }).autoscroll({ 
    autoplay: false,
    autopause:true, 
    interval: 5000 
  }).fullwidth();

  // Configuration code
  var conf = $('#slider').scrollable().getConf(), api = $('#slider').data('scrollable');
  $('#easing').change(function() {
    var easing = $(this).val();
    conf.easing = easing
    
  });
  
  //
  api.onBeforeSeek(function(e, index) {
    setTimeout(function() {
      var index = api.getIndex() + 1;
      if (index >= 0) {
        // alert("active"+index)
        $("#items > div").removeClass('active');
        $("#slide_"+index).addClass('active');
      }
    }, 1);
  }); 

  $(window).load(function(){
    $('header').css({top:-60}).delay(2000).animate({top: 0});
    $('.opacity #slider').css({ opacity: 1});
  });

  // window.onscroll = function(e){
  $(window).scroll(function () {
    menuSize()
    // if (winOffset >= 7 && winOffset <= 9 ) {
    //   rgba = 'rgba(255, 255, 255, .'+winOffset
    //   $('header').css({backgroundColor: rgba})
    // }   
  });

  function menuSize() {
    var winOffset = window.pageYOffset * 0.2;
    if (winOffset >= 0 && winOffset <= 20 ) {
      height = 42 - winOffset;
      $('header, nav a img, nav ul li').css({height: height, lineHeight: height+'px'});
      $('header').removeClass('border');
    } else {
      $('header').addClass('border');
    } 
  }


  head.ready(function() {

    $('.toggle').toggle({on:true});
  
    $('.toggle').on('toggle', function (e, active) {
      if (active) {
        api.play();
      } else {
        api.stop();
      }
    });
    //load README
    $('#remote-readme').load('/full-window-width-jquery-tools-content-slider-demo/readme #readme', function() {
      $(this).addClass('loaded');
    });
    //$('.on_off :checkbox').iphoneStyle();
    // $('.on_off :checkbox').iphoneStyle({
    //   onChange: function(){
    //     if(document.getElementById('on_off_on').checked==false) {
    //       $('#autoplay-value').text("false");
    //       api.stop();
    //     } else {
    //       $('#autoplay-value').text("true");
    //       api.play();
    //     }  
    //   }
    // });

    // if(document.getElementById('on_off_on').checked==false) { api.stop(); }
    
    // $('#SliderSingle').slider({
    //   from: 100,
    //   to: 2000,
    //   step: 100,
    //   round: 0,
    //   dimension: '&nbsp;MS',
    //   skin: "round_plastic",
    //   callback: function() {
    //     var value = parseInt($('#SliderSingle').val());
    //       conf.speed = value
    //       $('#value').text(value);
    //   }
    // }); 
  });
});
