function Stream() {
    this.nbSymbol = getRandom(5, 25);
    this.symbols = [];
    this.ySpeed = getRandom(5, 25);
    this.xSpeed = 0;
    this.fontSize = 16;
    this.x = 0;


    this.populate = function(x, y) {
        this.x += x;
        let speed;
        for(let i = 0; i<= this.nbSymbol; i++) {
            speed = getRandom(5, 150);
            this.symbols.push(new Symbol(this.x, y, speed, i, this));
            y -= this.fontSize;
            if(i == this.nbSymbol) {
                this.symbols[i].last = true;
            }
        }
    }

    this.newSpeed = function() {
        this.ySpeed = getRandom(5, 23);
    }

    this.newNbSymbol = function() {
        this.nbSymbol = getRandom(5, 25);
    }

    this.reNew = function() {
        //this.newNbSymbol();
        this.newSpeed();
        //this.populate(14, 0);
    }

    this.rain = function() {
        for(symbol of this.symbols) {
            symbol.rain(this.xSpeed, this.ySpeed);
        }
    }

    this.draw = function() {
        for(symbol of this.symbols) {
            symbol.draw();
        }
    }

    this.speedUnder = function(speed) {
        return this.ySpeed < speed;
    }
}
