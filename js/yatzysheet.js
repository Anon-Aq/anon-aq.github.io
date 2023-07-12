var YatzySheet = /** @class */ (function () {
    //real sheet constructor
    function YatzySheet(player, opponent) {
        this.sheetValues = []; //possibleScore, RegisteredBool
        this.player = player;
        this.playerName = player.name;
        this.playerImg = player.img;
        this.possibleCells = document.querySelectorAll('[player-one]');
        this.opponent = opponent;
        this.opponentName = this.opponent.name;
        this.opponentImg = this.opponent.img;
        this.opponentpossibleCells = document.querySelectorAll('[player-two]');
        this.initalizeSheet();
    }
    // constructor() { // fake constructor only for testing
    //     this.possibleCells = document.querySelectorAll('.player-one');
    //     this.initalizeSheet();
    // }
    YatzySheet.prototype.initalizeSheet = function () {
        var _this = this;
        var _loop_1 = function (i) {
            this_1.sheetValues.push([0, false]);
            if (i === 6 || i === 7 || i === 17)
                return "continue";
            this_1.possibleCells[i].addEventListener('click', function () { _this.registerClick(_this.possibleCells[i], i); });
            this_1.possibleCells[i].addEventListener('mouseover', function () { _this.hoverScore(_this.possibleCells[i], i); });
            this_1.possibleCells[i].addEventListener('mouseout', function () { _this.hoverOut(_this.possibleCells[i], i); });
        };
        var this_1 = this;
        for (var i = 0; i < this.possibleCells.length; i++) {
            _loop_1(i);
        }
    };
    YatzySheet.prototype.registerClick = function (cell, index) {
        if (this.sheetValues[index][1])
            return;
        cell.classList.remove('active');
        this.sheetValues[index][1] = true;
        // this.sheetValues[index][1] = this.sheetValues[index][0];    // should reg score
        this.player.sheetScores[index] = this.sheetValues[index][0]; // should reg score
        this.possibleCells[6].classList.remove('active');
        this.possibleCells[17].classList.remove('active');
        this.possibleCells[index].setAttribute('style', 'cursor: not-allowed;');
        this.possibleCells[index].style.animation = 'clicked-animation .8s cubic-bezier(.61,.18,.76,.86)';
        this.totalCount(index);
        if (index < 6) {
            this.player.sheetScores[6] += this.sheetValues[index][0];
        }
        if (this.player.sheetScores[6] >= 63 && !this.sheetValues[7][1]) {
            this.regBonus();
        }
        // 6-7 and 17
        this.allTurnsTaken();
    };
    YatzySheet.prototype.allTurnsTaken = function () {
        var _this = this;
        var topSixReg = [];
        var allValuesReg = false;
        var allVals = [];
        for (var i = 0; i < 6; i++) {
            topSixReg.push(this.sheetValues[i][1]);
        }
        if (topSixReg.every(function (val) { return val === true; })) {
            this.sheetValues[6][1] = true;
            this.sheetValues[7][1] = true;
        }
        for (var i = 0; i < this.sheetValues.length; i++) {
            console.log("Turns Taken ".concat(i, " ").concat(this.sheetValues[i][1]));
            allVals.push(this.sheetValues[i][1]);
            allValuesReg = allVals.every(function (val, index) {
                if (index === 17) {
                    _this.sheetValues[17][1] = true;
                    return true;
                }
                return val === true;
            });
        }
        if (allValuesReg) {
            this.player.allTurnsTaken = true;
            alert('a');
        }
        console.log('Sheet Values 2', this.sheetValues);
    };
    YatzySheet.prototype.hoverScore = function (cell, index) {
        if (this.sheetValues[index][1])
            return;
        cell.innerText = this.sheetValues[index][0].toString();
        cell.classList.add('active');
        cell.setAttribute('style', 'cursor: pointer;');
        this.showTotalTop(index);
        this.showBonus(index);
        this.showTotalCount(index);
    };
    YatzySheet.prototype.hoverOut = function (cell, index) {
        if (!this.sheetValues[index][1]) {
            this.possibleCells[6].textContent = this.player.sheetScores[6].toString();
            this.possibleCells[6].classList.remove('active');
        }
        if (!this.sheetValues[7][1]) {
            this.sheetValues[7][0] = 0;
            this.possibleCells[7].textContent = this.sheetValues[7][0];
            this.possibleCells[7].classList.remove('active');
        }
        if (!this.sheetValues[index][1]) {
            this.possibleCells[17].textContent = this.player.sheetScores[17].toString();
        }
        this.possibleCells[17].classList.remove('active');
        cell.classList.remove('active');
        if (this.sheetValues[index][1])
            return;
        this.possibleCells[index].textContent = '';
    };
    YatzySheet.prototype.showTotalTop = function (index) {
        if (!this.sheetValues[index][1] && index < 6) {
            var possibleTotalTop = this.sheetValues[index][0] + this.player.sheetScores[6];
            this.possibleCells[6].textContent = possibleTotalTop.toString();
            this.possibleCells[6].classList.add('active');
        }
    };
    YatzySheet.prototype.showBonus = function (index) {
        if (index < 6 && !this.sheetValues[7][1]) {
            if (this.player.sheetScores[6] + this.sheetValues[index][0] >= 63) {
                this.sheetValues[7][0] = 50;
                this.possibleCells[7].textContent = this.sheetValues[7][0];
                this.possibleCells[7].classList.add('active');
            }
        }
    };
    YatzySheet.prototype.regBonus = function () {
        this.player.sheetScores[7] = 50;
        this.player.sheetScores[17] += this.player.sheetScores[7];
        this.sheetValues[7][1] = true;
        this.possibleCells[7].textContent = this.player.sheetScores[7].toString();
        this.possibleCells[7].classList.remove('active');
        this.possibleCells[17].textContent = this.player.sheetScores[7].toString();
    };
    YatzySheet.prototype.showTotalCount = function (index) {
        if (this.sheetValues[7][1]) {
            this.sheetValues[7][0] = 0;
        }
        this.sheetValues[17][0] = this.sheetValues[index][0] + this.player.sheetScores[17] + this.sheetValues[7][0];
        this.possibleCells[17].textContent = this.sheetValues[17][0].toString();
        this.possibleCells[17].classList.add('active');
    };
    YatzySheet.prototype.totalCount = function (index) {
        this.player.sheetScores[17] += this.player.sheetScores[index];
        this.possibleCells[17].textContent = this.player.sheetScores[17].toString();
    };
    return YatzySheet;
}());
export default YatzySheet;
// const yatzySheet = new YatzySheet();
// const yatzySheet = new YatzySheet(new Player('a', 5, false), 'a', 'a');
