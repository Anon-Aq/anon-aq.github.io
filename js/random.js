export default class Random {
    static random(number) {
        return Math.floor(Math.random() * number + 1);
    }
}
