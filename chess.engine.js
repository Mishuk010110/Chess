// двігло гри
class ChessEngine {

    constructor() {
        this.position = new ChessPosition();
    }

    // почати нову гру
    newGame() {
        this.position = new ChessPosition();
    }

    // інформація про клітинку
    getInfoVH(v, h) {

        var coord = this.#getCell(v, h);
        return {
            figure: this.position.map[coord],
            h: h,
            v: v,
            coord: coord
        }
    }

    // інформація про клітинку
    getInfo(coord) {
        return {
            figure: this.position.map[coord],
            h: this.#getH(coord),
            v: this.#getV(coord),
            coord: coord
        }
    }

    // чи можливо зробти хід
    check(fromCoord, toCoord) {
        let fromInfo = this.getInfo(fromCoord);
        let toInfo = this.getInfo(toCoord);

        return this.#isCorrectFigure(fromCoord, this.position.who) && this.checkMove(fromInfo, toInfo) && this.checkPositionAfterMove(fromInfo, toInfo);
    }

    // перевірка що після ходу наш король буде в небезпеці
    checkPositionAfterMove(fromInfo, toInfo) {
        var tmpEngine = new ChessEngine();
        tmpEngine.position.assign(this.position);
        tmpEngine.position.move(fromInfo.coord, toInfo.coord);
        if (this.position.who === "w")
            return !tmpEngine.underAttackK();
        else
            return !tmpEngine.underAttackk();

    }

    // всі можливі ходи
    getMovesFor(coord) {
        let res = [];
        for (var i = 0; i < 64; i++) {
            if (coord !== i && this.check(coord, i))
                res.push(i);
        }
        return res;
    }

    // чи є шах білому королю
    underAttackK() {
        var coord = this.#getFigurePos("K");
        return this.fieldUnderAttack(coord, "b");
    }

    // чи є шах чорному королю
    underAttackk() {
        var coord = this.#getFigurePos("k");
        return this.fieldUnderAttack(coord, "w");
    }

    // чи знаходиться клітинка під атакою
    fieldUnderAttack(coord, whoMove) {
        let figures = (whoMove === "w") ? "RNBQKP" : "rnbqkp";

        for (var i = 0; i < 64; i++) {
            if (i !== coord && this.#isCorrectFigure(i, whoMove) && this.checkMove(this.getInfo(i), this.getInfo(coord)))
                return true;
        }

        return false;
    }

    // перевірка чи можна зробити хід без врахування чи є атака на короля
    checkMove(fromInfo, toInfo) {
        switch (fromInfo.figure) {
            case "P": return this.#checkP(fromInfo, toInfo);
            case "p": return this.#checkp(fromInfo, toInfo);
            case "N": return this.#checkN(fromInfo, toInfo);
            case "n": return this.#checkn(fromInfo, toInfo);
            case "K": return this.#checkK(fromInfo, toInfo);
            case "k": return this.#checkk(fromInfo, toInfo);
            case "B": return this.#checkB(fromInfo, toInfo);
            case "b": return this.#checkb(fromInfo, toInfo);
            case "R": return this.#checkR(fromInfo, toInfo);
            case "r": return this.#checkr(fromInfo, toInfo);
            case "Q": return this.#checkQ(fromInfo, toInfo);
            case "q": return this.#checkq(fromInfo, toInfo);


            default:
                return false;

        }
    }

    // чи відноситься символ фігури до чорних
    isBlackFigure(f) {
        if ("rnbqkp".includes(f)) return true;
        else return false;
    }

    #getFigurePos(f) {
        for (var i = 0; i < 64; i++) {
            if (this.position.map[i] === f) return i;
        }
    }

