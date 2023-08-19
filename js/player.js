export default class Player {
    // public yatzySheet: YatzySheet;
    constructor(name, img, timeLeft = 0, isTurn) {
        this.isFirstRoll = true;
        this.isTurn = false;
        this.sheetScores = [];
        this.name = name;
        this.img = img;
        this.timeLeft = timeLeft;
        this.isTurn = isTurn;
        // this.yatzySheet = yatzySheet;
    }
}
