var Random = /** @class */ (function () {
    function Random() {
    }
    Random.random = function (number) {
        return Math.floor(Math.random() * number + 1);
    };
    return Random;
}());
export default Random;
