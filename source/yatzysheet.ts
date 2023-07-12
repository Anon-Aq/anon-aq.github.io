import Player from "./player.js";


export default class YatzySheet {
    public player: Player;
    public playerName: string;
    public playerImg: string;
    public possibleCells: NodeList;
    public sheetValues: [number, boolean][] = [];   //possibleScore, RegisteredBool
    //put scored score in player scoredScore

    public opponent: Player;
    public opponentName: string;
    public opponentImg: string;
    public opponentpossibleCells: NodeList;

   
    //real sheet constructor
    constructor(player: Player, opponent: Player) { // need to use the opponent Object too, img, name, points, etc
        this.player = player;
        this.playerName = player.name;
        this.playerImg = player.img;
        this.possibleCells = document.querySelectorAll('[player-one]');

        this.opponent = opponent;
        this.opponentName = this.opponent.name;
        this.opponentImg = this.opponent.img;
        this.opponentpossibleCells = document.querySelectorAll('[player-two]');
         

        this.initalizeSheet();
    }

    // constructor() { // fake constructor only for testing
    //     this.possibleCells = document.querySelectorAll('.player-one');
    //     this.initalizeSheet();
    // }

    initalizeSheet() {
        for (let i = 0; i < this.possibleCells.length; i++) {
            this.sheetValues.push([0, false]);  
            if (i === 6 || i === 7 || i === 17)  continue;
            this.possibleCells[i].addEventListener('click', () => { this.registerClick(this.possibleCells[i] as HTMLTableCellElement, i);});
            this.possibleCells[i].addEventListener('mouseover', () => { this.hoverScore(this.possibleCells[i] as HTMLTableCellElement, i);});
            this.possibleCells[i].addEventListener('mouseout', () => {this.hoverOut(this.possibleCells[i] as HTMLTableCellElement, i);});
        }


    }

    registerClick(cell: HTMLTableCellElement, index: number) {
        if (this.sheetValues[index][1]) return;
        cell.classList.remove('active');
        this.sheetValues[index][1] = true;
        // this.sheetValues[index][1] = this.sheetValues[index][0];    // should reg score
        this.player.sheetScores[index] = this.sheetValues[index][0]; // should reg score
        
        this.possibleCells[6].classList.remove('active');
        this.possibleCells[17].classList.remove('active');
        this.possibleCells[index].setAttribute('style', 'cursor: not-allowed;');
        this.possibleCells[index].style.animation = 'clicked-animation .8s cubic-bezier(.61,.18,.76,.86)';

        this.totalCount(index);
        if (index < 6) {
            this.player.sheetScores[6] += this.sheetValues[index][0];
        }
        if (this.player.sheetScores[6] >= 63 && !this.sheetValues[7][1]) {
         this.regBonus();
        }
       // 6-7 and 17
        this.allTurnsTaken();   
    }
    allTurnsTaken() {
        let topSixReg = [];
        let allValuesReg: boolean = false;
        let allVals = [];

        for (let i = 0; i < 6; i++) {
            topSixReg.push(this.sheetValues[i][1]);
        }

        if (topSixReg.every((val) => val === true)) {
            this.sheetValues[6][1] = true;
            this.sheetValues[7][1] = true;
        }
        for (let i = 0; i < this.sheetValues.length; i++) {
             
            console.log(`Turns Taken ${i} ${this.sheetValues[i][1]}`);
            allVals.push(this.sheetValues[i][1]);
 
           allValuesReg = allVals.every((val, index) => {
            if (index === 17) {
                this.sheetValues[17][1] = true;
                return true; 
            }
            return val === true;
          });               
            
        }
        if (allValuesReg) {
            this.player.allTurnsTaken = true;
            alert('a');
            }
        console.log('Sheet Values 2', this.sheetValues);

    }
    hoverScore(cell: HTMLTableCellElement, index: number) {
        if (this.sheetValues[index][1]) return;
         cell.innerText = this.sheetValues[index][0].toString();
         cell.classList.add('active');
         cell.setAttribute('style', 'cursor: pointer;')
         this.showTotalTop(index);
         this.showBonus(index);
         this.showTotalCount(index);
         
    }
    hoverOut(cell: HTMLTableCellElement, index: number) {
        if (!this.sheetValues[index][1]) {
            this.possibleCells[6].textContent = this.player.sheetScores[6].toString();
            this.possibleCells[6].classList.remove('active');
        }
        if (!this.sheetValues[7][1]) {
            this.sheetValues[7][0] = 0;
            this.possibleCells[7].textContent = this.sheetValues[7][0];
            this.possibleCells[7].classList.remove('active');
        }
        if (!this.sheetValues[index][1]) {
            this.possibleCells[17].textContent = this.player.sheetScores[17].toString();
        }
        
        this.possibleCells[17].classList.remove('active');


        cell.classList.remove('active');
        if (this.sheetValues[index][1]) return;
            this.possibleCells[index].textContent = '';
    }

    showTotalTop(index: number) {
        if (!this.sheetValues[index][1] && index < 6) {
            const possibleTotalTop =  this.sheetValues[index][0] + this.player.sheetScores[6];
            this.possibleCells[6].textContent = possibleTotalTop.toString();
            this.possibleCells[6].classList.add('active');
        }
        
    }
   
    showBonus(index: number) {
        if (index < 6 && !this.sheetValues[7][1]) {
            if (this.player.sheetScores[6] + this.sheetValues[index][0] >= 63) {
            this.sheetValues[7][0] = 50;
            this.possibleCells[7].textContent = this.sheetValues[7][0];
            this.possibleCells[7].classList.add('active');
            }
        }
    }
    
    regBonus() {
         this.player.sheetScores[7] = 50;
         this.player.sheetScores[17] += this.player.sheetScores[7];
         this.sheetValues[7][1] = true;
         this.possibleCells[7].textContent = this.player.sheetScores[7].toString();
         this.possibleCells[7].classList.remove('active');
         this.possibleCells[17].textContent = this.player.sheetScores[7].toString();
    }
   

    showTotalCount(index: number) {
        if (this.sheetValues[7][1]) {
            this.sheetValues[7][0] = 0;
        }
        this.sheetValues[17][0] = this.sheetValues[index][0] + this.player.sheetScores[17] + this.sheetValues[7][0];
        this.possibleCells[17].textContent = this.sheetValues[17][0].toString();
        this.possibleCells[17].classList.add('active');
    }
    totalCount(index: number) {
        
        this.player.sheetScores[17] += this.player.sheetScores[index];
        this.possibleCells[17].textContent = this.player.sheetScores[17].toString();
    }
    

}

// const yatzySheet = new YatzySheet();
// const yatzySheet = new YatzySheet(new Player('a', 5, false), 'a', 'a');
