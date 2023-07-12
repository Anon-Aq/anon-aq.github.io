
export default class Random {

   static random(number: number) {
        return Math.floor(Math.random() * number + 1);
    }
}
