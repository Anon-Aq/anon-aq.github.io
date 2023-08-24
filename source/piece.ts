import { PieceColor } from "./pieceColor.js";

export default class Piece {
    row: number;
    col: number;
    pieceColor;
    pieceElem: HTMLElement;

    constructor(pieceColor: string, row: number = 0, col: number = 0) {
        this.row = row;
        this.col = col;
        this.pieceColor = pieceColor;

        this.pieceElem = document.createElement('div');
        this.pieceElem.classList.add('piece');
        this.pieceElem.classList.add(pieceColor);
    }

}