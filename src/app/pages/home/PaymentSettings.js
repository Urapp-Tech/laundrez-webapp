import React from "react";
import { Portlet, PortletBody } from "../../partials/content/Portlet";
import { Col, Row, Form } from "react-bootstrap";
import SavedCard from "../../partials/content/SavedCard";

export default function PaymentSettings() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const getYears = function (endYear) {
        let currentYear = new Date().getFullYear(), years = [];
        while (currentYear <= endYear) {
            years.push(currentYear++);
        }
        return years;
    }
    return (
        <>
            <h4 className="mb-3" >Payment Settings</h4>
            <div className="row">
                <div className="col-md-6">
                    <Portlet className="">
                        <PortletBody>
                            <h5 className="mb-3" >Add Card</h5>
                            <div className="row" >
                                <div className="col-md-9">
                                    <Form>
                                        <Row>
                                            <Form.Group as={Col} controlId="formGridStreet">
                                                <Form.Label>Card Number</Form.Label>
                                                <Form.Control type="text" placeholder="" />
                                            </Form.Group>
                                        </Row>
                                        <Row  >
                                            <Form.Group as={Col} controlId="formGridProperty">
                                                <Form.Label>Expiry Month</Form.Label>
                                                <Form.Control as="select">
                                                    {
                                                        months.map((v, i) => {
                                                            return <option key={i} value={v} >{v}</option>
                                                        })
                                                    }
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="formGridProperty">
                                                <Form.Label>Expiry Year</Form.Label>
                                                <Form.Control as="select">
                                                    {
                                                        getYears(2040).map((v, i) => {
                                                            return <option key={i} value={v} >{v}</option>
                                                        })
                                                    }
                                                </Form.Control>
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} controlId="formGridSuite">
                                                <Form.Label>CVV</Form.Label>
                                                <Form.Control type="text" placeholder="" />
                                            </Form.Group>
                                        </Row>
                                        <Row className="justify-content-end" >
                                            <Col  >
                                                <button className="btn btn-primary  btn-primary-gradient btn-block" > Save </button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </div>
                        </PortletBody>
                    </Portlet>
                </div>
                <div className="col-md-6">
                    <Portlet className="">
                        <PortletBody>
                            <h5 className="mb-3" >Saved Card</h5>
                            <SavedCard cardCount={"01"} />
                            <SavedCard cardCount={"02"} />
                        </PortletBody>
                    </Portlet>
                </div>
            </div>
        </>
    );
}