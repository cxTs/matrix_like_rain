class Stream {
    nbSymbol;
    symbols;
    ySpeed;
    xSpeed;
    fontSize;
    x;

    constructor() {
        this.nbSymbol = getRandom(5, 25); //above 25 symbols per stream, for 100 stream, speed could be slower
        this.symbols = [];
        this.ySpeed = getRandom(5, 25);
        this.xSpeed = 0; // if you want to make stream move on the x axis of the canvas
        this.fontSize = 16;
        this.x = 0; // the left border of the canvas
    }
}

Stream.prototype.populate = function(x, y) {
    // when populate the stream, stream recieved tis place on the x axis of the canvas
    this.x += x;
    let updateSpeed;
    for(let i = 0; i<= this.nbSymbol; i++) {
        updateSpeed = getRandom(5, 150);
        this.symbols.push(new Symbol(this.x, y, updateSpeed, i, this));
        // y is decremented by the size of font, this way each new symbol is placed above the precedent one
        y -= this.fontSize;
    }
}

// call to rain function of each symbol in the stream
Stream.prototype.rain = function() {
    for(symbol of this.symbols) {
        symbol.rain(this.xSpeed, this.ySpeed);
    }
}

// call to draw function of each symbol in the stream
Stream.prototype.draw = function() {
    for(symbol of this.symbols) {
        symbol.draw();
    }
}

// give a boolean given a speed in args
Stream.prototype.speedUnder = function(speed) {
    return this.ySpeed < speed;
}
