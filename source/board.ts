const cellArr: string [][] = [];
const rows = 6;
const columns = 7;
const btnReset = document.querySelector('.btn-reset');
// const cssClrYellow = '#f9cd09';
// const cssClrRed = '#dd0d11';
enum pieceColor {yellow  = 'yellow', red = 'red'}
let cssColorClass = pieceColor.yellow;
let currentTurnColor = pieceColor.yellow;
let isGameOver = false;
let isTurn: boolean = true;
// const possibleCombinations: {} = {up: -1, down: 1, left: -1, right: 1}
enum possibleCombinations {down = 'down', right = 'right', upRight = 'upRight', downRight = 'downRight'};
//42 playable cells
const cells: NodeListOf<Element> = document.querySelectorAll('.cell');
const dropCells: NodeListOf<Element> = document.querySelectorAll('.cell.drop-cell');
const eCell: any [][] = [];    // for easier access of all the cells inc drop cells
const winLoseMsg = document.querySelector('.win-lose-draw-msg');
initialize();

function initialize() {
   dropCells.forEach((dCell: Element) => {
    dCell.addEventListener('mouseover', () => {
        // dCell.setAttribute('style', `background-color: ${cssColorClass};`);
        if (!isGameOver)
        dCell.classList.add(cssColorClass)
        // dCell.classList.add('yellow');

    });
    dCell.addEventListener('mouseout', () => {
        dCell.classList.remove('red', 'yellow');

    });
    dCell.addEventListener('click', () => {
        if (!isGameOver) {
             //All to do with drop cell color state can change into a function also can add after animation + delay
        dCell.classList.remove('red', 'yellow');
        if (cssColorClass == pieceColor.yellow) {
            cssColorClass = pieceColor.red;
            dCell.classList.add(cssColorClass);

        }
        else {
        cssColorClass = pieceColor.yellow;
        dCell.classList.add(cssColorClass);
        }
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
        eCell[i] = [];
        for (let j = 0; j < columns; j++) {
            num +=1;
            // console.log(num);
             eCell[i][j] = cells[num - 1];
        }
    }
   

    for (let i = 0; i < eCell.length; i++) {
        for (let j = 0; j < eCell[i].length; j++) {
            // console.log(eCell[i][j]);
            eCell[i][j].addEventListener('click', (e: Event) => {
                // console.log('row and col = ', i, j);

                if (!isGameOver) {
                    placePiece(i, j, currentTurnColor);
                    
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
            eCell[i + 1][col].appendChild(pieceElem);
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


function switchPlayer() {
    isTurn = !isTurn;
    // cssColorClass = '';

    if (!isTurn) {
        currentTurnColor = pieceColor.red;
        cssColorClass = pieceColor.red;
        // isTurn = false;

    }
    else {
        currentTurnColor = pieceColor.yellow;
        cssColorClass = pieceColor.yellow;

        // isTurn = true;
    }
}
// const wc: number[][] = [[1,2], [5,6]];

async function highlightWinPiece(winningCombination: number [][], color: string) {

    // console.log('winning combo numbers = ', winningCombination);
    for (let i = 0; i < winningCombination.length; i++) {        
        eCell[(winningCombination[i][0] + 1)][winningCombination[i][1]].firstChild.classList.add('piece-highlight');
      
    }
    winLoseMsg!.textContent = `${currentTurnColor} Wins!`;


    
    
}

function resetGame() {
    isGameOver = false;
    winLoseMsg!.textContent = '';

   for (let i = 0; i < eCell.length; i++) {
    for (let j = 0; j < eCell[i].length; j++) {
        eCell[i][j].innerHTML = '';
    }

    for (let i = 0; i < cellArr.length; i++) {
        for (let j = 0; j < cellArr[i].length; j++) {
            cellArr[i][j] = 'empty';
        }
    }
   }
//    currentTurnColor = pieceColor.yellow;
}









