import { MyBasketActionTypes } from './actions-types';

export class MyBasketActions {

    static addToBasket(item) {
        return {
            type: MyBasketActionTypes.ADD_TO_BASKET,
            payload: { item }
        };
    }

    static incrementQty(id) {
        return {
            type: MyBasketActionTypes.INCREMENT_QTY,
            payload: { id }
        };
    }
    static decrementQty(id) {
        return {
            type: MyBasketActionTypes.DECREMENT_QTY,
            payload: { id }
        };
    }

    static removeFromBasket(id) {
        return {
            type: MyBasketActionTypes.REMOVE_FROM_BASKET,
            payload: { id }
        };
    }

    static setBasket(items) {
        return {
            type: MyBasketActionTypes.SET_BASKET,
            payload: { items }
        };
    }
    static clearBasket() {
        return {
            type: MyBasketActionTypes.CLEAR_BASKET
        };
    }

    static validatePromoCoupon(body) {
        return {
            type: MyBasketActionTypes.VALIDATE_PROMO_COUPON_PROG,
            payload: { body }
        };
    }

    static validateReferralCoupon() {
        return {
            type: MyBasketActionTypes.VALIDATE_REFERRAL_COUPON_PROG,
        };
    }

    static useReferral() {
        return {
            type: MyBasketActionTypes.USE_REFERRAL
        };
    }

    static clearPromoCoupon() {
        return {
            type: MyBasketActionTypes.CLEAR_PROMO_COUPON,
        };
    }

    static clearCoupon() {
        return {
            type: MyBasketActionTypes.CLEAR_COUPON
        };
    }

    static setCoupon(coupon) {
        return {
            type: MyBasketActionTypes.SET_COUPON,
            payload: { coupon }
        };
    }

}