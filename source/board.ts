const cellArr: string [][] = [];
const rows = 6;
const columns = 7;
const btnReset = document.querySelector('[btn-reset]');
// const cssClrYellow = '#f9cd09';
// const cssClrRed = '#dd0d11';
enum pieceColor {yellow  = 'yellow', red = 'red'}
let currentPlayerColor: pieceColor = pieceColor.yellow;
let isGameOver = false;
// let isTurn: boolean = true;
// const possibleCombinations: {} = {up: -1, down: 1, left: -1, right: 1}
enum possibleCombinations {down = 'down', right = 'right', upRight = 'upRight', downRight = 'downRight'};
//49 cells?
const cells: NodeListOf<Element> = document.querySelectorAll('[cell]');
// const dropCells: NodeListOf<Element> = document.querySelectorAll('.cell.drop-cell');
const dropCells: NodeListOf<Element> = document.querySelectorAll('[drop-cell]');
const allCells: any [][] = [];    // for easier access of all the cells inc drop cells
const winLoseMsg = document.querySelector('[win-lose-draw-msg]');
initialize();

function initialize() {
    // alert(cells.length);
    winLoseMsg!.textContent = `Current Turn: ${currentPlayerColor}`;

   dropCells.forEach((dCell: Element) => {
    dCell.addEventListener('mouseover', () => {
        // dCell.setAttribute('style', `background-color: ${currentPlayerColor};`);
        if (!isGameOver) {
        dCell.classList.add(currentPlayerColor);

        }

    });
    dCell.addEventListener('mouseout', () => {
        dCell.classList.remove('red', 'yellow');

    });
    dCell.addEventListener('click', () => {
        if (!isGameOver) {
         //All to do with drop cell color state can change into a function also can add after animation + delay
        dCell.classList.remove('red', 'yellow');
        // switchPlayer();
        }
       
    });
   });

    // console.log(cells.length);
    for (let i = 0; i < rows; i++) {    
        cellArr[i] = [];
        for (let j = 0; j < columns; j++) {
            cellArr[i][j] = 'empty';    //6 by 7 put as 'e' empty
        }
    }
    let num = 0;
    //new for ease
    for (let i = 0; i < rows + 1; i++) {    
        allCells[i] = [];
        for (let j = 0; j < columns; j++) {
            num +=1;
            // console.log(num);
             allCells[i][j] = cells[num - 1];
        }
    }
   

    for (let i = 0; i < allCells.length; i++) {
        for (let j = 0; j < allCells[i].length; j++) {
            // console.log(allCells[i][j]);
            allCells[i][j].addEventListener('click', (e: Event) => {
                // console.log('row and col = ', i, j);

                if (!isGameOver) {

                    if(cellArr[0][j] != 'empty') return;
                    placePiece(i, j, currentPlayerColor);
                    switchPlayer();

                }
               
            });
        }

    }

    btnReset?.addEventListener('click', () => resetGame());
}

function delay(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    })
}
 
async function placePiece(row: number, col: number, pieceColor: string) {
      for (let i = rows - 1; i >= 0; i--) {
        if (cellArr[i][col] == 'empty') {
            //place piece on that drop cell
            const pieceElem = document.createElement('div');
            pieceElem.classList.add('piece');
            pieceElem.classList.add(pieceColor);
            switch(i) {
                case 0: 
                    setAnimation(pieceElem, i, 150);
                    break;
                case 1: 
                    setAnimation(pieceElem, i, 200);
                    break;
                case 2: 
                    setAnimation(pieceElem, i, 250);
                    break;
                case 3: 
                    setAnimation(pieceElem, i, 300);
                    break;
                case 4: 
                    setAnimation(pieceElem, i, 350);
                    break;
                case 5: 
                    setAnimation(pieceElem, i, 400);
                    break;
                 
            }
            allCells[i + 1][col].appendChild(pieceElem);
            cellArr[i][col] = pieceColor;
            // checkCombinations(i, col, color);
            break;
        }
    }

    //add delay here
    const possCombos: string[] = Object.values(possibleCombinations);

    for (let i = 0; i < cellArr.length; i++) {
        for (let j = 0; j < cellArr[i].length; j++) {
            
            possCombos.forEach((possCombo) => {

                checkCombination(i, j, pieceColor.toString(), possCombo);
            });
 
        }
    }
    
}

function setAnimation(pieceEl: HTMLElement, row: number, duration: number) {
    const cellSize = getComputedStyle(document.documentElement).getPropertyValue('--cell-size');
    pieceEl.animate([
        // key frames
        { transform: `translateY(calc(var(--cell-size) * ${-row}))`}, // from top
        { transform: 'translateY(calc(var(--cell-size) - var(--cell-size)))'} // to bottom
      ], {
        // sync options
        duration: duration,
        easing: 'ease-in'        
      });
// }
//     pieceEl.animate([
//         // key frames
//         { transform: 'translateY(0px)' },
//         { transform: 'translateY(-300px)' }
//       ], {
//         // sync options
//         duration: 1000,
//         // iterations: Infinity
        
//       });

}

