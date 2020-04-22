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
import * as utils from '../../_metronic/utils/utils';
import AuthPage from '../pages/auth/AuthPage';
import { AuthActions } from '../store/ducks/auth-duck';
import { MyBasketStorage } from '../store/ducks/mybasket-duck/basket-storage';
import { MyBasketActions } from '../store/ducks/mybasket-duck/actions';

export const Routes = withRouter(({ history }) => {

  const dispatch = useDispatch();
  const { isAuthorized, menuConfig, user } = useSelector(
    ({ auth, builder: { menuConfig } }) => ({
      menuConfig,
      isAuthorized: utils.getToken() !== null,
      user: auth.user
    }),
    shallowEqual
  );
  useEffect(() => {
    const token = utils.getToken();
    const userFromStorage = utils.getUser();
    if (token && Object.keys(userFromStorage).length && user === null) {
      dispatch(AuthActions.setUser(userFromStorage));
    }
  }, [dispatch, user]);
  useEffect(() => {
    const items = MyBasketStorage.getBasket();
    if (items) {
      dispatch(MyBasketActions.setBasket(items));
    }
  }, [dispatch]);
  return (
    /* Create `LayoutContext` from current `history` and `menuConfig`. */
    <LayoutContextProvider history={history} menuConfig={menuConfig}>
      <Switch>
        {!isAuthorized ? (
          /* Render auth page when user at `/auth` and not authorized. */
          <AuthPage />
        ) : (
            /* Otherwise redirect to root page (`/`) */
            <Redirect from="/auth" to={'/dashboard'} />
          )}

        <Route path="/error" component={ErrorsPage} />
        <Route path="/logout" component={LogoutPage} />

        {!isAuthorized ? (
          /* Redirect to `/auth` when user is not authorized */
          <Redirect to="/auth/login" />
        ) : (
            <Layout>
              <HomePage />
            </Layout>
          )}
      </Switch>
    </LayoutContextProvider>
  );
});
