var container = document.querySelector('#container');
var qr = new QRCode(container, {
    width: 400,
    height: 400
});

var makeCode = function() {
    var text = document.querySelector('#text').value;
    qr.make(text);
};

makeCode();