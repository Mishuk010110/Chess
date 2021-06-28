
var $engine = new ChessEngine();
var divSquare = '<div id="s%coord" class="square %color"></div>'
var divFigure = '<div id="f%coord" class="figure fig-%color">$figure</div>'
$(function () {
    start()
    //$('.buttonNew').click(newFiguresPHP)



});

function start() {
    $engine.newGame();
    addSquares();
    showFigures($engine.position.map);
}


function setDraggable() {
    let disableClass = "fig-w";
    let enableClass = "fig-b";
    if ($engine.position.who === "w") {
         disableClass = "fig-b";
         enableClass = "fig-w";
    }

    let options = {
        snap: '.square',
        revert: 'invalid',
        grid: [$('.square').width(), $('.square').height()],
        containment: $('.board'),
        start: function (event, ui) {
            var coord = +this.id.substring(1);
            var eList = $engine.getMovesFor(coord);
            $('.square').removeClass("can-move");
            for (var i = 0; i < eList.length; i++) {
                let id = "#s" + eList[i];
                $( id).addClass("can-move")
            }
        },
        stop: function () {
            $('.square').removeClass("can-move");
        }
    }

    $('.' + enableClass).draggable(options)
    $('.' + enableClass).draggable('enable')

    $('.' + disableClass).draggable(options)
    $('.' + disableClass).draggable('disable')


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
    var frCoord = +id.substring(1)
    var toCoord = +this.id.substring(1)

    return $engine.check(frCoord, toCoord)
}


function setDroppable() {
    $('.square').droppable(
        {
            accept: canMove,
            drop: function (event, ui) {
                var frCoord = +ui.draggable.attr('id').substring(1)
                var toCoord = +this.id.substring(1)

                moveFigure(frCoord, toCoord)
            }
        })

}

function moveFigure(frCoord, toCoord) {
    console.log('move from' + frCoord + 'to' + toCoord)
    let changes = $engine.position.move(frCoord, toCoord);
    for (var i = 0; i < changes.length; i++) {
        let coord = changes[i];
        showFigureAt(coord, $engine.position.map[coord])
    }
  
  
    setDraggable()
}




function addSquares() {
    console.log('addSquares')
    $('.board').html('');
    for (var coord = 0; coord < 64; coord++)
        $('.board').append(divSquare.replace('%coord', coord).replace('%color', isBlackSquareAt(coord) ? 'black' : 'white'));
    setDroppable()
}


function showFigures(figures) {
    for (var coord = 0; coord < 64; coord++)
        showFigureAt(coord, figures[coord])
    setDraggable()
}

function showFigureAt(coord, figure) {
    let color = ($engine.isBlackFigure(figure)) ? "b" : "w";
    let figureHtml = divFigure.replace('%coord', coord).replace('$figure', getChessSymbol(figure)).replace('%color',color);
    $('#s' + coord).html(figureHtml)
    
}



function getChessSymbol(figure) {
    switch (figure) {
        case 'K': return '&#9812'
        case 'Q': return '&#9813'
        case 'R': return '&#9814'
        case 'B': return '&#9815'
        case 'N': return '&#9816'
        case 'P': return '&#9817'
        case 'k': return '&#9818'
        case 'q': return '&#9819'
        case 'r': return '&#9820'
        case 'b': return '&#9821'
        case 'n': return '&#9822'
        case 'p': return '&#9823'
        default: return ''
    }
}

function isBlackSquareAt(coord) {
    return (coord % 8 + Math.floor(coord / 8)) % 2
}

function newGame() {
    start();
}
