import React from 'react';
import { PortletBody, Portlet } from '../../partials/content/Portlet';
import { Col, Row, Form } from 'react-bootstrap';
import Pin from '../../../_metronic/layout/assets/layout-svg-icons/pin.svg';
import { Link } from 'react-router-dom';


export default function YourProfile() {
    return (
        <>
            <h4 className="mb-3" >Your Profile</h4>
            <div className="row">
                <div className="col-md-5">
                    <Portlet className="">
                        <PortletBody>
                            <div className="d-flex border-bottom pb-3 mb-3 justify-content-between align-items-center" >
                                <h6 className="text-secondary m-0" >Name</h6>
                                <h6 className="m-0" >Vincent Boyd</h6>
                            </div>
                            <div className="d-flex border-bottom pb-3 mb-3 justify-content-between align-items-center" >
                                <h6 className="text-secondary m-0" >Phone Number</h6>
                                <h6 className="m-0" >+1 54 523 5478</h6>
                            </div>
                            <div className="d-flex border-bottom pb-3 mb-3 justify-content-between align-items-center" >
                                <h6 className="text-secondary m-0" >Email Address</h6>
                                <h6 className="m-0" >vincent-bo@gmail.com</h6>
                            </div>
                            <div className="d-flex border-bottom pb-3 mb-3 justify-content-between align-items-center" >
                                <h6 className="text-secondary m-0" >Postal Code</h6>
                                <h6 className="m-0" >M6G 2B4</h6>
                            </div>
                            <div className="d-flex border-bottom pb-3 mb-3 justify-content-between align-items-center" >
                                <h6 className="text-secondary m-0" >Address 1</h6>
                                <h6 className="m-0" >2660 | 590 Bay Street</h6>
                            </div>
                            <div className="d-flex align-items-end" >
                                <img src={Pin} alt={'img'} className="pin-image img-fluid" />
                                <Link to="/deliveryaddress" >
                                    <h6 className="text-primary ml-1 mb-0" >Add Address</h6>
                                </Link>
                            </div>
                        </PortletBody>
                    </Portlet>
                </div>
                <div className="col-md-7">
                    <Portlet className="">
                        <PortletBody>
                            <div className="row" >
                                <div className="col-md-6">
                                    <h5 className="mb-3" >Edit Profile</h5>
                                    <Form>
                                        <Row>
                                            <Form.Group as={Col} controlId="first-name">
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control type="text" placeholder="" />
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} controlId="phone">
                                                <Form.Label>Phone Number</Form.Label>
                                                <Form.Control type="number" placeholder="" />
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} controlId="postal">
                                                <Form.Label>Postal Code</Form.Label>
                                                <Form.Control type="text" placeholder="" />
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} controlId="last-name">
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control type="text" placeholder="" />
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} controlId="email">
                                                <Form.Label>Email Address</Form.Label>
                                                <Form.Control type="email" placeholder="" />
                                            </Form.Group>
                                        </Row>
                                    </Form>
                                </div>
                                <div className="col-md-6">
                                    <h5 className="mb-3" >Change Password</h5>

                                    <Row>
                                        <Form.Group as={Col} controlId="curr-pass">
                                            <Form.Label>Current Password</Form.Label>
                                            <Form.Control type="password" placeholder="" />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} controlId="new-pass">
                                            <Form.Label>New Password</Form.Label>
                                            <Form.Control type="password" placeholder="" />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} controlId="ver-pass">
                                            <Form.Label>Verify Password</Form.Label>
                                            <Form.Control type="password" placeholder="" />
                                        </Form.Group>
                                    </Row>

                                    <Row id="save-address">
                                        <button className="btn btn-primary  btn-primary-gradient btn-block" > Update</button>
                                    </Row>

                                </div>
                            </div>
                        </PortletBody>
                    </Portlet>
                </div>
            </div>
        </>
    );
}