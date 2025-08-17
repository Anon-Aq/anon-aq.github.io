import Manager from "./manager.js";
import Piece from "./piece.js";
import { PieceColor } from "./pieceColor.js";
import Player from "./player.js";

export default class Board {
    cellMap: string [][] = [];
    rows: number = 6;
    columns: number = 7;
    btnReset = document.querySelector('[btn-reset]');
    currentPlayerColor: string = PieceColor.Yellow;
    possibleCombinations = {Down: 'down', Right :'right', UpRight: 'upRight', DownRight: 'DownRight'} as const;
    dropCells: NodeListOf<Element> = document.querySelectorAll('[drop-cell]'); // first row cells (hidden)
    //49 cells?
    cells: NodeListOf<Element> = document.querySelectorAll('[cell]');
    // const this.dropCells: NodeListOf<Element> = document.querySelectorAll('.cell.drop-cell');
    allCells: any [][] = [];    // for easier access of all the cells inc drop cells
    manager: Manager;
    winLoseMsg = document.querySelector('[win-lose-draw-msg]');

constructor() {
    // alert('');
this.manager = new Manager(new Player('Aqib', 'imgg', 0, true), new Player('opp', 'imgg', 0, false), 60);

this.initialize();

}

initialize() {

    // this.winLoseMsg!.textContent = `Current Turn: ${this.currentPlayerColor}`;
    this.setWinLoseMessage(this.manager.currentTurnColor);

   this.dropCells.forEach((dCell: Element) => {
    dCell.addEventListener('mouseover', () => {
        // dCell.setAttribute('style', `background-color: ${this.currentPlayerColor};`);
        if (!this.manager.isGameOver) {
        dCell.classList.add(this.manager.currentTurnColor);
        }

    });
    dCell.addEventListener('mouseout', () => {
        dCell.classList.remove('red', 'yellow');

    });
    dCell.addEventListener('click', () => {
        if (!this.manager.isGameOver) {
         //All to do with drop cell color state can change into a function also can add after animation + delay
        dCell.classList.remove('red', 'yellow');
        // switchPlayer();
        }
       
    });
   });

    // console.log(cells.length);
    for (let i = 0; i < this.rows; i++) {    
        this.cellMap[i] = [];
        for (let j = 0; j < this.columns; j++) {
            this.cellMap[i][j] = PieceColor.Empty;    //6 by 7 put as 'e' empty
        }
    }
    let num = 0;
    //new for ease
    for (let i = 0; i < this.rows + 1; i++) {    
        this.allCells[i] = [];
        for (let j = 0; j < this.columns; j++) {
            num += 1;
            // console.log(num);
             this.allCells[i][j] = this.cells[num - 1];
        }
    }
   

    for (let i = 0; i < this.allCells.length; i++) {
        for (let j = 0; j < this.allCells[i].length; j++) {
            // console.log(this.allCells[i][j]);
            this.allCells[i][j].addEventListener('click', (e: Event) => {
                // console.log('row and col = ', i, j);

                if (!this.manager.isGameOver) {

                    if(this.cellMap[0][j] != PieceColor.Empty) return;
                    // this.placePiece(i, j, this.currentPlayerColor); // 
                    this.placePiece(new Piece(this.manager.currentTurnColor, i, j));    //reimp
                    this.manager.switchTurn();  // reimpliment
                    this.winMessage();

                }
               
            });
        }

    }

    this.btnReset?.addEventListener('click', () => this.manager.resetGame(this.allCells, this.cellMap)); //reimp
}

delay(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    })
}
 
 placePiece(piece: Piece) {
      for (let i = this.rows - 1; i >= 0; i--) {
        if (this.cellMap[i][piece.col] == 'empty' as string) {
            //place piece on that drop cell
            piece.row = i;
            // console.log(piece.col);
            switch(i) {
                case 0: 
                    this.setAnimation(piece, 150);
                    break;
                case 1: 
                    this.setAnimation(piece, 200);
                    break;
                case 2: 
                    this.setAnimation(piece, 250);
                    break;
                case 3: 
                    this.setAnimation(piece, 300);
                    break;
                case 4: 
                    this.setAnimation(piece, 350);
                    break;
                case 5: 
                    this.setAnimation(piece, 400);
                    break;
                 
            }
            this.allCells[i + 1][piece.col].appendChild(piece.pieceElem);
            this.cellMap[i][piece.col] = piece.pieceColor;
            // checkCombinations(i, col, color);
            break;
        }
    }

    //add delay here
    const possCombos: string[] = Object.values(this.possibleCombinations);

    for (let i = 0; i < this.cellMap.length; i++) {
        for (let j = 0; j < this.cellMap[i].length; j++) {
            
            possCombos.forEach((possCombo) => {

                // this.checkCombination(i, j, PieceColor.Yellow, possCombo);  //reimp
                this.checkCombination(i, j, this.manager.currentTurnColor, possCombo);  //reimp
            });
 
        }
    }
    
}

 setAnimation(piece: Piece, duration: number) {
    const cellSize = getComputedStyle(document.documentElement).getPropertyValue('--cell-size');
    piece.pieceElem.animate([
        // key frames
        { transform: `translateY(calc(var(--cell-size) * ${-piece.row}))`}, // from top
        { transform: 'translateY(calc(var(--cell-size) - var(--cell-size)))'} // to bottom
      ], {
        // sync options
        duration: duration,
        easing: 'ease-in'        
      });
 
}

