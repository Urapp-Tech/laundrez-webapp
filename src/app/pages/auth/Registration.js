import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../_metronic/layout/assets/layout-svg-icons/Logo.svg';
import { Row, Col, Form, Alert } from 'react-bootstrap';
import { HttpService } from '../../store/services/http-service';



export default function Registration({ history }) {

  const [isSuccess, setSuccess] = useState(false);
  const [error, setError] = useState({ isError: false, message: '' });
  const [isProgress, setProgress] = useState(false);
  const [notValid, setNotValid] = useState({ error: false, type: '', message: '' });
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '+1',
    postalCode: '',
    password: ''

  });

  const onSignUpClick = useCallback((e) => {
    e.preventDefault();
    if (error.isError) {
      setError({ isError: false, message: '' });
    }
    if (notValid.error) {
      setNotValid({ error: false, type: '', message: '' });
    }
    if (!formValues.firstName) {
      setNotValid({ error: true, type: 'firstName', message: 'Please provide first name' });
      return;
    }
    // if (formValues.firstName.length < 3) {
    //   setNotValid({ error: true, type: 'firstName', message: 'First Name is too short' });
    //   return;
    // }
    if (!formValues.lastName) {
      setNotValid({ error: true, type: 'lastName', message: 'Please provide last name' });
      return;
    }
    // if (formValues.lastName.length < 3) {
    //   setNotValid({ error: true, type: 'lastName', message: 'Last Name is too short' });
    //   return;
    // }
    if (!formValues.phoneNo) {
      setNotValid({ error: true, type: 'phoneNo', message: 'Please provide phone number' });
      return;
    }
    if (!/[+](1)?[0-9]{11}$/g.test(formValues.phoneNo)) {
      setNotValid({ error: true, type: 'phoneNo', message: 'Phone number must contain 10 characters and matches the format (+1XXXXXXXXXX)' });
      return;
    }

    if (!formValues.email) {
      setNotValid({ error: true, type: 'email', message: 'Please provide email' });
      return;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValues.email)) {
      setNotValid({ error: true, type: 'email', message: 'Invalid email' });
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
    if (formValues.postalCode.length < 1) {
      setNotValid({ error: true, type: 'postalCode', message: 'Please provide postal code' });
      return;
    }
    // let phoneNo = formValues.phoneNo;
    // phoneNo = phoneNo.substr(1);
    // phoneNo = '+1' + phoneNo;
    let body = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      phoneNo: formValues.phoneNo,
      postalCode: formValues.postalCode,
      password: formValues.password
    };
    setProgress(true);
    HttpService.post('/User/signup/', body).subscribe(() => {
      setProgress(false);
      setSuccess(true);
      window.scrollTo(0, 0);
      setTimeout(() => {
        history.replace('/auth/login');
      }, 3000);

    }, (err) => {
      setProgress(false);
      window.scrollTo(0, 0);
      setError({ isError: true, message: err.response.Message });
    });

  }, [formValues, setNotValid, notValid, setSuccess, history, error, setError]);


  return (
    <div className="kt-login__body">
      <div className="kt-login__form">
        <div className="kt-login__title">
          <img src={Logo} alt={'logo'} />
          <h3 className="text-primary" >
            Get Registered
            </h3>
        </div>
        {isSuccess &&
          <>
            <Alert className="flex-column" variant={'success'}>
              <div className="text-center" > You account has been successfully created.</div>

            </Alert>
            <div className="kt-spinner kt-spinner--center kt-spinner--primary mt-4" ></div>
          </>
        }
        {error.isError &&
          <Alert variant={'danger'}>
            {error.message}
          </Alert>
        }
        <Form className="kt-form " onSubmit={onSignUpClick} >
          <Form.Group >
            <Form.Control
              type="text"
              value={formValues.firstName}
              onChange={(e) => setFormValues({ ...formValues, firstName: e.target.value })}
              placeholder="First Name"
            />
            {(notValid.error && notValid.type === 'firstName') && <label className="text-danger" > {notValid.message} </label>}
          </Form.Group>
          <Form.Group >
            <Form.Control
              type="text"
              value={formValues.lastName}
              onChange={(e) => setFormValues({ ...formValues, lastName: e.target.value })}
              placeholder="Last Name"
            />
            {(notValid.error && notValid.type === 'lastName') && <label className="text-danger" > {notValid.message} </label>}
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="tel"
              value={formValues.phoneNo}
              onChange={(e) => setFormValues({ ...formValues, phoneNo: e.target.value })}
              placeholder="Phone Number"
            />
            {(notValid.error && notValid.type === 'phoneNo') && <label className="text-danger" > {notValid.message} </label>}
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="email"
              value={formValues.email}
              onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
              placeholder="Email"
            />
            {(notValid.error && notValid.type === 'email') && <label className="text-danger" > {notValid.message} </label>}
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              value={formValues.password}
              onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
              placeholder="Password"
            />
            {(notValid.error && notValid.type === 'password') && <label className="text-danger" > {notValid.message} </label>}
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="number"
              value={formValues.postalCode}
              onChange={(e) => setFormValues({ ...formValues, postalCode: e.target.value })}
              placeholder="Postal Code"
            />
            {(notValid.error && notValid.type === 'postalCode') && <label className="text-danger" > {notValid.message} </label>}
          </Form.Group>
          <Row className="justify-content-center " >
            <Col className=" mt-4 mb-4" >
              <span className=" text-center" >
                By signing up. you accept our<Link to="/" > <h6 className="mb-0  d-inline " > Terms and Conditions </h6> </Link> and<Link to="/" > <h6 className="mb-0  d-inline " > Privacy Policy </h6> </Link>
              </span>
            </Col>
          </Row>
          <button
            disabled={isProgress}
            type={'submit'}
            className={isProgress ? 'text-white btn btn-primary  btn-primary-gradient btn-block  pr-0 kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light' : 'btn btn-primary  btn-primary-gradient btn-block '} >
            Sign Up
             </button>
        </Form>
        <div className="kt-login__options mt-5 flex-column align-items-center">

          <Row className="justify-content-center " >
            <Col>
              <span>Already Have an Account </span>
              <Link to="/auth/login" > <h6 className="mb-0 ml-2 d-inline " > Sign In </h6> </Link>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

