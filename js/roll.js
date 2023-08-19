import Die from "./die.js";
import Random from "./random.js";
import Results from "./results.js";
export default class RollButton {
    constructor(player, yatzySheet) {
        this.btn = document.querySelector('[roll-btn]');
        this.player = player;
        this.initialize();
        this.results = new Results(yatzySheet);
    }
    initialize() {
        this.btn?.addEventListener('click', () => { this.rollDice(); });
    }
    rollDice() {
        if (this.player.isFirstRoll) {
            for (let i = 0; i < 5; i++) {
                const die = new Die(Random.random(6), false);
                this.player.isFirstRoll = false;
                this.player.diceCollection.push(die);
                // this.player.diceCollection.keptDice.push(die);
            }
        }
        for (let i = 0; i < this.player.diceCollection.length; i++) {
            if (this.player.diceCollection[i].isHeld)
                continue;
            this.player.diceCollection[i].number = Random.random(6);
            this.player.diceCollection[i].dieEl.textContent =
                this.player.diceCollection[i].number.toString();
            // this.player.diceCollection[i].removeDie();
        }
        // console.log('D Coll' + this.player.diceCollection);
        this.results.currentSixDiceCount(this.player.diceCollection);
    }
}
// const roll = new RollButton(new Player('Aqib', 'img', 10, true));
