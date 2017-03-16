$(function() {
  $(".button-collapse").sideNav({
    closeOnClick: true
  });

  //Smooth in page navigation
  function scrollToAnchor(name){
      var aTag = $("div[name='"+ name +"']");
      $('html,body').animate({scrollTop: aTag.offset().top}, 'slow');
  }

  $(".slow-nav").click(function() {
    event.preventDefault();
    var name = $(this).attr('href');
    scrollToAnchor(name);
  });
});
