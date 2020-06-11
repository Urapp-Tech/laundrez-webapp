import { MyBasketActionTypes } from './actions-types';
import { MyBasketStorage } from './basket-storage';
const initState = {
  isProgress: false,
  isError: false,
  errorMsg: '',
  errorStatus: 0,
  items: {},
  coupon: {
    referral: null,
    promo: null,
    useReferral: false
  },
};
export function MyBasketReducer(state = initState, action) {
  let item = {};
  let items = {};
  let coupon = {};
  switch (action.type) {

    case MyBasketActionTypes.ADD_TO_BASKET:
      items = { ...state.items };
      items[action.payload.item.id] = action.payload.item;
      MyBasketStorage.setBasket(items);
      return { ...state, items };

    case MyBasketActionTypes.INCREMENT_QTY:
      items = { ...state.items };
      item = { ...items[action.payload.id] };
      item.qty++;
      items[action.payload.id] = item;
      MyBasketStorage.setBasket(items);
      return { ...state, items };

    case MyBasketActionTypes.DECREMENT_QTY:
      items = { ...state.items };
      item = { ...items[action.payload.id] };
      item.qty--;
      items[action.payload.id] = item;
      MyBasketStorage.setBasket(items);
      return { ...state, items };

    case MyBasketActionTypes.REMOVE_FROM_BASKET:
      items = { ...state.items };
      delete items[action.payload.id];
      MyBasketStorage.setBasket(items);
      return { ...state, items };

    case MyBasketActionTypes.SET_BASKET:
      return { ...state, items: action.payload.items };

    case MyBasketActionTypes.CLEAR_BASKET:
      MyBasketStorage.clearBasket();
      return { ...state, items: {} };

    case MyBasketActionTypes.VALIDATE_PROMO_COUPON_PROG:
      coupon = { ...state.coupon };
      coupon['promo'] = null;
      MyBasketStorage.setCoupon(coupon);
      return { ...state, isProgress: true, coupon: coupon, isError: false };
    case MyBasketActionTypes.VALIDATE_PROMO_COUPON_SUCC:
      coupon = { ...state.coupon };
      coupon['promo'] = action.payload.promo;
      MyBasketStorage.setCoupon(coupon);
      return { ...state, isProgress: false, coupon: coupon };
    case MyBasketActionTypes.VALIDATE_PROMO_COUPON_FAIL:
      return { ...state, isProgress: false, isError: true, errorMsg: action.payload.message, errorStatus: action.payload.status };


    case MyBasketActionTypes.CLEAR_PROMO_COUPON:
      coupon = { ...state.coupon };
      coupon['promo'] = null;
      MyBasketStorage.setCoupon(coupon);
      return { ...state, coupon: coupon, isError: false, errorMsg: '' };


    case MyBasketActionTypes.VALIDATE_REFERRAL_COUPON_PROG:
      coupon = { ...state.coupon };
      coupon['referral'] = null;
      MyBasketStorage.setCoupon(coupon);
      return { ...state, isProgress: true, coupon: coupon };
    case MyBasketActionTypes.VALIDATE_REFERRAL_COUPON_SUCC:
      coupon = { ...state.coupon };
      coupon['referral'] = action.payload.referral;
      MyBasketStorage.setCoupon(coupon);
      return { ...state, isProgress: false, coupon: coupon };
    case MyBasketActionTypes.VALIDATE_REFERRAL_COUPON_FAIL:
      return { ...state, isProgress: false, isError: true, errorMsg: action.payload.message, errorStatus: action.payload.status };


    case MyBasketActionTypes.CLEAR_COUPON:
      MyBasketStorage.clearCoupon();
      return {
        ...state, coupon: {
          referral: null,
          promo: null,
          useReferral: false
        },
      };


    case MyBasketActionTypes.USE_REFERRAL:
      coupon = { ...state.coupon };
      coupon['useReferral'] = !coupon['useReferral'];
      MyBasketStorage.setCoupon(coupon);
      return { ...state, coupon };


    case MyBasketActionTypes.SET_COUPON:
      return { ...state, coupon: action.payload.coupon };

    case MyBasketActionTypes.CLEAR_PROMO_COUPON_ERROR:
      return { ...state, isError: false, errorMsg: '' };


    default:
      return state;
  }
};