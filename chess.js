var map
var divSquare = '<div id="s%coord" class="square %color"></div>'
var divFigure = '<div id="f%coord" class="figure">$figure</div>'
$(function () {
    start()
    //$('.buttonNew').click(newFiguresPHP)
       
    
    
});

function start() {
    map = new Array(64)
    addSquares();
    showFigures('rnbqkbnrpppppppp11111111111111111111111111111111PPPPPPPPRNBQKBNR')
}


function setDraggable() {
    $('.figure').draggable({
        snap: '.square',
        revert: 'invalid'
    })
}

function getV(coord) {
    return (coord % 8) + 1;
}

function getH(coord) {
    return 8-(coord - (coord % 8))/8;
}

function getCell(v, h) {
    return v - 1 + (8 - h) * 8;
}


function canMove(z) {
    var id = null;
    var fr = null;
    if (z && z.draggable && z.draggable.attr) {
        id = z.draggable.attr('id');
        fr = $(z.draggable);
    } else {
        if (z && z[0]) {
            fr = $(z[0]);
            id = z[0].id;
        };
    }

    if (!id) return false;
    var frCoord = id.substring(1)
    var toCoord = this.id.substring(1)
    var fromInfo = {
        figure : map[frCoord],
        h : getH(frCoord),
        v: getV(frCoord),
        coord: frCoord
    }

    if (!fromInfo.figure || fromInfo.figure === "1") return false;


    var cell = map[toCoord];
    var cellIsEmpty = !cell || cell === "1";
    var toInfo = {
        figure: cellIsEmpty?"1":cell,
        h: getH(toCoord),
        v: getV(toCoord),
         coord: toCoord,
        isEmpty: cellIsEmpty
    }
     console.log("from:")
    console.log(fromInfo)
    console.log("to:")
    console.log(toInfo)

    switch (fromInfo.figure) {
        case "P": return checkP(fromInfo, toInfo);
        case "p": return checkp(fromInfo, toInfo);
        case "N": return checkN(fromInfo, toInfo);
        case "n": return checkn(fromInfo, toInfo);
        case "K": return checkK(fromInfo, toInfo);
        case "k": return checkk(fromInfo, toInfo);


        default:
            return cellIsEmpty;

    }

    
}


function setDroppable() {
    $('.square').droppable(
        {
        accept: canMove,
        drop:function (event, ui) {
            var frCoord = ui.draggable.attr('id').substring(1)
            var toCoord = this.id.substring(1)
            
            moveFigure(frCoord, toCoord)
        }
    })

 }

function moveFigure(frCoord, toCoord) {
    console.log('move from' + frCoord + 'to' + toCoord)
    figure = map[frCoord]
    showFigureAt(frCoord, '1')
    showFigureAt(toCoord, figure)
      
}




function addSquares() {
    console.log('addSquares')
    $('.board').html('');
    for (var coord = 0; coord < 64; coord++)
    $('.board').append(divSquare.replace('%coord', coord).replace('%color', isBlackSquareAt(coord) ? 'black' : 'white'));
    setDroppable()
}


function showFigures(figures){
    for (var coord = 0; coord < 64; coord++)
        showFigureAt(coord, figures.charAt(coord))
    
}

function showFigureAt(coord, figure) {
    map[coord] = figure
    $('#s' + coord).html(divFigure.replace('%coord', coord).replace('$figure', getChessSymbol(figure)))
    setDraggable()
}



function getChessSymbol(figure) {
    switch (figure) {
        case 'K' : return '&#9812'
        case 'Q' : return '&#9813'
        case 'R' : return '&#9814'
        case 'B' : return '&#9815'
        case 'N' : return '&#9816'
        case 'P' : return '&#9817'
        case 'k' : return '&#9818'
        case 'q' : return '&#9819'
        case 'r' : return '&#9820'
        case 'b' : return '&#9821'
        case 'n' : return '&#9822'
        case 'p' : return '&#9823'
        default : return ''
    }
}

function isBlackSquareAt(coord) {
    return (coord % 8 + Math.floor(coord / 8)) % 2
}

function newGame() {
    start();
}


function checkP(f, t) {
    
    if (t.h <= f.h) return false;
    if (t.h === f.h + 1 && (t.v === f.v + 1 || t.v === f.v - 1) && ("rnbqkp".includes(t.figure))) return true;
    if (t.v === f.v && (t.h === f.h + 1) && t.isEmpty) return true;
    if (t.v === f.v && (t.h === f.h + 2) && f.h === 2 && t.isEmpty) return true;
}
function checkp(f, t) {

    if (t.h >= f.h) return false;
    if (t.h === f.h - 1 && (t.v === f.v + 1 || t.v === f.v - 1) && ("RNBQKP".includes(t.figure))) return true;
    if (t.v === f.v && (t.h === f.h - 1) && t.isEmpty) return true;
    if (t.v === f.v && (t.h === f.h - 2) && f.h === 7 && t.isEmpty) return true;
}
function checkN(f, t) {
    if ("RNBQKP".includes(t.figure)) return false;

    var dh = t.h - f.h;
    var dv = t.v - f.v;


    if (dv===2 && dh===-1) return true;
    if (dv===2 && dh===1) return true;
    if (dv===-2 && dh===-1) return true;
    if (dv===-2 && dh===1) return true;
     if (dv===1 && dh===-2) return true;
    if (dv===1 && dh===2) return true;
    if (dv===-1 && dh===-2) return true;
    if (dv===-1 && dh===2) return true;
}
function checkn(f, t) {
    if ("rnbqkp".includes(t.figure)) return false;

    var dh = t.h - f.h;
    var dv = t.v - f.v;


    if (dv===2 && dh===-1) return true;
    if (dv===2 && dh===1) return true;
    if (dv===-2 && dh===-1) return true;
    if (dv===-2 && dh===1) return true;
    if (dv===1 && dh===-2) return true;
    if (dv===1 && dh===2) return true;
    if (dv===-1 && dh===-2) return true;
    if (dv===-1 && dh===2) return true;
}
function checkk(f, t) {
    if ("rnbqkp".includes(t.figure)) return false;

    var dh = t.h - f.h;
    var dv = t.v - f.v;


    if (dv===1 && dh===-1) return true;
    if (dv===1 && dh===0) return true;
    if (dv===1 && dh===1) return true;
    if (dv===0 && dh===1) return true;
    if (dv===0 && dh===-1) return true;
    if (dv===-1 && dh===1) return true;
    if (dv===-1 && dh===0) return true;
    if (dv===-1 && dh===-1) return true;
}
function checkK(f, t) {
    if ("RNBQKP".includes(t.figure)) return false;

    var dh = t.h - f.h;
    var dv = t.v - f.v;


    if (dv===1 && dh===-1) return true;
    if (dv===1 && dh===0) return true;
    if (dv===1 && dh===1) return true;
    if (dv===0 && dh===1) return true;
    if (dv===0 && dh===-1) return true;
    if (dv===-1 && dh===1) return true;
    if (dv===-1 && dh===0) return true;
    if (dv===-1 && dh===-1) return true;
}