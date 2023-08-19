import Player from "./player.js";

export default class Manager {
   // private gameStateMsg = document.querySelector('[game-state-msg]');
   // private gameStateMsg = document.querySelector('[game-state-msg]');
   public STATE = Object.freeze({win: 'You Win!', lose: 'You Lose!', draw: 'Draw!'});
   public player: Player;
   public opponent: Player;
   public roundTime: number = 0;

   constructor(player: Player, opponent: Player, roundTime: number) {
     this.player = player;
     this.opponent = opponent;
     this.roundTime = roundTime;
   //   this.gameStateMsg!.textContent = this.STATE.win;
   }

   startRound() {
      for (let i = 0; i < this.player.sheetScores.length; i++) {  // reset everything back to zero
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

   //On this player Turn, Lower player timer

   //reg total and bonus as true if all six top scores are registered



   




  
}
