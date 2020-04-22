export class MyBasketStorage {
    static setBasket(items) {
        localStorage.setItem('_basket', JSON.stringify(items));
    }
    static getBasket() {
        return JSON.parse(localStorage.getItem('_basket'));
    }
    static clearBasket() {
        localStorage.removeItem('_basket');
    }
}