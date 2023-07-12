// import YatzySheet from "./yatzysheet.js";
var Player = /** @class */ (function () {
    // public yatzySheet: YatzySheet;
    function Player(name, img, timeLeft, isTurn) {
        if (timeLeft === void 0) { timeLeft = 0; }
        this.rolls = 3;
        this.isFirstRoll = true;
        this.isTurn = false;
        this.diceCollection = [];
        this.allTurnsTaken = false;
        this.sheetScores = [];
        this.name = name;
        this.img = img;
        this.timeLeft = timeLeft;
        this.isTurn = isTurn;
        // this.yatzySheet = yatzySheet;
        for (var i = 0; i < 18; i++) {
            this.sheetScores[i] = 0;
        }
    }
    return Player;
}());
export default Player;
