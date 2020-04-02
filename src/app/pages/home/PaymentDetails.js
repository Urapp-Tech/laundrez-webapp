import React from 'react';
import { Portlet, PortletBody } from '../../partials/content/Portlet';
import { Col, Row, Form, Alert } from 'react-bootstrap';
import PaymentSetting from '../../../_metronic/layout/assets/layout-svg-icons/receipt.svg';
export default function PaymentDetails() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const getYears = function (endYear) {
        let currentYear = new Date().getFullYear(), years = [];
        while (currentYear <= endYear) {
            years.push(currentYear++);
        }
        return years;
    };
    return (
        <>
            <Alert variant={'success'}>
                <img src={PaymentSetting} alt={'img'} /> <span className="ml-2" >  Payment has been done on behalf of &nbsp; <b> ID:56482</b></span>
            </Alert>
            <h4 className="mb-3" >Payment Details</h4>
            <div className="row">
                <div className="col-md-12">
                    <Portlet className="">
                        <PortletBody>
                            <div className="row" >
                                <div className="col-md-4">
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
                                                            return <option key={i} value={v} >{v}</option>;
                                                        })
                                                    }
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="formGridProperty">
                                                <Form.Label>Expiry Year</Form.Label>
                                                <Form.Control as="select">
                                                    {
                                                        getYears(2040).map((v, i) => {
                                                            return <option key={i} value={v} >{v}</option>;
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
                                        <Row>
                                            <Form.Group as={Col} controlId="formGridBusser">
                                                <Form.Check className="check-primary-addrs" inline style={{ color: '#2c436a' }} label="Remember Details" />
                                            </Form.Group>
                                        </Row>
                                        <Row className="justify-content-end" >
                                            <Col  >
                                                <button className="btn btn-primary  btn-primary-gradient btn-block" > Pay Now </button>
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
    );
}