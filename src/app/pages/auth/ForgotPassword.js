import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Logo from "../../../_metronic/layout/assets/layout-svg-icons/Logo.svg";
import { Row, Col, Form } from "react-bootstrap";

class ForgotPassword extends Component {
  state = { isRequested: false };

  render() {
    const { isRequested } = this.state;

    if (isRequested) {
      return <Redirect to="/auth" />;
    }

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
            <Form className="kt-form " >
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Control type="email" placeholder="Email" />
              </Form.Group>
              <button className="btn btn-primary  btn-primary-gradient btn-block mt-4" > Submit </button>

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
              initialValues={{ email: "" }}
              validate={values => {
                const errors = {};

                if (!values.email) {
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

                return errors;
              }}
              onSubmit={(values, { setStatus, setSubmitting }) => {
                requestPassword(values.email)
                  .then(() => {
                    this.setState({ isRequested: true });
                  })
                  .catch(() => {
                    setSubmitting(false);
                    setStatus(
                      intl.formatMessage(
                        { id: "AUTH.VALIDATION.NOT_FOUND" },
                        { name: values.email }
                      )
                    );
                  });
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
                <form onSubmit={handleSubmit} className="kt-form">
                  {status && (
                    <div role="alert" className="alert alert-danger">
                      <div className="alert-text">{status}</div>
                    </div>
                  )}

                  <div className="form-group">
                    <TextField
                      type="email"
                      label="Email"
                      margin="normal"
                      fullWidth={true}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      helperText={touched.email && errors.email}
                      error={Boolean(touched.email && errors.email)}
                    />
                  </div>

                  <div className="kt-login__actions">
                    <Link to="/auth">
                      <button
                        type="button"
                        className="btn btn-secondary btn-elevate kt-login__btn-secondary"
                      >
                        Back
                      </button>
                    </Link>

                    <button
                      type="submit"
                      className="btn btn-primary btn-elevate kt-login__btn-primary"
                      disabled={isSubmitting}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}
            </Formik> */}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(ForgotPassword);
