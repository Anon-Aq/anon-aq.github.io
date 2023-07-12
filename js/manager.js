var Manager = /** @class */ (function () {
    function Manager(player, opponent, yatzySheet, roundTime) {
        // private gameStateMsg = document.querySelector('[game-state-msg]');
        // private gameStateMsg = document.querySelector('[game-state-msg]');
        this.STATE = Object.freeze({ win: 'You Win!', lose: 'You Lose!', draw: 'Draw!' });
        this.roundTime = 0;
        this.player = player;
        this.opponent = opponent;
        this.yatzySheet = yatzySheet;
        this.roundTime = roundTime;
        //   this.gameStateMsg!.textContent = this.STATE.win;
    }
    Manager.prototype.startRound = function () {
        for (var i = 0; i < this.player.sheetScores.length; i++) { // reset everything back to zero
            this.player.timeLeft = this.roundTime;
            this.player.sheetScores[i] = 0;
            this.opponent.sheetScores[i] = 0;
            this.yatzySheet.sheetValues[i][0] = 0;
            this.yatzySheet.sheetValues[i][1] = false;
            if (i === 6 || i === 7 || i === 17) {
                this.yatzySheet.possibleCells[i].textContent = (0).toString();
                this.yatzySheet.possibleCellsOpponent[i].textContent = (0).toString();
            }
            this.yatzySheet.possibleCells[i].textContent = '';
        }
    };
    Manager.prototype.endRound = function () {
    };
    Manager.prototype.displayWinner = function () {
        if (this.player.allTurnsTaken && this.opponent.allTurnsTaken) {
            var playerSum = 0;
            var opponentSum = 0;
            for (var i = 0; i < this.player.sheetScores[i]; i++) {
                playerSum += this.player.sheetScores[i];
                opponentSum += this.opponent.sheetScores[i];
            }
            if (playerSum > opponentSum) {
                console.log('Player One Wins!');
            }
            else if (opponentSum > playerSum) {
                console.log('Opponent Wins!');
            }
            else if (playerSum === opponentSum) {
                console.log('Draw!');
            }
        }
        // if all registered...
        //display none to dice or something like that
        // if (this.player.)
    };
    // Register AutoClick
    //Switch Turns
    Manager.prototype.switchTurn = function () {
        this.player.isTurn = !this.opponent.isTurn;
    };
    return Manager;
}());
export default Manager;
