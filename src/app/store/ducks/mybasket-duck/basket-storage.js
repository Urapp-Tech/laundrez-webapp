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
    static setCoupon(coupon) {
        localStorage.setItem('_coupon', JSON.stringify(coupon));
    }
    static getCoupon() {
        return JSON.parse(localStorage.getItem('_coupon'));
    }
    static clearCoupon() {
        localStorage.removeItem('_coupon');
    }
}