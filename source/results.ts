
// export default class Results {

//     checkCombination(row: number, col: number, pieceColor: string, possCombo: string) {
//         let count = 0;
//         let innerwinningCombination: number[][] = [];
        
//         // let nextRow = row;
//         // let nextCol = col;
    
//         for (let i = 0; i < 4; i++) {
            
//             // if (nextRow < 0 || nextRow > 5 || nextCol < 0 || nextCol > 6) break; // double check this
    
           
//             if (possCombo == possibleCombinations.down) { // v
//                 if (row + i < 0 || row + i > 5 || col < 0 || col > 6) break; // double check this
               
//                 if (cellArr[row + i][col] == pieceColor) { // checks down // should work for up too
//                     count += 1; 
//                     innerwinningCombination.push([row + i, col]);
//                     // console.log(count);
//                 }
//             }
//             if (possCombo == possibleCombinations.right) {  // h
//                 if (row  < 0 || row  > 5 || col + i  < 0 || col + i > 6) break; // double check this
               
//                 if (cellArr[row][col + i] == pieceColor) { // checks right // 
//                     count += 1; 
//                     // console.log('FROM TOP:', col + i);
//                     innerwinningCombination.push([row, col + i]);
    
//                     // console.log(count);
//                 }
//             }
//             if (possCombo == possibleCombinations.upRight) {
//                 if (row - i < 0 || row - i > 5 || col + i < 0 || col + i > 6) break; // double check this
               
//                 if (cellArr[row - i][col + i] == pieceColor) { // checks down // should work for up too
//                     count += 1; 
//                     innerwinningCombination.push([row - i, col + i]);
    
//                     // console.log(count);
//                 }
//             }
//             if (possCombo == possibleCombinations.downRight) {
//                 if (row - i < 0 || row - i > 5 || col - i < 0 || col - i > 6) break; // double check this
               
//                 if (cellArr[row - i][col - i] == pieceColor) { // checks down // should work for up too
//                     count += 1; 
//                     innerwinningCombination.push([row - i, col - i]);
    
//                     // console.log(count);
//                 }
//             }
//             if (count >= 4) {
//                 winningCombination = innerwinningCombination;
//                 highlightWinPiece(winningCombination, pieceColor);
//                 console.log('You Win! 4 in a row');
//                 isGameOver = true;
//                 dropCells.forEach((dCell) => {
//                     dCell.classList.remove('red', 'yellow');
//                 });
    
    
//             } 
    
//         }
    
        
//     }
//     noEmptyCellsLeft(): boolean { // use this function to check if game is a draw
             
//             // Turns 2d arr into 1D Arr
//         //    const everyCell: [] =  [].concat(...allCells);
    
//            let playableCells: string[] = [];
//            for (let i = 0; i < cellArr.length; i++) {
//                 for (let j = 0; j < cellArr[i].length; j++) {
//                     playableCells.push(cellArr[i][j]);
                        
//                 }
               
    
//            }
//            const isEmptyCells = !playableCells.includes('empty');
    
//            return isEmptyCells;
           
        
//     }
    
// }



