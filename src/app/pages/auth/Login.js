import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { TextField } from "@material-ui/core";
import clsx from "clsx";
import * as auth from "../../store/ducks/auth.duck";
import { login } from "../../crud/auth.crud";
import { Row, Col, Form } from "react-bootstrap";
import FbLogo from "../../../_metronic/layout/assets/layout-svg-icons/fb-logo.svg";
import Logo from "../../../_metronic/layout/assets/layout-svg-icons/Logo.svg";

function Login(props) {
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const [loadingButtonStyle, setLoadingButtonStyle] = useState({
    paddingRight: "2.5rem"
  });

  const enableLoading = () => {
    setLoading(true);
    setLoadingButtonStyle({ paddingRight: "3.5rem" });
  };

  const disableLoading = () => {
    setLoading(false);
    setLoadingButtonStyle({ paddingRight: "2.5rem" });
  };

  return (
    <>
      {/* <div className="kt-login__head">
        <span className="kt-login__signup-label">
          Don't have an account yet?
        </span>
        &nbsp;&nbsp;
        <Link to="/auth/registration" className="kt-link kt-login__signup-link">
          Sign Up!
        </Link>
      </div> */}

      <div className="kt-login__body">
        <div className="kt-login__form">
          <div className="kt-login__title">
            <img src={Logo} />
            <h3 className="text-primary" >
              {/* https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage */}
              {/* <FormattedMessage id="AUTH.LOGIN.TITLE" /> */}
              Sign In To Customer
            </h3>
          </div>
          <Form className="kt-form " >
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>
            <Form.Group className="" controlId="exampleForm.ControlInput1">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Row className="justify-content-between pr-3 pl-3 mt-3 " >
              <Form.Group className="m-0 remember-me" controlId="remember-me">
                <Form.Check type="checkbox" inline label="Remember me" />
              </Form.Group>
              <Link to="/auth/forgot-password" > <h6 className="m-0" > Forget Password? </h6></Link>
            </Row>
            <button className="btn btn-primary  btn-primary-gradient btn-block mt-4" > Login </button>
            <button className="btn btn-fb btn-block mt-4" > <img src={FbLogo} className="mr-2" /> Login with Facebook </button>
          </Form>
          <div className="kt-login__options mt-5">
            <Row className="justify-content-center " >
              <Col>
                <span>Don't have an account yet ? </span>
                <Link to="/auth/registration" > <h6 className="mb-0 ml-2 d-inline " > Sign Up </h6> </Link>
              </Col>
            </Row>
          </div>
          {/* <Formik
            initialValues={{
              email: "admin@demo.com",
              password: "demo"
            }}
            validate={values => {
              const errors = {};

              if (!values.email) {
                // https://github.com/formatjs/react-intl/blob/master/docs/API.md#injection-api
                errors.email = intl.formatMessage({
                  id: "AUTH.VALIDATION.REQUIRED_FIELD"
                });
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = intl.formatMessage({
                  id: "AUTH.VALIDATION.INVALID_FIELD"
                });
              }

              if (!values.password) {
                errors.password = intl.formatMessage({
                  id: "AUTH.VALIDATION.REQUIRED_FIELD"
                });
              }

              return errors;
            }}
            onSubmit={(values, { setStatus, setSubmitting }) => {
              enableLoading();
              setTimeout(() => {
                login(values.email, values.password)
                  .then(({ data: { accessToken } }) => {
                    disableLoading();
                    props.login(accessToken);
                  })
                  .catch(() => {
                    disableLoading();
                    setSubmitting(false);
                    setStatus(
                      intl.formatMessage({
                        id: "AUTH.VALIDATION.INVALID_LOGIN"
                      })
                    );
                  });
              }, 1000);
            }}
          >
            {({
              values,
              status,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            }) => (
                <form
                  noValidate={true}
                  autoComplete="off"
                  className="kt-form"
                  onSubmit={handleSubmit}
                >
                  {status ? (
                    <div role="alert" className="alert alert-danger">
                      <div className="alert-text">{status}</div>
                    </div>
                  ) : (
                      <div role="alert" className="alert alert-info">
                        <div className="alert-text">
                          Use account <strong>admin@demo.com</strong> and password{" "}
                          <strong>demo</strong> to continue.
                        </div>
                      </div>
                    )}

                  <div className="form-group">
                    <TextField
                      type="email"
                      label="Email"
                      margin="normal"
                      className="kt-width-full"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      helperText={touched.email && errors.email}
                      error={Boolean(touched.email && errors.email)}
                    />
                  </div>

                  <div className="form-group">
                    <TextField
                      type="password"
                      margin="normal"
                      label="Password"
                      className="kt-width-full"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      helperText={touched.password && errors.password}
                      error={Boolean(touched.password && errors.password)}
                    />
                  </div>

                  <div className="kt-login__actions">
                    <Link
                      to="/auth/forgot-password"
                      className="kt-link kt-login__link-forgot"
                    >
                      <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
                    </Link>

                    <button
                      id="kt_login_signin_submit"
                      type="submit"
                      disabled={isSubmitting}
                      className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx(
                        {
                          "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loading
                        }
                      )}`}
                      style={loadingButtonStyle}
                    >
                      Sign In
                  </button>
                  </div>
                </form>
              )}
          </Formik> */}

          {/* <div className="kt-login__divider">
            <div className="kt-divider">
              <span />
              <span>OR</span>
              <span />
            </div>
          </div> */}

          {/* <div className="kt-login__options">
            <Link to="http://facebook.com" className="btn btn-primary kt-btn">
              <i className="fab fa-facebook-f" />
              Facebook
            </Link>
            <Link to="http://twitter.com" className="btn btn-info kt-btn">
              <i className="fab fa-twitter" />
              Twitter
            </Link>
            <Link to="google.com" className="btn btn-danger kt-btn">
              <i className="fab fa-google" />
              Google
            </Link>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default injectIntl(
  connect(
    null,
    auth.actions
  )(Login)
);
