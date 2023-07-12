"use strict";
var Themes = /** @class */ (function () {
    function Themes() {
        var _this = this;
        var _a, _b;
        this.themeSelector = document.querySelector('[theme-selector]');
        this.stripyCheck = document.querySelector('[stripyNth]');
        this.yatzyTableColor = document.querySelector('[yatzy-table]');
        this.yatzyTableNth = document.querySelectorAll('[yatzy-table] tr:nth-child(2n + 3)');
        this.colors = [];
        this.colorNth = ['white', 'black'];
        this.txtColor = ['white', 'black'];
        (_a = this.stripyCheck) === null || _a === void 0 ? void 0 : _a.addEventListener('change', function () { var _a, _b; return _this.changeTheme((_a = _this.themeSelector) === null || _a === void 0 ? void 0 : _a.value, (_b = _this.stripyCheck) === null || _b === void 0 ? void 0 : _b.checked); });
        (_b = this.themeSelector) === null || _b === void 0 ? void 0 : _b.addEventListener('change', function () {
            var _a, _b;
            //    const stripyOrNot = this.stripyNth?.checked? true: false;
            _this.changeTheme((_a = _this.themeSelector) === null || _a === void 0 ? void 0 : _a.value, (_b = _this.stripyCheck) === null || _b === void 0 ? void 0 : _b.checked);
        });
    }
    Themes.prototype.changeTheme = function (color, stripyChecked) {
        var _a, _b;
        if (!stripyChecked) {
            this.yatzyTableNth.forEach(function (nth) {
                nth === null || nth === void 0 ? void 0 : nth.setAttribute('style', '');
            });
            (_a = this.yatzyTableColor) === null || _a === void 0 ? void 0 : _a.setAttribute('style', "background-color: ".concat(color));
        }
        if (stripyChecked) {
            (_b = this.yatzyTableColor) === null || _b === void 0 ? void 0 : _b.setAttribute('style', 'background-color: #fff');
            this.yatzyTableNth.forEach(function (nth) {
                nth === null || nth === void 0 ? void 0 : nth.setAttribute('style', "background-color: ".concat(color));
            });
        }
    };
    return Themes;
}());
var themes = new Themes();
