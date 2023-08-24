import { PieceColor } from "./pieceColor.js";
import Player from "./player.js";

export default class Manager {
   // private gameStateMsg = document.querySelector('[game-state-msg]');
   // private gameStateMsg = document.querySelector('[game-state-msg]')
   public State = {Win: 'You Win!', Lose: 'You Lose!', Draw: 'Draw!'} as const;
   // public Turn = {You: 'Your Turn', Opponent: 'Opponents Turn!'} as const;
   public currentTurnColor: string;
   public player: Player;
   public opponent: Player;
   public roundTime: number = 0;
   public isGameOver: boolean = false;
   winLoseMsg = document.querySelector('[win-lose-draw-msg]');


   constructor(player: Player, opponent: Player, roundTime: number) {
     this.player = player;
     this.currentTurnColor = PieceColor.Yellow;
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


   //Switch Turns
   switchTurn() {
      switch (this.currentTurnColor) {
          case PieceColor.Yellow:
              this.currentTurnColor = PieceColor.Red;
              this.winLoseMsg!.textContent = `Current Turn: ${this.currentTurnColor}`;
              break;
          case PieceColor.Red:
              this.currentTurnColor = PieceColor.Yellow;
              this.winLoseMsg!.textContent = `Current Turn: ${this.currentTurnColor}`;
              break;
          default:
              break;
      }
    
  }
   

   resetGame(allCells: any [], cellArr: any[]) {
      this.isGameOver = false;
      this.winLoseMsg!.textContent = '';
  
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
