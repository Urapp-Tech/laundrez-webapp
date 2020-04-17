import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import '../../../_metronic/_assets/sass/pages/login/login-1.scss';
import BgAuth from '../../../_metronic/layout/assets/layout-svg-icons/login-bg.svg';
import Login from './Login';
import Registration from './Registration';
import ForgotPassword from './ForgotPassword';
import CreateNewPassword from './CreateNewPassword';

export default function AuthPage() {
  return (
    <>
      <div className="kt-grid kt-grid--ver kt-grid--root">
        <div
          id="kt_login"
          className="kt-grid kt-grid--hor kt-grid--root kt-login kt-login--v1"
        >
          <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--desktop kt-grid--ver-desktop kt-grid--hor-tablet-and-mobile">

            <div className="kt-grid__item kt-grid__item--fluid  kt-grid__item--order-tablet-and-mobile-1  kt-login__wrapper">
              <Switch>
                <Route path="/customer/auth/login" component={Login} />
                <Route path="/customer/auth/registration" component={Registration} />
                <Route
                  path="/customer/auth/forgot-password"
                  component={ForgotPassword}
                />
                 <Route
                  path="/customer/auth/reset-password"
                  component={CreateNewPassword}
                />
                <Redirect from="/customer/auth" exact={true} to="/customer/auth/login" />
                <Redirect to="/customer/auth/login" />
              </Switch>
            </div>

            <div
              className="kt-grid__item kt-grid__item--order-tablet-and-mobile-2 kt-grid kt-grid--hor kt-login__aside"
              style={{
                backgroundImage: `url(${BgAuth})`
              }}
            >
              {/* </div> */}
              <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver">
                <div className="kt-grid__item kt-grid__item--middle">
                  <h3 className="kt-login__title">Laundrez</h3>
                  <h4 className="kt-login__subtitle">
                    Lorem ipsum dolor sit amet, coectetuer adipiscing
                    elit sed diam nonummy et nibh euismod
                  </h4>
                </div>
              </div>
              {/* <div className="kt-grid__item">
                <div className="kt-login__info">
                  <div className="kt-login__copyright">
                    &copy; 2018 Metronic
                  </div>
                  <div className="kt-login__menu">
                    <Link to="/terms" className="kt-link">
                      Privacy
                    </Link>
                    <Link to="/terms" className="kt-link">
                      Legal
                    </Link>
                    <Link to="/terms" className="kt-link">
                      Contact
                    </Link>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
