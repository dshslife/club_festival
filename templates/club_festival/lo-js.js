$('.lo-button').attr('disabled', true);

const A = localStorage.getItem('id');
const B = localStorage.getItem('pw');
firebase.database().ref('USER/').once('value').then((snap) => {
  $.each(snap.val(), function(index, value) {
    if (index == A && value['PW'] == B) {
      console.log('입장');
      goto('main.html');
    }
  });
});

window.addEventListener("keydown", function() {
  if ($('.id').val() == '' || $('.pw').val() == '') {
    $('.lo-button').attr('disabled', true);
    $('.box-lo').css('transform', 'translateY(0px)');
    return;
  }
  $('.lo-button').attr('disabled', false);
  $('.box-lo').css('transform', 'translateY(-30px)');
});


$('.lo-button').on('click', function() {
  console.log($('.id').val());
  firebase.database().ref('USER/').once('value').then((snap) => {
    $.each(snap.val(), function(index, value) {
      if (index == $('.id').val() && value['PW'] == $('.pw').val()) {
        console.log('입장');
        localStorage.setItem("id", $('.id').val());
        localStorage.setItem("pw", $('.pw').val());
        localStorage.setItem("name", value['NAME']);
        goto('main.html');
      }
    });
  });
  $('.error').css('top', '20px');
  $('.main-te').css('transform', 'translateY(60px)');
});
