import React, { useState, useCallback } from 'react';

import { Link } from 'react-router-dom';
import Logo from '../../../_metronic/layout/assets/layout-svg-icons/Logo.svg';
import { Row, Col, Form, Alert } from 'react-bootstrap';
import { HttpService } from '../../store/services/http-service';

export default function ForgotPassword({ history }) {

  const [email, setEmail] = useState('');
  const [notValidEmail, setNotValidEmail] = useState({ error: false, message: '' });
  const [sucess, setSuccess] = useState(false);
  const [error, setError] = useState({ isError: false, message: '' });
  const [isProgress, setProgress] = useState(false);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if (error.isError) {
      setError({ isError: false, message: '' });
    }
    if (notValidEmail) {
      setNotValidEmail({ error: false, message: '' });
    }
    if (!email) {
      setNotValidEmail({ error: true, message: 'Please provide email' });
      return;
    }
    if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
    ) {
      setNotValidEmail({ error: true, message: 'Email is not valid' });
      return;
    }
    let body = {
      email
    };
    setProgress(true);
    HttpService.put('/User/forgotpassword', body).subscribe(() => {
      setSuccess(true);
      setProgress(false);
      window.scrollTo(0, 0);
      setTimeout(() => {
        history.replace('/auth/login');
      }, 3000);
    }, (err) => {
      setProgress(false);
      window.scrollTo(0, 0);
      setError({ isError: true, message: err?.response?.message || err?.response?.Message });
    });
  }, [email, history, notValidEmail, error]);

  return (
    <div className="kt-grid__item kt-grid__item--fluid  kt-grid__item--order-tablet-and-mobile-1  kt-login__wrapper">
      <div className="kt-login__body">
        <div className="kt-login__form">
          <div className="kt-login__title">
            <img src={Logo} alt={'img'} />
            <h3 className="text-primary" >
              Forgot Password
              </h3>
            <h6>Enter registered email to receive password reset link</h6>
          </div>
          {sucess && <Alert variant={'success'}>
            Link on your email has been sent. Redirecting to login.
            </Alert>
          }

          {error.isError &&
            <Alert variant={'danger'}>
              {error.message}
            </Alert>
          }
          <Form className="kt-form " onSubmit={onSubmit} >
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {notValidEmail.error && <label className="text-danger" >{notValidEmail.message}</label>}
            </Form.Group>
            <button
              disabled={isProgress}
              type={'submit'}
              className={isProgress ? 'text-white btn btn-primary  btn-primary-gradient btn-block mt-4 pr-0 kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light' : 'btn btn-primary  btn-primary-gradient btn-block mt-4'} >
              Submit
             </button>

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
    </div>
  );
}



