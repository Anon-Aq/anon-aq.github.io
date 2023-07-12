import Die from "./die.js";
import YatzySheet from "./yatzysheet.js";

export default class Results {
    public yatzySheet: YatzySheet;

    constructor(yatzysheet: YatzySheet) {
        this.yatzySheet = yatzysheet;
        // this.currentSixDiceCount(player.diceCollection);
    }
    public currentSixDiceCount(playerDiceCollection: Die[])
    {
        
        const diceIncrementedCount = [0, 0, 0, 0, 0, 0];

        for (let i = 0; i < playerDiceCollection.length; i++) {
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
    }

    getResults(diceIncrementedCount: number[], playerDiceCollection: Die[]) {
        const topSixNumbers = [0, 0, 0, 0, 0, 0];
        const possibleSheetValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 0 - 17

        let chance = 0;
        for (let i = 0; i < diceIncrementedCount.length; i++) {
            if (diceIncrementedCount[i] >= 2) {
                const firstPairVal = (i + 1) * 2;
                possibleSheetValues[8] = firstPairVal;
                for (let j = i + 1; j < diceIncrementedCount.length; j++)  {
                    if (diceIncrementedCount[j] >= 2) {
                        const secondPairVal = (j + 1) * 2;
                        possibleSheetValues[9] = firstPairVal + secondPairVal;
                        console.log('Two Pairs');
                        if (firstPairVal > 0) {
                            const firstorSecondVal = firstPairVal > secondPairVal? firstPairVal : secondPairVal;
                            possibleSheetValues[8] = firstorSecondVal;
                        }
                    }
                }
            if (diceIncrementedCount[i] >= 3) {
                console.log('Three Of A Kind');
                const threeVal = i + 1;
                const index = i;
                possibleSheetValues[10] = threeVal * 3;
                for (let j = 0; j < diceIncrementedCount.length; j++) {
                    if (j === index) continue;
                    if (diceIncrementedCount[j] === 2) {
                        console.log('Full House');
                        possibleSheetValues[14] = 28;
                        
                    }
                }
            }
            if (diceIncrementedCount[i] >= 4) {
                console.log('Four Of A Kind');
                const fourVal = i + 1;
                possibleSheetValues[11] = fourVal * 4;
            }
            if (diceIncrementedCount[i] >= 5) {
                console.log('Five Of A Kind');
                possibleSheetValues[16] = 50;
            }

            }
            if(i < 5) {
            chance += playerDiceCollection[i].number;           
            }
        }
        possibleSheetValues[15] = chance;

        const smallStraight = diceIncrementedCount.every((num, index) => {
            if (index === 5) return true;       
            return num === 1;
        });
        const largeStraight = diceIncrementedCount.every((num, index) => {
            if (index === 0) return true;
            return num === 1;
        });

        if (smallStraight) {
            possibleSheetValues[12] = 15;
        }
        if (largeStraight) {
            possibleSheetValues[13] = 20;

        }

        for (let i = 0; i < topSixNumbers.length; i++) {    // Top Six results
            topSixNumbers[i] = diceIncrementedCount[i] * (i + 1);  
            possibleSheetValues[i] = topSixNumbers[i];
        }

        this.putResultsInYatzySheet(possibleSheetValues);
       
    }
    
    putResultsInYatzySheet(possibleSheetValues: number[]) {
        for (let i = 0; i < possibleSheetValues.length; i++) {
            this.yatzySheet.sheetValues[i][0] = possibleSheetValues[i];
            // console.log(possibleSheetValues[i]);
        }
    }
   

    totalTop() {
        
    }
 
    totalBottom() {

    }

   

}



// const num = Logic.getResults([new Die(5, false), new Die(5, false), new Die(5, false), new Die(5, false)]);

// console.log(`THE NUMBER IS: ${num}`);



