/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/pages/auth/AuthPage`, `src/pages/home/HomePage`).
 */

import React, { useEffect } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import HomePage from '../pages/home/HomePage';
import ErrorsPage from '../pages/errors/ErrorsPage';
import LogoutPage from '../pages/auth/Logout';
import { LayoutContextProvider } from '../../_metronic';
import Layout from '../../_metronic/layout/Layout';
import AuthPage from '../pages/auth/AuthPage';
import { AuthActions } from '../store/ducks/auth-duck';
import { MyBasketStorage } from '../store/ducks/mybasket-duck/basket-storage';
import { MyBasketActions } from '../store/ducks/mybasket-duck/actions';
import { AuthStorage } from '../store/ducks/auth-duck/auth-storage';
import SuccessToast from '../partials/content/SuccessToast';
import ErrorToast from '../partials/content/ErrorToast';
import TermsAndCondtion from '../pages/home/TermsAndCondition';
import PrivacyPolicy from '../pages/home/PrivacyPolicy';
import { OrderStorage } from '../store/ducks/order-duck/order-storage';
import { OrderActions } from '../store/ducks/order-duck';

export const Routes = withRouter(({ history }) => {

  const dispatch = useDispatch();
  const { isAuthorized, menuConfig, user } = useSelector(
    ({ auth, builder: { menuConfig } }) => ({
      menuConfig,
      isAuthorized: AuthStorage.getUser() !== null,
      user: auth.user
    }),
    shallowEqual
  );
  useEffect(() => {
    const token = AuthStorage.getToken();
    const userFromStorage = AuthStorage.getUser();
    if (token && Object.keys(userFromStorage).length && user === null) {
      dispatch(AuthActions.setUser(userFromStorage));
    }
  }, [dispatch, user]);
  useEffect(() => {
    const items = MyBasketStorage.getBasket();
    const order = OrderStorage.getOrder();
    const currentOrder = OrderStorage.getCurrentOrder();
    const coupon = MyBasketStorage.getCoupon();
    if (items) {
      dispatch(MyBasketActions.setBasket(items));
    }
    if (order) {
      dispatch(OrderActions.setOrder(order));
    }
    if (currentOrder) {
      dispatch(OrderActions.setCurrentOrder(currentOrder));
    }
    if (coupon) {
      dispatch(MyBasketActions.setCoupon(coupon));
    }
    //TODO: check for profile complete and redirect
  }, [dispatch]);
  return (
    /* Create `LayoutContext` from current `history` and `menuConfig`. */
    <LayoutContextProvider history={history} menuConfig={menuConfig}>
      <Switch>
        <Route path="/termsandcondition" component={TermsAndCondtion} />
        <Route path="/privacypolicy" component={PrivacyPolicy} />
        {!isAuthorized ? (
          /* Render auth page when user at `/auth` and not authorized. */
          <AuthPage />
        ) : (
            /* Otherwise redirect to root page (`/`) */
            AuthStorage.getIsProfileCompleted()
              ?
              <Redirect from="/auth" to={'/dashboard'} />
              :
              <Redirect from="/auth" to={'/profile'} />
          )}

        <Route path="/error" component={ErrorsPage} />
        <Route path="/logout" component={LogoutPage} />

        {!isAuthorized ? (
          /* Redirect to `/auth` when user is not authorized */
          <Redirect to="/auth/login" />
        ) : (
            <Layout>
              <SuccessToast />
              <ErrorToast />
              <HomePage />
            </Layout>
          )}
      </Switch>
    </LayoutContextProvider>
  );
});
