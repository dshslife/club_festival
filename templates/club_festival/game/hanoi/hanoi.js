$('.warn-back').css("opacity", "0");
window.onload = function() {
  gs = function() {
    if (window.matchMedia('(orientation: portrait)').matches) {
      $('.warn-back').show();
      $('.warn').animate({
        "top": "30px"
      }, 700);
      $('body').css("overflow", "hidden");
      $('.warn-back').animate({
        "opacity": "1"
      }, 700);
    } else {
      $('.warn-back').hide();
      $('.warn').animate({
        "top": "-30%"
      }, 700);
      $('.warn-back').animate({
        "opacity": "0"
      }, 700);
      $('body').css("overflow", "scroll");
  }
};
  window.addEventListener('resize', gs);
  gs();
}
