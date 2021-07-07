const A = localStorage.getItem('id');
const B = localStorage.getItem('pw');

$('#Game').on('click', function() {
  goto('game/game.html');
});

$('#Help').on('click', function() {
  goto('help/');
});


$('#Map').on('click', function() {
  goto('map/map.html');
});


$('#Enter').on('click', function() {
  goto('gbl2021/enter.html');
});

$('#Logout').on('click', function() {
  localStorage.clear();
  goto('index.html');
});


firebase.database().ref('USER/' + A).once('value').then((snap) => {
  console.log(snap.val()['NAME']);
  $('.name').text(snap.val()['NAME']);
});
