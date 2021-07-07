var id, pw, name, sub, img;
function writeUserData(userId, pw, name) {
  firebase.database().ref('USER/' + userId).set({
    NAME: name,
    PW: pw,
    SCORE : 0
  });
}

function writeUserDataa(name, sub, img) {
  firebase.database().ref('BOOTH/' + name).set({
    NAME: name,
    IMG: img,
    STATE : '원활',
    SUB : sub
  });
}

$('#button-add').on('click', function() {
  id = $('#ID').val();
  pw = $('#PW').val();
  name = $('#NAME').val();
  writeUserData(id, pw, name);
  document.getElementById("ID").value = '';
  document.getElementById("PW").value = '';
  document.getElementById("NAME").value = '';
  alert('추가 완료');
});


$('#btn-add').on('click', function() {
  name = $('#BOOTH').val();
  sub = $('#SUB').val();
  img = $('#IMG').val();
  writeUserDataa(name, sub, img);
  document.getElementById("BOOTH").value = '';
  document.getElementById("SUB").value = '';
  document.getElementById("IMG").value = '';
  alert('추가 완료');
});
