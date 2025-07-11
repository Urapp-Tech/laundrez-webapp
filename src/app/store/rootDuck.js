import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import * as auth from './ducks/auth-duck';
import * as category from './ducks/category-duck';
import * as service from './ducks/service-duck';
import * as mybasket from './ducks/mybasket-duck';
import * as address from './ducks/address-duck';
import * as notification from './ducks/notification-duck';
import * as faq from './ducks/faq-duck';
import * as lov from './ducks/lov-duck';
import * as order from './ducks/order-duck';
import * as card from './ducks/card-duck';
import { metronic } from '../../_metronic';

const appReducer = combineReducers({
  auth: auth.AuthReducer,
  builder: metronic.builder.reducer,
  category: category.CategoryReducer,
  service: service.ServiceReducer,
  mybasket: mybasket.MyBasketReducer,
  address: address.AddressReducer,
  notification: notification.NotificationReducer,
  faq: faq.FaqReducer,
  lov: lov.LovReducer,
  order: order.OrderReducer,
  card: card.CardReducer
});
export const rootReducer = (state, action) => {
  if (action.type === auth.AuthActionTypes.LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};
export const rootEpic = combineEpics(
  // more epics functions go here
  auth.AuthEpics.login,
  auth.AuthEpics.sociallLogin,
  auth.AuthEpics.getProfile,
  auth.AuthEpics.updateProfile,
  auth.AuthEpics.getNewAccessToken,


  category.CategoryEpics.getCategories,

  service.ServiceEpics.getServices,
  service.ServiceEpics.getService,

  address.AddressEpics.saveAddress,
  address.AddressEpics.getAddresses,
  address.AddressEpics.updateAddress,
  address.AddressEpics.deleteAddress,

  faq.FaqEpics.getFaqs,

  lov.LovEpics.getLov,
  lov.LovEpics.getPrivacyPolicy,

  order.OrderEpics.getOrders,
  order.OrderEpics.getActiveOrders,
  order.OrderEpics.postOrder,
  order.OrderEpics.updateOrder,
  order.OrderEpics.cancelOrder,
  order.OrderEpics.makePayment,
  order.OrderEpics.getOrderDetail,
  order.OrderEpics.checkSelectedDropoffSlot,
  order.OrderEpics.checkSelectedPickupSlot,

  mybasket.MyBasketEpics.validatePromoCoupon,
  mybasket.MyBasketEpics.validateReferralCoupon,

  card.CardEpics.getCards,
  card.CardEpics.saveCard,
  card.CardEpics.deleteCard,



);
