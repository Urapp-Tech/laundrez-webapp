import React from 'react';
import { Modal, Container, Row, Col, Form } from 'react-bootstrap';

export default function UpdateAddressModal({ showModal, toggleModal }) {
    return (
        <Modal
            size="lg"
            show={showModal}
            onHide={toggleModal}
            aria-labelledby="example-modal-sizes-title-lg"
        >

            <Modal.Body  >
                <Container>
                    <div className="d-flex justify-content-end mb-3" >
                        <button onClick={toggleModal} type="button" className="close"><span aria-hidden="true">×</span><span className="sr-only">Close</span></button>
                    </div>
                    <Row className="show-grid">
                        <Col md={6}>
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
                        </Col>
                        <Col md={6}>
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
                                    <Form.Check className="check-primary-addrs" inline style={{ color: '#2c436a' }} label="Use as Primary Address" />
                                </Form.Group>
                            </Row>
                            <Row id="save-address">
                                <button className="btn btn-primary  btn-primary-gradient btn-block" > Update Address</button>
                            </Row>
                        </Col>

                    </Row>


                </Container>
            </Modal.Body>
        </Modal>
    );
}