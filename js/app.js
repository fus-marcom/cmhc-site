$(function() {
  $(".button-collapse").sideNav({
    closeOnClick: true
  });

  //Fix for background-attachment: fixed issue on mobile Safari
  //http://stackoverflow.com/questions/3007480/determine-if-user-navigated-from-mobile-safari
  var ua = window.navigator.userAgent;
  var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  var webkit = !!ua.match(/WebKit/i);
  var iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

  if (iOS && webkit && iOSSafari) {
    $('#home').attr('style', 'background-attachment: scroll; background-position-x: center;')
  }

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
