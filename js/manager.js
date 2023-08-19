export default class Manager {
    constructor(player, opponent, roundTime) {
        // private gameStateMsg = document.querySelector('[game-state-msg]');
        // private gameStateMsg = document.querySelector('[game-state-msg]');
        this.STATE = Object.freeze({ win: 'You Win!', lose: 'You Lose!', draw: 'Draw!' });
        this.roundTime = 0;
        this.player = player;
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
    // Register AutoClick
    //Switch Turns
    switchTurn() {
        this.player.isTurn = !this.opponent.isTurn;
    }
}
