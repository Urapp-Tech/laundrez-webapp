import React, { useState } from 'react';
import { Modal, Container, Row, Col, Button, Accordion, useAccordionToggle } from 'react-bootstrap';
import defaultImage from '../../../_metronic/layout/assets/layout-svg-icons/no-image.png';
import { API_URL } from '../../store/services/config';

function CustomToggle({ eventKey }) {
    const [isOpen, toggle] = useState(false);
    const decoratedOnClick = useAccordionToggle(eventKey, () =>
        toggle(!isOpen)
    );

    return (
        <div onClick={decoratedOnClick} className="faq-heading d-flex justify-content-between" >
            <div className="faq-question" > Can you clean items with leather, velvet, suede or fur?</div>
            <div>{isOpen ? <img alt={'img'} className="arrow-icon" src={require('../../../_metronic/layout/assets/layout-svg-icons/arrow-down.svg')} /> : <img alt={'img'} className="arrow-icon" src={require('../../../_metronic/layout/assets/layout-svg-icons/arrow-right.svg')} />}</div>
        </div>
    );
}

export default function ServiceModal({ data, showModal, closeModal }) {

    return (
        <Modal
            size="lg"
            show={showModal}
            onHide={closeModal}
            aria-labelledby="example-modal-sizes-title-lg"
        >

            <Modal.Body  >
                <Container>
                    <Row className="show-grid">
                        <Col xs={6} md={6}>
                            <div className="service-modal-info" >
                                <div className="item-image" >
                                    <img alt={'img'} className="image" src={data.image ? `${API_URL}/${data.image}` : defaultImage} />
                                </div>
                                <div className="item-info" >
                                    <h3>{data.title}</h3>
                                    <div className="item-description"  >
                                        {data.description}
                                    </div>
                                </div>
                                <div className="item-quantity-price" >
                                    <h2 className="font-weight-bold price" >${data.price}</h2>

                                    <div className="w-25  d-flex justify-content-between align-items-center" >

                                        <img alt="img" src={require('../../../_metronic/layout/assets/layout-svg-icons/minus.svg')} />

                                        <span className="qty">1</span>

                                        <img alt="img" src={require('../../../_metronic/layout/assets/layout-svg-icons/plus.svg')} />

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
                                    <div onClick={closeModal}  className="fas fa-times"></div>
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
    );
}