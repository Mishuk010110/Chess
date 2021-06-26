class ChessPosition {
    constructor() {
        this.map = new Array(64); 
        this.who = "w";
        this.setMapStr('rnbqkbnrpppppppp11111111111111111111111111111111PPPPPPPPRNBQKBNR');
    }

    setMapStr(str) {
        for (var coord = 0; coord < 64; coord++)
            this.map[coord] = str.charAt(coord);
    }

    getMapStr() {
        let s = '';
        for (var coord = 0; coord < 64; coord++)
            s += this.map[coord];
        return s;
    }

    move(fromCoord, toCoord) {
      
        let f = this.map[fromCoord];
        this.map[fromCoord] = "1";
        this.map[toCoord] = f;
        this.who = (this.who === "w") ? "b" : "w";
     
    }

    assign(p) {
        this.setMapStr(p.getMapStr());
        this.who = p.who;
    }
}