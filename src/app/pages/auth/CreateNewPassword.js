import React from "react";
import Logo from "../../../_metronic/layout/assets/layout-svg-icons/Logo.svg";
import { Form } from "react-bootstrap";

export default function CreateNewPassword() {

    return (
        <div className="kt-grid__item kt-grid__item--fluid  kt-grid__item--order-tablet-and-mobile-1  kt-login__wrapper">
            <div className="kt-login__body">
                <div className="kt-login__form">
                    <div className="kt-login__title">
                        <img src={Logo} />
                        <h3 className="text-primary" >
                            Create Password
                        </h3>

                    </div>
                    <Form className="kt-form " >
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Control type="password" placeholder="New Password" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Control type="password" placeholder="Re-enter New Password" />
                        </Form.Group>
                        <button className="btn btn-primary  btn-primary-gradient btn-block mt-4" > Submit </button>

                    </Form>
                </div>
            </div>
        </div>
    );
}