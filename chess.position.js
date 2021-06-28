// Поточний стан гри
class ChessPosition {
    constructor() {
        // дошка
        this.map = new Array(64);
        // чий хід
        this.who = "w";
        this.disable4castling = {};
        this.setMapStr('rnbqkbnrpppppppp11111111111111111111111111111111PPPPPPPPRNBQKBNR');
        this.history = [];
        this.bitField = {};
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
        let h = this.getMapStr();
        let f = this.map[fromCoord];
        this.map[fromCoord] = "1";
        this.map[toCoord] = f;
       
        this.#setDC(fromCoord);
        this.#setDC(toCoord);

        let res = [fromCoord, toCoord];

        if (f == "K" && fromCoord === 60) {
            if (toCoord === 62) {
                this.map[61] = this.map[63];
                this.map[63] = "1";
                res.push(61);
                res.push(63);
            }

            if (toCoord === 58) {
                this.map[59] = this.map[56];
                this.map[56] = "1";
                res.push(56);
                res.push(59);
            }
        }

        if (f == "k" && fromCoord === 4) {
            if (toCoord === 6) {
                this.map[5] = this.map[7];
                this.map[7] = "1";
                res.push(5);
                res.push(7);
            }

            if (toCoord === 2) {
                this.map[3] = this.map[0];
                this.map[0] = "1";
                res.push(0);
                res.push(3);
            }
        }

        let bf = {};
        if ("pP".includes(f)) {

            if ( this.bitField[toCoord]) {
                this.map[this.bitField[toCoord]] = "1";
                res.push(this.bitField[toCoord]);
            } else {
                let fh = this.getH(fromCoord);
                let th = this.getH(toCoord);

                let fv = this.getV(fromCoord);
                let tv = this.getV(toCoord);

                if (tv === fv && Math.abs(th - fh) === 2) {
                    let bitH = (th - fh) / 2 + fh;
                      bf[this.getCell(fv, bitH)] = toCoord;
                }
            }

        }

        this.bitField = bf;

        this.who = (this.who === "w") ? "b" : "w";
        this.history.push(h);
        return res;
     
    }

    // встановити стан з іншого стану
    assign(p) {
        this.setMapStr(p.getMapStr());
        this.who = p.who;
    }

    getV(coord) {
        return (coord % 8) + 1;
    }

    getH(coord) {
        return 8 - (coord - (coord % 8)) / 8;
    }

    getCell(v, h) {
        return v - 1 + (8 - h) * 8;
    }


    #setDC(coord) {
        if ([0, 4, 7, 56, 60, 63].indexOf(coord) >= 0)
            this.disable4castling[coord] = true;
    }
}