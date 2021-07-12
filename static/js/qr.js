var qrcode = new QRCode(document.getElementById("qrcode"), {
    text: "http://web-inf.tistory.com/",
    width: 80,
    height: 80,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});