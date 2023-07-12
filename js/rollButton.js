"use strict";
class Roll {
    // public rollBtn: any;
    btn = document.querySelector('.roll-btn');
    constructor() {
        this.initialize();
    }
    initialize() {
        this.btn?.addEventListener('click', () => {
            alert('clicked');
        });
    }
}
const roll = new Roll();
