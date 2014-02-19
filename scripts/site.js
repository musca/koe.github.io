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
};
$(document).ready(function() {   
  // Get issues
  $.ajax({
    url: "https://api.github.com/repos/musca/musca.github.io/issues",
    callback: "foo",
    success: function (data) {
      Object.keys(data);
      Object.keys(data).forEach(function (key) {
        if ("musca.github.io | " + data[key].title == document.title) {
          var comments = data[key].comments
          if (comments >= 1) {
            var v = (comments == 1) ? 'comment' : 'comments';
            $("#comments").html("<a href=''>show "+comments+" "+v+"</a> ");
            $("#comments").on('click', 'a', function(event) {
              event.preventDefault()
              getComments(data[key].number);
              $("#comments").html("showing "+comments+" "+v+"");
            });
          } else {
            $("#comments").on('click', 'a', function(event) {
              event.preventDefault()
              $("#comments-wrapper").addClass("loaded");
              $("#comments").html("Be the first!");
            });
            $("#comments").html("There is no comments on this post. <a href="+data[key].html_url+" id=be-the-first>Be the first!</a>");
          }
        }
      });
      $("#comments").addClass("loaded");
    }
  });
  // Get comments
  function getComments(id) {
    $.ajax({ 
      url: "https://api.github.com/repos/musca/musca.github.io/issues/"+id+"/comments",
      callback: "foo",
      success: function (data) {
        var tmpHolder = [];
        Object.keys(data);
        Object.keys(data).forEach(function (key) {
          var user = data[key].user;
          var tmp = 
            '<li>' +
            '  <div class="gravtar">'+
            '    <a href="'+user.html_url+'" class="user">'+
            '      <img src=https://gravatar.com/avatar/'+user.gravatar_id+'>'+
            '    </a>'+
            '    <a href="'+user.html_url+'" class="user">'+user.login+'</a>'+
            '  </div>'+
            '  <div class="comment">'+data[key].body+'</div>'+
            '</li>';
          tmpHolder.push(tmp);
        });
        $("#comments-ul").append(tmpHolder.join('')).addClass("loaded");
        $("#comments-wrapper").addClass("loaded");
      }
    });
  }
});