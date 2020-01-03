function Symbol(x, y, updateSpeed, index, stream) {
    this.x = x;
    this.y = y;
    this.yOrigin = y;
    this.value;
    this.unicodeBaseKatakana = 0x30A0;
    this.unicodeBaseLatinPart = 0x0020;
    this.index = index;
    this.updateSpeed = updateSpeed;
    this.updateSpeedOrigin = updateSpeed;
    this.count = 0;
    this.turn = 0;
    this.last = false;
    this.stream = stream;



    this.updateValue = function() {
        this.value = this.getRandomSymbol();
    }

    this.getRandomSymbol = function() {
        // on génère un nombre aléatoire compris dans l'ensemble du code block
        let katakana = String.fromCharCode(this.unicodeBaseKatakana + getRandom(0,95));
        let latinPart = String.fromCharCode(this.unicodeBaseLatinPart + getRandom(1,32));
        // construction d'une String à partir du premier code de la table unicode passé en argument
        // additionné de end
        let i = getRandom(0, 1);
        return (i == 0) ? katakana : latinPart;
        //return katakana;
    }

    // init de value
    this.value = this.getRandomSymbol();


    this.getRandom = function(min, max) {
        min = Math.ceil(min);
        max = max | 0;
        return ((Math.random() * (max - min +1)) | 0) + min;
    }


    this.draw = function() {
        ctx.fillText(this.value, this.x, this.y);
        ctx.strokeText(this.value, this.x, this.y);
    }

    this.move = function(xSpeed, ySpeed) {
        // if(this.y >= height) {
        //     this.x = (this.x >= width) ? 0 : this.x + xSpeed;
        // }
        if(this.y >= height) {
            //this.turn += (this.stream.ySpeed < 20) ? 3 : 1;
            this.y = 0;
            // if(this.last) {
            //     if(this.turn > 4) {
            //         this.stream.reNew();
            //         this.turn = 0;
            //     }
            // }
        } else {
            this.y += ySpeed;
        }
    }

    this.rain = function(xSpeed, ySpeed) {
        this.move(xSpeed, ySpeed);
        this.count++;
        if(this.count == this.updateSpeed) {
            this.updateValue();
            this.count = 0;
        }
    }
}
