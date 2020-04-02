import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as utils from "../../../_metronic/utils/utils";
import { AuthActions } from '../../store/ducks/auth-duck'
// import { login } from "../../crud/auth.crud";
import { Row, Col, Form, Alert } from "react-bootstrap";
import FbLogo from "../../../_metronic/layout/assets/layout-svg-icons/fb-logo.svg";
import Logo from "../../../_metronic/layout/assets/layout-svg-icons/Logo.svg";

function Login({ history }) {
  const dispatch = useDispatch();
  const isProgress = useSelector(store => store?.auth?.isProgress);
  const user = useSelector(store => store?.auth?.user);
  const [error, setError] = useState({ show: false, message: "" });
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const onLoginClick = () => {
    setError({ show: false, message: "" });
    if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValues.email)
    ) {
      setError({ show: true, message: "Email is not valid" });
      return;
    }

    else if (!formValues.password) {
      setError({ show: true, message: "Password is not valid" });
      return;
    }
    let body = {
      username: formValues.email,
      password: formValues.password
    };
    dispatch(AuthActions.login(body));

  }
  useEffect(() => {
    const token = utils.getToken();
    if (token && user) {
      history.replace('/admin/orders');
    }
  }, [user,history])


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
          {error.show &&
            <Alert variant={"danger"}>
              {error.message}
            </Alert>
          }
          <div className="kt-form " >
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control type="email" placeholder="Email" defaultValue={formValues.email} value={formValues.email} onChange={(e) => setFormValues({ email: e.target.value, password: formValues.password })} />
            </Form.Group>
            <Form.Group className="" controlId="exampleForm.ControlInput2">
              <Form.Control type="password" placeholder="Password" defaultValue={formValues.password} value={formValues.password} onChange={(e) => setFormValues({ email: formValues.email, password: e.target.value })} />
            </Form.Group>
            <Row className="justify-content-between pr-3 pl-3 mt-3 " >
              <Form.Group className="m-0 remember-me" controlId="remember-me">
                <Form.Check type="checkbox" inline label="Remember me" />
              </Form.Group>
              <Link to="/auth/forgot-password" > <h6 className="m-0" > Forget Password? </h6></Link>
            </Row>
            <button onClick={onLoginClick} disabled={isProgress} className={isProgress ? "text-white btn btn-primary  btn-primary-gradient btn-block mt-4 pr-0 kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light" : "btn btn-primary  btn-primary-gradient btn-block mt-4"} > Login </button>
            <button className="btn btn-fb btn-block mt-4" > <img src={FbLogo} alt={'img'} className="mr-2" /> Login with Facebook </button>
          </div>
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
