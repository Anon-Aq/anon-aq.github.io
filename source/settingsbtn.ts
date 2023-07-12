const settingsBtn = document.querySelector('[settings-btn]');
const settingsDropDown = document.querySelector('[settings-dropdown]');

settingsBtn?.addEventListener('click', () => {
    // settingsDropDown.focus();
    settingsDropDown?.classList.toggle('active');
});

settingsDropDown?.addEventListener('blur', () => {
    // alert('j')
    settingsDropDown?.classList.remove('active');
});







const diceIncrementedCount = [0, 0, 0, 0, 0, 0];
const playerDiceColl = [3, 6, 5, 2, 3];


 for (let i = 1; i < diceIncrementedCount.length; i++) {
    // console.log(i - 1) // playerdiceColl

    // console.log(i);
    // if (playerDiceColl[i - 1] === (i + 1)) {
    //     diceIncrementedCount[i] += 1;
    // }
 }

//  console.log(diceIncrementedCount);

