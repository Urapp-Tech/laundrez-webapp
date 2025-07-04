import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AuthActions } from '../../store/ducks/auth-duck';
import { Row, Col, Form, Alert } from 'react-bootstrap';
import FbLogo from '../../../_metronic/layout/assets/layout-svg-icons/fb-logo.svg';
import Logo from '../../../_metronic/layout/assets/layout-svg-icons/Logo.svg';
// import FacebookLogin from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import clsx from 'clsx';
import { FB_APP_ID } from '../../store/services/config';


function Login() {
  const dispatch = useDispatch();
  const isProgress = useSelector(store => store?.auth?.isProgress);
  const isProgressSocialLogin = useSelector(store => store?.auth?.isProgressSocialLogin);
  const isError = useSelector(store => store?.auth?.isError);
  const errorMessage = useSelector(store => store?.auth?.errorMsg);
  const errorStatus = useSelector(store => store?.auth?.errorStatus);
  const [notValid, setNotValid] = useState({ error: false, type: '', message: '' });
  const [formValues, setFormValues] = useState({ email: '', password: '' });

  const responseFacebook = useCallback((response) => {
    let name = response?.name?.split(' ');
    let firstName = '';
    let lastName = '';
    if (name)
      name.forEach((v, i) => {
        if (i === 0) {
          firstName = v;
        }
        else if (i === 1) {
          lastName = v;
        }
      });
    let body = {
      firstName: firstName,
      lastName: lastName,
      email: response?.email,
      SocialPlatform: 'Facebook',
      Token: response?.accessToken
    };
    dispatch(AuthActions.socialLogin(body));
  }, [dispatch]);
  useEffect(() => {
    return () => {
      dispatch(AuthActions.clearError());
    };
  }, [dispatch]);

  const onLoginClick = useCallback((e) => {
    e.preventDefault();
    if (isError) {
      dispatch(AuthActions.clearError());
    }
    if (notValid.error)
      setNotValid({ error: false, type: '', message: '' });

    if (!formValues.email) {
      setNotValid({ error: true, type: 'email', message: 'Please provide email' });
      return;
    }
    if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValues.email)
    ) {
      setNotValid({ error: true, type: 'email', message: 'Email is not valid' });
      return;
    }

    if (!formValues.password) {
      setNotValid({ error: true, type: 'password', message: 'Please provide password' });
      return;
    }
    if (formValues.password.length < 8) {
      setNotValid({ error: true, type: 'password', message: 'Password must contain 8 characters' });
      return;
    }
    let body = {
      username: formValues.email,
      password: formValues.password
    };
    dispatch(AuthActions.login(body));

  }, [isError, dispatch, notValid, setNotValid, formValues]);


  return (
    <>
      <div className="kt-login__body">
        <div className="kt-login__form">
          <div className="kt-login__title">
            <img src={Logo} alt={'img'} />
            <h3 className="text-primary" >
              Sign In To Customer
            </h3>
          </div>
          {isError &&
            <Alert variant={'danger'}>
              <div className="d-flex" >
                <span> {errorMessage} {' '}
                  {
                    errorStatus === 418 && <Link to="/auth/forgot-password" className="text-white "  ><u> Forgot Password </u></Link>
                  }
                </span>
              </div>

            </Alert>
          }
          <Form className="kt-form " onSubmit={onLoginClick} >
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control type="email" placeholder="Email" value={formValues.email} onChange={(e) => setFormValues({ email: e.target.value, password: formValues.password })} />
              {(notValid.error && notValid.type === 'email') && <label className="text-danger" > {notValid.message} </label>}
            </Form.Group>
            <Form.Group className="" controlId="exampleForm.ControlInput2">
              <Form.Control type="password" placeholder="Password" value={formValues.password} onChange={(e) => setFormValues({ email: formValues.email, password: e.target.value })} />
              {(notValid.error && notValid.type === 'password') && <label className="text-danger" > {notValid.message} </label>}
            </Form.Group>
            <Row className="justify-content-between pr-3 pl-3 mt-3 " >
              <Form.Group className="m-0 remember-me" controlId="remember-me">
                <Form.Check type="checkbox" inline label="Remember me" />
              </Form.Group>
              <Link to="/auth/forgot-password" > <h6 className="m-0" > Forgot Password? </h6></Link>
            </Row>
            <button
              disabled={isProgress}
              className={isProgress ? 'text-white btn btn-primary  btn-primary-gradient btn-block mt-4 pr-0 kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light' : 'btn btn-primary  btn-primary-gradient btn-block mt-4'} >
              Login
             </button>
            <FacebookLogin
              appId={FB_APP_ID}
              fields="name,email,picture"
              callback={responseFacebook}
              render={renderProps => (
                <button disabled={isProgressSocialLogin} onClick={(e) => { e.preventDefault(); renderProps.onClick(); }} className={clsx('btn btn-fb btn-block mt-4', isProgressSocialLogin && 'pr-0 kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light')} > <img src={FbLogo} alt={'img'} className="mr-2" /> Login with Facebook </button>
              )}
            />
          </Form>
          <div className="kt-login__options mt-5">
            <Row className="justify-content-center " >
              <Col>
                <span>Don't have an account yet ? </span>
                <Link to="/auth/registration" > <h6 className="mb-0 ml-2 d-inline " > Sign Up </h6> </Link>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
