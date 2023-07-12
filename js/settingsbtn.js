"use strict";
var settingsBtn = document.querySelector('[settings-btn]');
var settingsDropDown = document.querySelector('[settings-dropdown]');
settingsBtn === null || settingsBtn === void 0 ? void 0 : settingsBtn.addEventListener('click', function () {
    // settingsDropDown.focus();
    settingsDropDown === null || settingsDropDown === void 0 ? void 0 : settingsDropDown.classList.toggle('active');
});
settingsDropDown === null || settingsDropDown === void 0 ? void 0 : settingsDropDown.addEventListener('blur', function () {
    // alert('j')
    settingsDropDown === null || settingsDropDown === void 0 ? void 0 : settingsDropDown.classList.remove('active');
});
var diceIncrementedCount = [0, 0, 0, 0, 0, 0];
var playerDiceColl = [3, 6, 5, 2, 3];
for (var i = 1; i < diceIncrementedCount.length; i++) {
    // console.log(i - 1) // playerdiceColl
    // console.log(i);
    // if (playerDiceColl[i - 1] === (i + 1)) {
    //     diceIncrementedCount[i] += 1;
    // }
}
//  console.log(diceIncrementedCount);
