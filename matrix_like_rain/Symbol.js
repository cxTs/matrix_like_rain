class Symbol {
    x;
    y;
    unicodeBaseKatakana = 0x30A0;
    unicodeBaseLatinPart = 0x0020;
    index; // the index of the symbol in the stream
    updateSpeed; // the frequencies at which symbol is randomly changed
    count;
    stream; // stream in which the symbol is.
    value; // value of the symbol

    constructor(x, y, updateSpeed, index, stream) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.updateSpeed = updateSpeed;
        this.count = 0;
        this.stream = stream;
        this.value = this.getRandomSymbol();
    }
}

// PROTO //

// give the symbol a new value
Symbol.prototype.updateValue = function() {
    this.value = this.getRandomSymbol();
}

Symbol.prototype.getRandomSymbol = function() {
    // set 2 string variables containing the base of the unicode base
    // and a random symbol from unicode block choosen at the end

    // katakana unicode block contains 95 symbols
    let katakana = String.fromCharCode(this.unicodeBaseKatakana + getRandom(0,95));
    // latin unicode block with number and symbol value is on the range [1-32]
    let latinPart = String.fromCharCode(this.unicodeBaseLatinPart + getRandom(1,32));

    let i = getRandom(0, 1);
    // return either katakana or latin symbol
    return (i == 0) ? katakana : latinPart;
}

Symbol.prototype.getRandom = function(min, max) {
    min = Math.ceil(min);
    max = max | 0; // OR operator is faster than Math.floor() function
    return ((Math.random() * (max - min +1)) | 0) + min;
}

// draw the symbol on canvas
Symbol.prototype.draw = function() {
    ctx.fillText(this.value, this.x, this.y);
    ctx.strokeText(this.value, this.x, this.y);
}

// make the symbol move down the screen and loop on top of it once it has reached the bottom
Symbol.prototype.move = function(xSpeed, ySpeed) {
    if(this.y >= height) {
        this.y = 0;
    } else {
        this.y += ySpeed;
    }
}

// call for the move function and update the symbol if needed so
Symbol.prototype.rain = function(xSpeed, ySpeed) {
    this.move(xSpeed, ySpeed);
    this.count++;
    if(this.count == this.updateSpeed) {
        this.updateValue();
        this.count = 0;
    }
}
