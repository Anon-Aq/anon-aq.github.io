
export default class Player {
    public name: string;
    public img: string;
    public timeLeft: number;
    public isTurn: boolean = false;
    public sheetScores: number [] = [];
    // public yatzySheet: YatzySheet;

    constructor(name: string, img: string, timeLeft:number = 0, isTurn: boolean) {
        this.name = name;
        this.img = img;
        this.timeLeft = timeLeft;
        this.isTurn = isTurn;
        // this.yatzySheet = yatzySheet;
    }

}