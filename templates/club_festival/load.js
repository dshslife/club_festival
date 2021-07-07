function goto(a) {
/*  $("body div").animate({
            "opacity": "0"
        },300, function () {
          document.location.href = a;
          $('.load').animate({"opacity": "1"},300, function() {
            $('.load').hide();
            $("body div").css("opacity", "1");
          });
        });*/
        document.location.href = a;
}






$("body div").css("opacity", "0");
$(document).ready(function() {
  $("body div").animate({"opacity": "1"},300);
    $('.load').animate({"opacity": "0"},300, function() {
      $('.load').fadeOut();
    });
    console.log("load시작");

});
