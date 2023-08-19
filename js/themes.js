"use strict";
// class Themes {
//     public themeSelector = document.querySelector('[theme-selector]');
//     public stripyCheck = document.querySelector('[stripyNth]');
//     public yatzyTableColor = document.querySelector('[yatzy-table]');
//     public yatzyTableNth = document.querySelectorAll('[yatzy-table] tr:nth-child(2n + 3)');
//     public colors: string[] = [];
//     public colorNth: string[] = ['white', 'black'];
//     public txtColor: string[] = ['white', 'black'];
//     constructor() {
//         this.stripyCheck?.addEventListener('change', () => this.changeTheme(this.themeSelector?.value, this.stripyCheck?.checked));
//         this.themeSelector?.addEventListener('change', () =>  {
//         //    const stripyOrNot = this.stripyNth?.checked? true: false;
//             this.changeTheme(this.themeSelector?.value, this.stripyCheck?.checked);
//         });
//         }
//         changeTheme(color: any, stripyChecked: Boolean) {
//             if (!stripyChecked) {
//                 this.yatzyTableNth.forEach((nth) => {
//                  nth?.setAttribute('style', '');
//                 });
//                 this.yatzyTableColor?.setAttribute('style', `background-color: ${color}`);
//             }
//             if (stripyChecked) {
//                 this.yatzyTableColor?.setAttribute('style', 'background-color: #fff');
//                 this.yatzyTableNth.forEach((nth) => {
//                     nth?.setAttribute('style',  `background-color: ${color}`);
//                 });
//             }
//         }
// }
// const themes = new Themes();
