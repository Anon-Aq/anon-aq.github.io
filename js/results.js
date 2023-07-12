var Results = /** @class */ (function () {
    function Results(yatzysheet) {
        this.yatzySheet = yatzysheet;
        // this.currentSixDiceCount(player.diceCollection);
    }
    Results.prototype.currentSixDiceCount = function (playerDiceCollection) {
        var diceIncrementedCount = [0, 0, 0, 0, 0, 0];
        for (var i = 0; i < playerDiceCollection.length; i++) {
            switch (playerDiceCollection[i].number) {
                case 1:
                    diceIncrementedCount[0]++;
                    break;
                case 2:
                    diceIncrementedCount[1]++;
                    break;
                case 3:
                    diceIncrementedCount[2]++;
                    break;
                case 4:
                    diceIncrementedCount[3]++;
                    break;
                case 5:
                    diceIncrementedCount[4]++;
                    break;
                case 6:
                    diceIncrementedCount[5]++;
                    break;
            }
            //  console.log(diceIncrementedCount);
        }
        this.getResults(diceIncrementedCount, playerDiceCollection);
    };
    Results.prototype.getResults = function (diceIncrementedCount, playerDiceCollection) {
        var topSixNumbers = [0, 0, 0, 0, 0, 0];
        var possibleSheetValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 0 - 17
        var chance = 0;
        for (var i = 0; i < diceIncrementedCount.length; i++) {
            if (diceIncrementedCount[i] >= 2) {
                var firstPairVal = (i + 1) * 2;
                possibleSheetValues[8] = firstPairVal;
                for (var j = i + 1; j < diceIncrementedCount.length; j++) {
                    if (diceIncrementedCount[j] >= 2) {
                        var secondPairVal = (j + 1) * 2;
                        possibleSheetValues[9] = firstPairVal + secondPairVal;
                        console.log('Two Pairs');
                        if (firstPairVal > 0) {
                            var firstorSecondVal = firstPairVal > secondPairVal ? firstPairVal : secondPairVal;
                            possibleSheetValues[8] = firstorSecondVal;
                        }
                    }
                }
                if (diceIncrementedCount[i] >= 3) {
                    console.log('Three Of A Kind');
                    var threeVal = i + 1;
                    var index = i;
                    possibleSheetValues[10] = threeVal * 3;
                    for (var j = 0; j < diceIncrementedCount.length; j++) {
                        if (j === index)
                            continue;
                        if (diceIncrementedCount[j] === 2) {
                            console.log('Full House');
                            possibleSheetValues[14] = 28;
                        }
                    }
                }
                if (diceIncrementedCount[i] >= 4) {
                    console.log('Four Of A Kind');
                    var fourVal = i + 1;
                    possibleSheetValues[11] = fourVal * 4;
                }
                if (diceIncrementedCount[i] >= 5) {
                    console.log('Five Of A Kind');
                    possibleSheetValues[16] = 50;
                }
            }
            if (i < 5) {
                chance += playerDiceCollection[i].number;
            }
        }
        possibleSheetValues[15] = chance;
        var smallStraight = diceIncrementedCount.every(function (num, index) {
            if (index === 5)
                return true;
            return num === 1;
        });
        var largeStraight = diceIncrementedCount.every(function (num, index) {
            if (index === 0)
                return true;
            return num === 1;
        });
        if (smallStraight) {
            possibleSheetValues[12] = 15;
        }
        if (largeStraight) {
            possibleSheetValues[13] = 20;
        }
        for (var i = 0; i < topSixNumbers.length; i++) { // Top Six results
            topSixNumbers[i] = diceIncrementedCount[i] * (i + 1);
            possibleSheetValues[i] = topSixNumbers[i];
        }
        this.putResultsInYatzySheet(possibleSheetValues);
    };
    Results.prototype.putResultsInYatzySheet = function (possibleSheetValues) {
        for (var i = 0; i < possibleSheetValues.length; i++) {
            this.yatzySheet.sheetValues[i][0] = possibleSheetValues[i];
            // console.log(possibleSheetValues[i]);
        }
    };
    Results.prototype.totalTop = function () {
    };
    Results.prototype.totalBottom = function () {
    };
    return Results;
}());
export default Results;
// const num = Logic.getResults([new Die(5, false), new Die(5, false), new Die(5, false), new Die(5, false)]);
// console.log(`THE NUMBER IS: ${num}`);
