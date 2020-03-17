import React, { useState } from "react";
import { Modal, Container, Row, Col, Button, Accordion, Card, Dropdown, useAccordionToggle } from "react-bootstrap";

function CustomToggle({ children, eventKey }) {
    const [isOpen, toggle] = useState(false)
    const decoratedOnClick = useAccordionToggle(eventKey, () =>
        toggle(!isOpen)
    );

    return (
        <div onClick={decoratedOnClick} className="faq-heading d-flex justify-content-between" >
            <div className="faq-question" > Can you clean items with leather, velvet, suede or fur?</div>
            <div>{isOpen ? <img className="arrow-icon" src={require("../../../_metronic/layout/assets/layout-svg-icons/arrow-down.svg")} /> : <img className="arrow-icon" src={require("../../../_metronic/layout/assets/layout-svg-icons/arrow-right.svg")} />}</div>
        </div>
    );
}

export default function ServiceModal({ data, showModal, toggleModal }) {

    return (
        <Modal
            size="lg"
            show={showModal}
            onHide={toggleModal}
            aria-labelledby="example-modal-sizes-title-lg"
        >

            <Modal.Body  >
                <Container>
                    <Row className="show-grid">
                        <Col xs={6} md={6}>
                            <div className="service-modal-info" >
                                <div className="item-image" >
                                    <img className="image" src={data.serviceImage} />
                                </div>
                                <div className="item-info" >
                                    <h3>{data.serviceTitle}</h3>
                                    <div className="item-description"  >
                                        {data.serviceDesc}
                                    </div>
                                </div>
                                <div className="item-quantity-price" >
                                    <h2 className="font-weight-bold price" >{data.serviceCharges}</h2>

                                    <div className="w-25  d-flex justify-content-between align-items-center" >

                                        <img alt="img" src={require("../../../_metronic/layout/assets/layout-svg-icons/minus.svg")} />

                                        <span className="qty">1</span>

                                        <img alt="img" src={require("../../../_metronic/layout/assets/layout-svg-icons/plus.svg")} />

                                    </div>


                                </div>
                                <div className="item-add">
                                    <Button variant="primary" block className="" >Add to Basket</Button>
                                </div>
                            </div>
                        </Col>
                        <Col xs={6} md={6}>
                            <div className="service-modal-faq" >
                                <div className="d-flex justify-content-end mb-3" >
                                    <button onClick={toggleModal} type="button" className="close"><span aria-hidden="true">×</span><span className="sr-only">Close</span></button>
                                </div>
                                <div className="accordion-container mb-2" >
                                    <Accordion defaultActiveKey="0">
                                        <CustomToggle eventKey="1">Click me!</CustomToggle>

                                        <Accordion.Collapse eventKey="1">
                                            <div className="faq-ans" >
                                                Praesent eu dolor eu orci vehicula euismod. Vivamus sed sollicitudin libero, vel malesuada velit. Nullam et maximus lorem. Suspendisse maximus dolor quis consequat volutpat. Donec vehicula elit eu erat pulvinar, vel congue ex egestas. Praesent egestas purus dolor, a porta arcu pharetra quis. Sed vestibulum semper ligula, id accumsan orci ornare ut. Donec id pharetra nunc, ut sollicitudin mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam dapibus nisl at diam scelerisque luctus. Nam mattis, velit in malesuada maximus, erat ligula eleifend eros, et lacinia nunc ante vel odio.
                                                Praesent eu dolor eu orci vehicula euismod. Vivamus sed sollicitudin libero, vel malesuada velit. Nullam et maximus lorem. Suspendisse maximus dolor quis consequat volutpat. Donec vehicula elit eu erat pulvinar, vel congue ex egestas. Praesent egestas purus dolor, a porta arcu pharetra quis. Sed vestibulum semper ligula, id accumsan orci ornare ut. Donec id pharetra nunc, ut sollicitudin mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam dapibus nisl at diam scelerisque luctus. Nam mattis, velit in malesuada maximus, erat ligula eleifend eros, et lacinia nunc ante vel odio.
                                            </div>
                                        </Accordion.Collapse>
                                    </Accordion>
                                </div>



                            </div>
                        </Col>
                    </Row>


                </Container>
            </Modal.Body>
        </Modal>
    )
}