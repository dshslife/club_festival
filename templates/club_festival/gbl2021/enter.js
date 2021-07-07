var a, b;
var dic = {};
var na = [], val = [];

const str1 = '<div class="box r1 shadow ani"><div class="state r3 ce">'; //상태
const str2 = '</div><img src="'; //img
const str3 = '"><h1 class="le">'; //title
const str4 = '<br><span class="int">' // sub
const str5 = '</span></h1></div>'


function add(ST, IMG, TI, SUB) {
  $('.wrap').append(str1 + ST + str2 + IMG + str3 + TI + str4 + SUB + str5);
}

function winre() {
  a = $('.wrap').width();
  b = window.innerWidth;
  $('.wrap').css('width', b + 3 + 'px');
}

$(window).resize(winre);
winre()
$('#all-booth').on('click', function() {
  goto('all-booth/');
});
$('#ranking').on('click', function() {
  goto('all-ranking/');
});


function swit(a, b) {
  var buf;
  buf = na[a];
  na[a] = na[b];
  na[b] = buf;

  buf = val[a];
  val[a] = val[b];
  val[b] = buf;
}

function refresh() {
  $('div').remove('.space');
  $('div').remove('.box');
  $('.wrap').append('<div class="space"></div>');
  firebase.database().ref('BOOTH/').once('value').then((snapshot) => {
    $.each(snapshot.val(), function(key, value) {
      add(value['STATE'], value['IMG'], value['NAME'], value['SUB']);
    });
    $('.wrap').append('<div class="space"></div>');
  });


  // 순위
  firebase.database().ref('USER/').once('value').then((snapshot) => {
    $.each(snapshot.val(), function(key, value) {
      var cnt = 0;
      $.each(value['SCORE'], function(keya, valuea) {
        cnt += valuea;
      });
      dic[value['NAME']] = cnt;
    });
    $('#Score').text('+' + dic[Nr]);

    //배열 변환
    for(let key in dic) {
      na.push(key);
      val.push(dic[key]);
      console.log(key + ' : ' + dic[key]);
    }

    // 선택정렬
    for (var i = 0; i < na.length - 1; i++) {
      for (var t = i; t < na.length; t++) {
        if (val[i] < val[t]) {
          swit(i, t);
        }
      }
    }
    $('#first').text(na[0]);
    $('#second').text(na[1]);
    $('#third').text(na[2]);
  });
}
refresh();
