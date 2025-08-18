export default class Piece {
    constructor(pieceColor, row = 0, col = 0) {
        this.row = row;
        this.col = col;
        this.pieceColor = pieceColor;
        this.pieceElem = document.createElement('div');
        this.pieceElem.style.zIndex = '10';
        this.pieceElem.classList.add('piece');
        this.pieceElem.classList.add(pieceColor);
    }
}