// function callCombinationCheck() {
   
// }

let winningCombination: number[][]  = [[]];
//check left, right, up, down, diagonally 2
async function checkCombination(row: number, col: number, pieceColor: string, possCombo: string) {
    let count = 0;
    let innerwinningCombination: number[][] = [];
    
    // let nextRow = row;
    // let nextCol = col;

    for (let i = 0; i < 4; i++) {
        
        // if (nextRow < 0 || nextRow > 5 || nextCol < 0 || nextCol > 6) break; // double check this

       
        if (possCombo == possibleCombinations.down) { // v
            if (row + i < 0 || row + i > 5 || col < 0 || col > 6) break; // double check this
           
            if (cellArr[row + i][col] == pieceColor) { // checks down // should work for up too
                count += 1; 
                innerwinningCombination.push([row + i, col]);
                // console.log(count);
            }
        }
        if (possCombo == possibleCombinations.right) {  // h
            if (row  < 0 || row  > 5 || col + i  < 0 || col + i > 6) break; // double check this
           
            if (cellArr[row][col + i] == pieceColor) { // checks right // 
                count += 1; 
                // console.log('FROM TOP:', col + i);
                innerwinningCombination.push([row, col + i]);

                // console.log(count);
            }
        }
        if (possCombo == possibleCombinations.upRight) {
            if (row - i < 0 || row - i > 5 || col + i < 0 || col + i > 6) break; // double check this
           
            if (cellArr[row - i][col + i] == pieceColor) { // checks down // should work for up too
                count += 1; 
                innerwinningCombination.push([row - i, col + i]);

                // console.log(count);
            }
        }
        if (possCombo == possibleCombinations.downRight) {
            if (row - i < 0 || row - i > 5 || col - i < 0 || col - i > 6) break; // double check this
           
            if (cellArr[row - i][col - i] == pieceColor) { // checks down // should work for up too
                count += 1; 
                innerwinningCombination.push([row - i, col - i]);

                // console.log(count);
            }
        }
        if (count >= 4) {
            winningCombination = innerwinningCombination;
            highlightWinPiece(winningCombination, pieceColor);
            console.log('You Win! 4 in a row');
            isGameOver = true;
            dropCells.forEach((dCell) => {
                dCell.classList.remove('red', 'yellow');
            });


        } 

    }

    
}
function noEmptyCellsLeft(): boolean { // use this function to check if game is a draw
         
        // Turns 2d arr into 1D Arr
    //    const everyCell: [] =  [].concat(...allCells);

       let playableCells: [] = [];
       for (let i = 0; i < cellArr.length; i++) {
            for (let j = 0; j < cellArr[i].length; j++) {
                playableCells.push(cellArr[i][j]);
                    
            }
           

       }
       const isEmptyCells = !playableCells.includes('empty');

       return isEmptyCells;
       
    
}

function switchPlayer() {

    switch (currentPlayerColor) {
        case pieceColor.yellow:
            currentPlayerColor = pieceColor.red;
            winLoseMsg!.textContent = `Current Turn: ${currentPlayerColor}`;
            break;
        case pieceColor.red:
            currentPlayerColor = pieceColor.yellow;
            winLoseMsg!.textContent = `Current Turn: ${currentPlayerColor}`;
            break;
    
        default:
            break;
    }
   
    winMessage();
  

 
}

function winMessage() {
    if (isGameOver) {
        switch (currentPlayerColor) {
            case pieceColor.yellow:
                winLoseMsg!.textContent = `${pieceColor.red} Wins!`;
                break;
            case pieceColor.red:
                winLoseMsg!.textContent = `${pieceColor.yellow} Wins!`;
                break;
        }
    }

    if (noEmptyCellsLeft()) {
        if (!isGameOver) {
            isGameOver = true;
            winLoseMsg!.textContent = `Draw!`;
            
        }
    }
}
// const wc: number[][] = [[1,2], [5,6]];

async function highlightWinPiece(winningCombination: number [][], color: string) {

    // console.log('winning combo numbers = ', winningCombination);
    for (let i = 0; i < winningCombination.length; i++) {        
        allCells[(winningCombination[i][0] + 1)][winningCombination[i][1]].firstChild.classList.add('piece-highlight');
      
    }

  

    
    
}

function resetGame() {
    isGameOver = false;
    winLoseMsg!.textContent = '';


   for (let i = 0; i < allCells.length; i++) {
    for (let j = 0; j < allCells[i].length; j++) {
        allCells[i][j].innerHTML = '';
    }

    for (let i = 0; i < cellArr.length; i++) {
        for (let j = 0; j < cellArr[i].length; j++) {
            cellArr[i][j] = 'empty';
        }
    }
   }
//    winLoseMsg!.textContent = `Current Turn: ${currentPlayerColor}`;

//    currentPlayerColor = pieceColor.yellow;
}









