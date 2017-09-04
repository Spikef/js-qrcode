var QR = require('./qrcode');
var QRErrorCorrectLevel = {
    L : 1,
    M : 0,
    Q : 3,
    H : 2
};

var defaultOptions = {
    width          : 256,
    height         : 256,
    typeNumber     : -1,
    correctLevel   : QRErrorCorrectLevel.H,
    background     : "#ffffff",
    foreground     : "#000000"
};

var QRCode = function(container, options) {
    this.options = extend(defaultOptions, options);
    this.container = container;
};

QRCode.prototype.make = function(text) {
    var options = this.options;
    var container = this.container;

    text = utf16to8(text);

    var canvas = this.createCanvas(text, options);
    var src = canvas.toDataURL();
    var img = document.createElement('img');
    img.style.height = '100%';
    img.style.width = '100%';
    img.setAttribute('src', src);
    container.innerHTML = '';
    container.appendChild(img);
};

QRCode.prototype.createCanvas = function(text, options) {
    var qrcode = new QR(options.typeNumber, options.correctLevel);
    qrcode.addData(text);
    qrcode.make();

    // create canvas element
    var canvas = document.createElement('canvas');
    canvas.width = options.width;
    canvas.height = options.height;
    var ctx = canvas.getContext('2d');

    // compute tileW/tileH based on options.width/options.height
    var tileW = options.width  / qrcode.getModuleCount();
    var tileH = options.height / qrcode.getModuleCount();

    // draw in the canvas
    for( var row = 0; row < qrcode.getModuleCount(); row++ ){
        for( var col = 0; col < qrcode.getModuleCount(); col++ ){
            ctx.fillStyle = qrcode.isDark(row, col) ? options.foreground : options.background;
            var w = (Math.ceil((col+1)*tileW) - Math.floor(col*tileW));
            var h = (Math.ceil((row+1)*tileW) - Math.floor(row*tileW));
            ctx.fillRect(Math.round(col*tileW),Math.round(row*tileH), w, h);
        }
    }
    
    // return just built canvas
    return canvas;
};

function extend(source, target) {
    var obj = JSON.parse(JSON.stringify(source));

    if (!target || typeof target !== 'object') target = {};

    for (var i in target) {
        if (!target.hasOwnProperty(i)) continue;

        obj[i] = target[i];
    }

    return obj;
}

function utf16to8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for(i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        }
    }
    return out;
}

module.exports = QRCode;