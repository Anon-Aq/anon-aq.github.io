import Manager from "./manager.js";
import Player from "./player.js";
import RollButton from "./roll.js";
import YatzySheet from "./yatzysheet.js";

class YatzyTable {  // sets game up
    public player: Player;
    public opponent: Player;
    public rollBtn: RollButton;
    public yatzySheet: YatzySheet;
    public manager: Manager;
    public roundTime: number = 0;
   
    constructor(player: Player, opponent: Player, roundTime: number) {
        this.player= player;
        this.player.timeLeft = roundTime;
        this.opponent = opponent;
        this.opponent.timeLeft = roundTime;
        this.roundTime = roundTime;
        this.yatzySheet = new YatzySheet(this.player, this.opponent);
        this.rollBtn = new RollButton(this.player, this.yatzySheet);
        this.manager = new Manager(this.player, this.opponent, this.yatzySheet, this.roundTime);

    }
}

const yatzyTable = new YatzyTable(new Player('Aqib', 'img', 10, true), new Player('Friend', 'img', 10, true), 10);



