$('.Box-f').hide();
$('#Map2').hide();

$('.t-dot').on('click', function() {
    location.href="Menu.html";
});
$('#Logout').on('click', function() {
    location.href="/logout";
});
$('#Lo-btn').on('click', function() {
    location.href="Booth.html";
});
$('#Back').on('click', function() {
    location.href="Booth.html";
});
$('#Maps').on('click', function() {
    location.href="Map.html";
});
$('#Record').on('click', function() {
    location.href="History.html";
});
$('#Ranking').on('click', function() {
    location.href="Ranking.html";
});



$(document).on('click', '.close',function() {
    $('.booth-full').hide();
});

$(document).on('click', '.List',function() {
    $('.booth-full').show();
    console.log(1);
});






function Open(e) {
    $('#Box').show();
}

function Maps() {
    reset();
    $('.background').css('height', '80%');
    $('#Map').show();
}


function Main() {
    reset();
    $('#User').show();  
    $('.background').css('height', '80%');
}

function Menu() {
    reset();
    $('#Main').show();      
    $('.background').css('height', '80%');
}

function select(e) {
    console.log(e.value);
    if (e.value == 0) {
        $('#Map1').show();
        $('#Map2').hide();
    } else {
        $('#Map2').show();
        $('#Map1').hide();
    }
}



