var Die = /** @class */ (function () {
    function Die(number, isHeld) {
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
    Die.prototype.initialize = function () {
        var _this = this;
        this.dieEl.addEventListener('click', function () {
            // this.isHeld = true;
            _this.isHeld = !_this.isHeld;
            if (_this.isHeld) {
                _this.dieEl.style.backgroundColor = '#000';
                _this.dieEl.style.color = '#fff';
            }
            console.log(_this.isHeld);
            if (!_this.isHeld) {
                _this.dieEl.style.backgroundColor = '#fff';
                _this.dieEl.style.color = '#000';
            }
        });
    };
    Die.prototype.createDiceEl = function (dieNumber) {
        var _a;
        this.dieEl.setAttribute('style', "background-color: ".concat(this.color, "; width: 50px; height: 50px;"));
        this.dieEl.classList.add('die');
        this.dieEl.innerHTML = this.number.toString();
        (_a = document.querySelector('[dice-container]')) === null || _a === void 0 ? void 0 : _a.appendChild(this.dieEl);
        // console.log('Dice Number = ' + this.number);
    };
    Die.prototype.removeDie = function () {
        var _a;
        (_a = document.querySelector('[dice-container]')) === null || _a === void 0 ? void 0 : _a.removeChild(this.dieEl);
    };
    return Die;
}());
export default Die;