    #isCorrectFigure(coord, whoMove) {
        let figures = (whoMove === "w") ? "RNBQKP" : "rnbqkp";
        return figures.includes(this.position.map[coord]);
    }

    #getV(coord) {
        return this.position.getV(coord);
    }

    #getH(coord) {
        return this.position.getH(coord);
    }

    #getCell(v, h) {
        return this.position.getCell(v, h);
    }




    #checkP(f, t) {

        if (t.h <= f.h) return false;
        if (t.h === f.h + 1 && (t.v === f.v + 1 || t.v === f.v - 1) && ("rnbqkp".includes(t.figure) || this.position.bitField[t.coord])) return true;
        if (t.v === f.v && (t.h === f.h + 1) && t.figure === "1") return true;
        if (t.v === f.v && (t.h === f.h + 2) && f.h === 2 && t.figure === "1" && this.getInfoVH(f.v, 3).figure === "1") return true;

    }
    #checkp(f, t) {

        if (t.h >= f.h) return false;
        if (t.h === f.h - 1 && (t.v === f.v + 1 || t.v === f.v - 1) && ("RNBQKP".includes(t.figure) || this.position.bitField[t.coord])) return true;
        if (t.v === f.v && (t.h === f.h - 1) && t.figure === "1") return true;
        if (t.v === f.v && (t.h === f.h - 2) && f.h === 7 && t.figure === "1" && this.getInfoVH(f.v, 6).figure === "1") return true;
    }
    #checkN(f, t) {
        if ("RNBQKP".includes(t.figure)) return false;

        var dh = t.h - f.h;
        var dv = t.v - f.v;


        if (dv === 2 && dh === -1) return true;
        if (dv === 2 && dh === 1) return true;
        if (dv === -2 && dh === -1) return true;
        if (dv === -2 && dh === 1) return true;
        if (dv === 1 && dh === -2) return true;
        if (dv === 1 && dh === 2) return true;
        if (dv === -1 && dh === -2) return true;
        if (dv === -1 && dh === 2) return true;
    }
    #checkn(f, t) {
        if ("rnbqkp".includes(t.figure)) return false;

        var dh = t.h - f.h;
        var dv = t.v - f.v;


        if (dv === 2 && dh === -1) return true;
        if (dv === 2 && dh === 1) return true;
        if (dv === -2 && dh === -1) return true;
        if (dv === -2 && dh === 1) return true;
        if (dv === 1 && dh === -2) return true;
        if (dv === 1 && dh === 2) return true;
        if (dv === -1 && dh === -2) return true;
        if (dv === -1 && dh === 2) return true;
    }
    #checkk(f, t) {
        if ("rnbqkp".includes(t.figure)) return false;

        var dh = t.h - f.h;
        var dv = t.v - f.v;

        if (dv === 1 && dh === -1) return true;
        if (dv === 1 && dh === 0) return true;
        if (dv === 1 && dh === 1) return true;
        if (dv === 0 && dh === 1) return true;
        if (dv === 0 && dh === -1) return true;
        if (dv === -1 && dh === 1) return true;
        if (dv === -1 && dh === 0) return true;
        if (dv === -1 && dh === -1) return true;

        if (f.coord === 4 && t.coord === 6 &&
            !this.position.disable4castling[4] && !this.position.disable4castling[7] &&
            !this.fieldUnderAttack(4, "w") && !this.fieldUnderAttack(5, "w") && !this.fieldUnderAttack(6, "w") &&
            this.position.map[5] === "1" && this.position.map[6] === "1"
        )
            return true;
        if (f.coord === 4 && t.coord === 2 &&
            !this.position.disable4castling[4] && !this.position.disable4castling[0] &&
            !this.fieldUnderAttack(4, "w") && !this.fieldUnderAttack(3, "w") && !this.fieldUnderAttack(2, "w")  &&
            this.position.map[1] === "1" && this.position.map[2] === "1" && this.position.map[3] === "1"
        )
            return true;
    }
    #checkK(f, t) {
        if ("RNBQKP".includes(t.figure)) return false;

        var dh = t.h - f.h;
        var dv = t.v - f.v;

        if (dv === 1 && dh === -1) return true;
        if (dv === 1 && dh === 0) return true;
        if (dv === 1 && dh === 1) return true;
        if (dv === 0 && dh === 1) return true;
        if (dv === 0 && dh === -1) return true;
        if (dv === -1 && dh === 1) return true;
        if (dv === -1 && dh === 0) return true;
        if (dv === -1 && dh === -1) return true;

        if (f.coord === 60 && t.coord === 62 &&
            !this.position.disable4castling[60] && !this.position.disable4castling[63] &&
            !this.fieldUnderAttack(60, "b") && !this.fieldUnderAttack(61, "b") && !this.fieldUnderAttack(62, "b") &&
            this.position.map[61] === "1" && this.position.map[62] === "1"
        )
            return true;
        if (f.coord === 60 && t.coord === 58 &&
            !this.position.disable4castling[60] && !this.position.disable4castling[56] &&
            !this.fieldUnderAttack(60, "b") && !this.fieldUnderAttack(59, "b") && !this.fieldUnderAttack(58, "b") &&
            this.position.map[59] === "1" && this.position.map[58] === "1" && this.position.map[57] === "1"
        )
            return true;
    }




    #checkB(f, t) {
        if ("RNBQKP".includes(t.figure)) return false;

        var dh = t.h - f.h;
        var dv = t.v - f.v;

        if (Math.abs(dh) !== Math.abs(dv)) return false;
        var hSign = (dh > 0) ? 1 : -1
        var vSign = (dv > 0) ? 1 : -1;
        for (var i = 1; i < Math.abs(dh); i++) {
            var inf = this.getInfoVH(f.v + vSign * i, f.h + hSign * i);
            if (inf.figure !== "1") return false;
        }
        return true;
    }
    #checkb(f, t) {
        if ("rnbqkp".includes(t.figure)) return false;

        var dh = t.h - f.h;
        var dv = t.v - f.v;

        if (Math.abs(dh) !== Math.abs(dv)) return false;
        var hSign = (dh > 0) ? 1 : -1
        var vSign = (dv > 0) ? 1 : -1;
        for (var i = 1; i < Math.abs(dh); i++) {
            var inf = this.getInfoVH(f.v + vSign * i, f.h + hSign * i);
            if (inf.figure !== "1") return false;
        }
        return true;
    }
    #checkR(f, t) {
        if ("RNBQKP".includes(t.figure)) return false;
        if (!(t.h === f.h || t.v === f.v)) return false;

        if (t.h === f.h) {
            var dv = t.v - f.v;
            var vSign = (dv > 0) ? 1 : -1;
            for (var i = 1; i < Math.abs(dv); i++) {
                var inf = this.getInfoVH(f.v + vSign * i, f.h);
                if (inf.figure !== "1") return false;
            }
        } else {
            var dh = t.h - f.h;
            var hSign = (dh > 0) ? 1 : -1;
            for (var i = 1; i < Math.abs(dh); i++) {
                var inf = this.getInfoVH(f.v, f.h + hSign * i);
                if (inf.figure !== "1") return false;
            }
        }
        return true;
    }
    #checkr(f, t) {
        if ("rnbqkp".includes(t.figure)) return false;
        if (!(t.h === f.h || t.v === f.v)) return false;

        if (t.h === f.h) {
            var dv = t.v - f.v;
            var vSign = (dv > 0) ? 1 : -1;
            for (var i = 1; i < Math.abs(dv); i++) {
                var inf = this.getInfoVH(f.v + vSign * i, f.h);
                if (inf.figure !== "1") return false;
            }
        } else {
            var dh = t.h - f.h;
            var hSign = (dh > 0) ? 1 : -1;
            for (var i = 1; i < Math.abs(dh); i++) {
                var inf = this.getInfoVH(f.v, f.h + hSign * i);
                if (inf.figure !== "1") return false;
            }
        }
        return true;
    }
    #checkQ(f, t) {
        return this.#checkR(f, t) || this.#checkB(f, t);
    }
    #checkq(f, t) {
        return this.#checkr(f, t) || this.#checkb(f, t);
    }

}