import React from "react";
import { Portlet, PortletBody } from "../../partials/content/Portlet";
import { Form, Row, Col } from "react-bootstrap";

export default function PickAndDrop() {
    return (
        <>
            <h4 className="mb-3" >Pick And Drop</h4>
            <div className="row">
                <div className="col-xl-6 col-md-6">
                    <div className="row row-full-height ">
                        <div className="col-md-12 ">
                            <Portlet className="">
                                <PortletBody>
                                    <Form>
                                        <Row className="border-bottom" >
                                            <Form.Group as={Col} controlId="formGridStreet">
                                                <Form.Label>Pickup Date</Form.Label>
                                                <Form.Control type="date" placeholder="" />
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="formGridStreet">
                                                <Form.Label>Pickup Time</Form.Label>
                                                <Form.Control type="time" placeholder="" />
                                            </Form.Group>
                                        </Row>
                                    </Form>
                                    <Form>
                                        <Row className="border-bottom mt-3" >
                                            <Form.Group as={Col} controlId="formGridStreet">
                                                <Form.Label>Dropoff Date</Form.Label>
                                                <Form.Control type="date" placeholder="" />
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="formGridStreet">
                                                <Form.Label>Dropoff Time</Form.Label>
                                                <Form.Control type="time" placeholder="" />
                                            </Form.Group>
                                        </Row>
                                    </Form>
                                    <Form>
                                        <div className="border-bottom mt-3 d-block"  >
                                            <Row>
                                                <Form.Group as={Col} controlId="formGridStreet">
                                                    <Form.Check inline placeholder="" />
                                                    <Form.Label className="address-label" ><img src={require("../../../_metronic/layout/assets/layout-svg-icons/pin.svg")} /> 2003 | Bay Street</Form.Label>
                                                </Form.Group>
                                            </Row>
                                            <Row>
                                                <Form.Group as={Col} controlId="formGridStreet">
                                                    <Form.Check inline placeholder="" />
                                                    <Form.Label className="address-label" > <img src={require("../../../_metronic/layout/assets/layout-svg-icons/pin.svg")} /> 2660 | 590 Bay Street</Form.Label>
                                                </Form.Group>
                                            </Row>
                                        </div>
                                    </Form>

                                    <Row className=" mt-3" >
                                        <Form.Group as={Col} controlId="formGridPhone">
                                            <Form.Label>Driver Instruction</Form.Label>
                                            <Form.Control as="textarea" rows="3" placeholder="" />
                                        </Form.Group>
                                    </Row>
                                    <Row className="justify-content-end pb-5 " >
                                        <button className="btn btn-lg btn-primary-gradient btn-primary pr-5 pl-5">Place Order</button>
                                    </Row>
                                </PortletBody>
                            </Portlet>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-md-6">
                    <div className="row row-full-height ">
                        <div className="col-md-12 ">
                            <Portlet className=""></Portlet>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}