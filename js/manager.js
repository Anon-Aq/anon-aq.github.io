import { PieceColor } from "./pieceColor.js";
export default class Manager {
    constructor(player, opponent, roundTime) {
        // private gameStateMsg = document.querySelector('[game-state-msg]');
        // private gameStateMsg = document.querySelector('[game-state-msg]')
        this.State = { Win: 'You Win!', Lose: 'You Lose!', Draw: 'Draw!' };
        this.roundTime = 0;
        this.isGameOver = false;
        this.winLoseMsg = document.querySelector('[win-lose-draw-msg]');
        this.player = player;
        this.currentTurnColor = PieceColor.Yellow;
        this.opponent = opponent;
        this.roundTime = roundTime;
        //   this.gameStateMsg!.textContent = this.STATE.win;
    }
    startRound() {
        for (let i = 0; i < this.player.sheetScores.length; i++) { // reset everything back to zero
            this.player.timeLeft = this.roundTime;
        }
    }
    endRound() {
    }
    displayWinner() {
    }
    //Switch Turns
    switchTurn() {
        switch (this.currentTurnColor) {
            case PieceColor.Yellow:
                this.currentTurnColor = PieceColor.Red;
                this.winLoseMsg.textContent = `Current Turn: ${this.currentTurnColor}`;
                break;
            case PieceColor.Red:
                this.currentTurnColor = PieceColor.Yellow;
                this.winLoseMsg.textContent = `Current Turn: ${this.currentTurnColor}`;
                break;
            default:
                break;
        }
    }
    resetGame(allCells, cellArr) {
        this.isGameOver = false;
        this.winLoseMsg.textContent = '';
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
    }
}