// function callCombinationCheck() {
   
// }

 winningCombination: number[][]  = [[]];
//check left, Right, up, Down, diagonally 2



 winMessage() {
    if (this.manager.isGameOver) {
        switch (this.manager.currentTurnColor) {
            case PieceColor.Yellow:
                this.winLoseMsg!.textContent = `${PieceColor.Red} Wins!`;
                break;
            case PieceColor.Red:
                this.winLoseMsg!.textContent = `${PieceColor.Yellow} Wins!`;
                break;
        }
    }

    if (this.noEmptyCellsLeft()) {    //reimp
        if (!this.manager.isGameOver) {
            this.manager.isGameOver = true;
            this.winLoseMsg!.textContent = `Draw!`;
            
        }
    }
}

  noEmptyCellsLeft(): boolean { // use this method to check if game is a draw
// Turns 2d arr into 1D Arr
//    const everyCell: [] =  [].concat(...allCells);
   let inc = 0;
   const playableCells: string[] = [];
   for (let i = 0; i < this.cellMap.length; i++) {
        for (let j = 0; j < this.cellMap[i].length; j++) {
            playableCells[inc] = this.cellMap[i][j];  
            inc++;
            console.log(this.cellMap[i][j]); //42

        }
       

   }
//    console.log(playableCells.length)
   const isEmptyCells = !playableCells.includes('empty');
   return isEmptyCells;
   
}

highlightWinPiece(winningCombination: number [][], color: string) {

    // console.log('winning combo numbers = ', winningCombination);
    for (let i = 0; i < winningCombination.length; i++) {        
        this.allCells[(winningCombination[i][0] + 1)][winningCombination[i][1]].firstChild.classList.add('piece-highlight');
      
    }
}

setWinLoseMessage(PieceColor: string) {
    this.winLoseMsg!.textContent = `Current Turn: ${PieceColor}`;

}

 checkCombination(row: number, col: number, pieceColor: string, possCombo: string) {
    let count = 0;
    let innerwinningCombination: number[][] = [];
    
    // let nextRow = row;
    // let nextCol = col;

    for (let i = 0; i < 4; i++) {
        
        // if (nextRow < 0 || nextRow > 5 || nextCol < 0 || nextCol > 6) break; // double check this

       
        if (possCombo == this.possibleCombinations.Down) { // v
            if (row + i < 0 || row + i > 5 || col < 0 || col > 6) break; // double check this
           
            if (this.cellMap[row + i][col] == pieceColor) { // checks down // should work for up too
                count += 1; 
                innerwinningCombination.push([row + i, col]);
                // console.log(count);
            }
        }
        if (possCombo == this.possibleCombinations.Right) {  // h
            if (row  < 0 || row  > 5 || col + i  < 0 || col + i > 6) break; // double check this
           
            if (this.cellMap[row][col + i] == pieceColor) { // checks right // 
                count += 1; 
                // console.log('FROM TOP:', col + i);
                innerwinningCombination.push([row, col + i]);

                // console.log(count);
            }
        }
        if (possCombo == this.possibleCombinations.UpRight) {
            if (row - i < 0 || row - i > 5 || col + i < 0 || col + i > 6) break; // double check this
           
            if (this.cellMap[row - i][col + i] == pieceColor) { // checks down // should work for up too
                count += 1; 
                innerwinningCombination.push([row - i, col + i]);

                // console.log(count);
            }
        }
        if (possCombo == this.possibleCombinations.DownRight) {
            if (row - i < 0 || row - i > 5 || col - i < 0 || col - i > 6) break; // double check this
           
            if (this.cellMap[row - i][col - i] == pieceColor) { // checks down // should work for up too
                count += 1; 
                innerwinningCombination.push([row - i, col - i]);

                // console.log(count);
            }
        }
        if (count >= 4) {
            this.winningCombination = innerwinningCombination;
            this.highlightWinPiece(this.winningCombination, pieceColor);
            console.log('You Win! 4 in a row');
            this.manager.isGameOver = true;
            this.dropCells.forEach((dCell) => {
                dCell.classList.remove('red', 'yellow');
            });


        } 

    }

    
}


}






