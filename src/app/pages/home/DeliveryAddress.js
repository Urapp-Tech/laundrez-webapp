import React from "react";
import { Portlet, PortletBody } from "../../partials/content/Portlet";
import { Col, Row, Form } from "react-bootstrap";
import Pin from "../../../_metronic/layout/assets/layout-svg-icons/pin.svg";
import Garbage from "../../../_metronic/layout/assets/layout-svg-icons/garbage.svg";
import SavedAddress from "../../partials/content/SavedAddress";

export default function DeliveryAddress() {
    return (
        <>
            <h4 className="mb-3" >Delivery Address</h4>
            <div className="row">
                <div className="col-md-8">
                    <Portlet className="">
                        <PortletBody>
                            <h5 className="mb-3" >Add New Address</h5>
                            <div className="row" >
                                <div className="col-md-6">
                                    <Form>
                                        <Row>
                                            <Form.Group as={Col} controlId="formGridStreet">
                                                <Form.Label>Street</Form.Label>
                                                <Form.Control type="text" placeholder="" />
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} controlId="formGridSuite">
                                                <Form.Label>Suite Number</Form.Label>
                                                <Form.Control type="text" placeholder="" />
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} controlId="formGridCode">
                                                <Form.Label>Postal Code</Form.Label>
                                                <Form.Control type="text" placeholder="" />
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} controlId="formGridState">
                                                <Form.Label>State</Form.Label>
                                                <Form.Control type="text" placeholder="" />
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} controlId="formGridCity">
                                                <Form.Label>City</Form.Label>
                                                <Form.Control type="text" placeholder="" />
                                            </Form.Group>
                                        </Row>
                                    </Form>
                                </div>
                                <div className="col-md-6">
                                    <Row>
                                        <Form.Group as={Col} controlId="formGridPhone">
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control type="text" placeholder="" />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} controlId="formGridProperty">
                                            <Form.Label>Property Type</Form.Label>
                                            <Form.Control as="select">
                                                <option>Residential</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} controlId="formGridBusser">
                                            <Form.Label>Busser Code</Form.Label>
                                            <Form.Control type="number" placeholder="" />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} controlId="formGridBusser">
                                            <Form.Check className="check-primary-addrs" inline style={{ color: "#2c436a" }} label="Use as Primary Address" />
                                        </Form.Group>
                                    </Row>
                                    <Row id="save-address">
                                        <button className="btn btn-primary  btn-primary-gradient btn-block" > Save Address</button>
                                    </Row>

                                </div>
                            </div>

                        </PortletBody>
                    </Portlet>
                </div>
                <div className="col-md-4">
                    <Portlet className="">
                        <PortletBody>
                            <h5 className="mb-3" >Saved Address</h5>
                            <div className="row" >
                                <div className="col-md-12">
                                    <SavedAddress />
                                </div>
                            </div>
                        </PortletBody>
                    </Portlet>
                </div>
            </div>
        </>
    )
}