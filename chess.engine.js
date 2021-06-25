class ChessEngine {

    constructor() {
        this.position = new ChessPosition();
    }

    newGame() {
        this.position = new ChessPosition();
    }

    getInfoVH(v, h) {
        
        var coord = this.#getCell(v, h);
        return {
            figure: this.position.map[coord],
            h: h,
            v: v,
            coord: coord
        }
    }

    getInfo(coord) {
        return {
            figure: this.position.map[coord],
            h: this.#getH(coord),
            v: this.#getV(coord),
            coord: coord
        }
    }

    check(fromCoord, toCoord) {
        let fromInfo = this.getInfo(fromCoord);
        let toInfo = this.getInfo(toCoord);
        return this.checkMove(fromInfo, toInfo);
    }

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

    #getV(coord) {
        return (coord % 8) + 1;
    }

    #getH(coord) {
        return 8 - (coord - (coord % 8)) / 8;
    }

    #getCell(v, h) {
        return v - 1 + (8 - h) * 8;
    }




    #checkP(f, t) {

        if (t.h <= f.h) return false;
        if (t.h === f.h + 1 && (t.v === f.v + 1 || t.v === f.v - 1) && ("rnbqkp".includes(t.figure))) return true;
        if (t.v === f.v && (t.h === f.h + 1) && t.figure === "1") return true;
        if (t.v === f.v && (t.h === f.h + 2) && f.h === 2 && t.figure === "1" && this.getInfoVH(f.v, 3).figure === "1") return true;

    }
    #checkp(f, t) {

        if (t.h >= f.h) return false;
        if (t.h === f.h - 1 && (t.v === f.v + 1 || t.v === f.v - 1) && ("RNBQKP".includes(t.figure))) return true;
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