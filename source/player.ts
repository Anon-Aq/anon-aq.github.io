import Die from "./die.js";
// import YatzySheet from "./yatzysheet.js";

export default class Player {
    public name: string;
    public img: string;
    public rolls: number = 3;
    public timeLeft: number;
    public isFirstRoll: boolean = true;
    public isTurn: boolean = false;
    public diceCollection: Die[] = [];
    public allTurnsTaken = false;
    public sheetScores: number [] = [];
    // public yatzySheet: YatzySheet;

    constructor(name: string, img: string, timeLeft:number = 0, isTurn: boolean) {
        this.name = name;
        this.img = img;
        this.timeLeft = timeLeft;
        this.isTurn = isTurn;
        // this.yatzySheet = yatzySheet;

        for (let i = 0; i < 18; i++) {
            this.sheetScores[i] = 0;
        }
    }

}