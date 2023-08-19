export default class Die {
    constructor(number, isHeld) {
        this.number = 0;
        this.isHeld = false;
        this.image = '';
        this.color = '#fff';
        this.number = number;
        this.isHeld = isHeld;
        this.dieEl = document.createElement('div');
        this.initialize();
        this.createDiceEl(number);
    }
    initialize() {
        this.dieEl.addEventListener('click', () => {
            // this.isHeld = true;
            this.isHeld = !this.isHeld;
            if (this.isHeld) {
                this.dieEl.style.backgroundColor = '#000';
                this.dieEl.style.color = '#fff';
            }
            console.log(this.isHeld);
            if (!this.isHeld) {
                this.dieEl.style.backgroundColor = '#fff';
                this.dieEl.style.color = '#000';
            }
        });
    }
    createDiceEl(dieNumber) {
        this.dieEl.setAttribute('style', `background-color: ${this.color}; width: 50px; height: 50px;`);
        this.dieEl.classList.add('die');
        this.dieEl.innerHTML = this.number.toString();
        document.querySelector('[dice-container]')?.appendChild(this.dieEl);
        // console.log('Dice Number = ' + this.number);
    }
    removeDie() {
        document.querySelector('[dice-container]')?.removeChild(this.dieEl);
    }
}
