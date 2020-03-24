import React from "react";
import { Portlet, PortletBody } from "../../partials/content/Portlet";
import { Col, Row, Form } from "react-bootstrap";
export default function ContactUs() {
    return (
        <>
            <h4 className="mb-3" >Contact Us</h4>
            <div className="row">
                <div className="col-xl-12">
                    <Portlet className="">
                        <PortletBody>
                            <div className="row" >
                                <div className="col-md-12">
                                    <Form>
                                        <Row className="col-md-4" >
                                            <Form.Group as={Col} controlId="formGridProperty">
                                                <Form.Label>Select an Issue</Form.Label>
                                                <Form.Control as="select">
                                                    <option>Drop Off</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Row>

                                        <Form.Group controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Your Message</Form.Label>
                                            <Form.Control as="textarea" rows="15" />
                                        </Form.Group>

                                        <Row className="justify-content-end" >
                                            <Col md={3} >
                                                <button className="btn btn-primary  btn-primary-gradient btn-block" > Send </button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </div>
                        </PortletBody>
                    </Portlet>
                </div>
            </div>
        </>
    )
}