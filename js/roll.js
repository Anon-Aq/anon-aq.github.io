import Die from "./die.js";
import Random from "./random.js";
import Results from "./results.js";
var RollButton = /** @class */ (function () {
    function RollButton(player, yatzySheet) {
        this.btn = document.querySelector('[roll-btn]');
        this.player = player;
        this.initialize();
        this.results = new Results(yatzySheet);
    }
    RollButton.prototype.initialize = function () {
        var _this = this;
        var _a;
        (_a = this.btn) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { _this.rollDice(); });
    };
    RollButton.prototype.rollDice = function () {
        if (this.player.isFirstRoll) {
            for (var i = 0; i < 5; i++) {
                var die = new Die(Random.random(6), false);
                this.player.isFirstRoll = false;
                this.player.diceCollection.push(die);
                // this.player.diceCollection.keptDice.push(die);
            }
        }
        for (var i = 0; i < this.player.diceCollection.length; i++) {
            if (this.player.diceCollection[i].isHeld)
                continue;
            this.player.diceCollection[i].number = Random.random(6);
            this.player.diceCollection[i].dieEl.textContent =
                this.player.diceCollection[i].number.toString();
            // this.player.diceCollection[i].removeDie();
        }
        // console.log('D Coll' + this.player.diceCollection);
        this.results.currentSixDiceCount(this.player.diceCollection);
    };
    return RollButton;
}());
export default RollButton;
// const roll = new RollButton(new Player('Aqib', 'img', 10, true));
