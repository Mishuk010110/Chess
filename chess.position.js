// Поточний стан гри
class ChessPosition {
    constructor() {
        // дошка
        this.map = new Array(64);
        // чий хід
        this.who = "w";
        this.setMapStr('rnbqkbnrpppppppp11111111111111111111111111111111PPPPPPPPRNBQKBNR');
    }

    // встановивти позицію на дошці
    setMapStr(str) {
        for (var coord = 0; coord < 64; coord++)
            this.map[coord] = str.charAt(coord);
    }

    // повертає позицію на дошці
    getMapStr() {
        let s = '';
        for (var coord = 0; coord < 64; coord++)
            s += this.map[coord];
        return s;
    }

    // Зробити хід
    move(fromCoord, toCoord) {
      
        let f = this.map[fromCoord];
        this.map[fromCoord] = "1";
        this.map[toCoord] = f;
        this.who = (this.who === "w") ? "b" : "w";
     
    }

    // встановити стан з іншого стану
    assign(p) {
        this.setMapStr(p.getMapStr());
        this.who = p.who;
    }
}