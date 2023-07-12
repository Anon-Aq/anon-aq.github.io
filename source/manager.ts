import Player from "./player.js";
import YatzySheet from "./yatzysheet.js";

export default class Manager {
   // private gameStateMsg = document.querySelector('[game-state-msg]');
   // private gameStateMsg = document.querySelector('[game-state-msg]');
   public STATE = Object.freeze({win: 'You Win!', lose: 'You Lose!', draw: 'Draw!'});
   public player: Player;
   public opponent: Player;
   public yatzySheet: YatzySheet;
   public roundTime: number = 0;

   constructor(player: Player, opponent: Player, yatzySheet: YatzySheet, roundTime: number) {
     this.player = player;
     this.opponent = opponent;
     this.yatzySheet = yatzySheet;
     this.roundTime = roundTime;
   //   this.gameStateMsg!.textContent = this.STATE.win;
   }

   startRound() {
      for (let i = 0; i < this.player.sheetScores.length; i++) {  // reset everything back to zero
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
   }

   endRound() {
      
   }
   
   displayWinner() {
     
      if (this.player.allTurnsTaken && this.opponent.allTurnsTaken) {
         let playerSum: number = 0;
         let opponentSum: number = 0;

         for (let i = 0; i < this.player.sheetScores[i]; i++) {
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
   }

   // Register AutoClick

   //Switch Turns
   switchTurn() {
      this.player.isTurn = !this.opponent.isTurn;
   }

   //On this player Turn, Lower player timer

   //reg total and bonus as true if all six top scores are registered



   




  
}
