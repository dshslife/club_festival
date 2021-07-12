$('.Box-f').hide();
$('#Map2').hide();

$('.t-dot').on('click', function() {
    location.href="/Menu";
});
$('#Logout').on('click', function() {
    location.href="/logout";
});
$('#Lo-btn').on('click', function() {
    location.href="/Booth";
});
$('#Back').on('click', function() {
    location.href="/Booth";
});
$('#Maps').on('click', function() {
    location.href="/Map";
});
$('#Record').on('click', function() {
    location.href="/History";
});
$('#Ranking').on('click', function() {
    location.href="/Ranking";
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



