import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Container, Row, Col, Button, Accordion, useAccordionToggle } from 'react-bootstrap';
import defaultImage from '../../../_metronic/layout/assets/layout-svg-icons/no-image.png';
import { API_URL } from '../../store/services/config';
import { useDispatch, useSelector } from 'react-redux';
import { ServiceActions } from '../../store/ducks/service-duck';

function CustomToggle({ eventKey, question }) {
    const [isOpen, toggle] = useState(false);
    const decoratedOnClick = useAccordionToggle(eventKey, () =>
        toggle(!isOpen)
    );

    return (
        <div onClick={decoratedOnClick} className="faq-heading d-flex justify-content-between" >
            <div className="faq-question" >{question}</div>
            <div>{isOpen ? <img alt={'img'} className="arrow-icon" src={require('../../../_metronic/layout/assets/layout-svg-icons/arrow-down.svg')} /> : <img alt={'img'} className="arrow-icon" src={require('../../../_metronic/layout/assets/layout-svg-icons/arrow-right.svg')} />}</div>
        </div>
    );
}

export default function ServiceModal({ data, showModal, closeModal }) {

    const dispatch = useDispatch();
    const serviceFaq = useSelector(store => store?.service?.serviceFaq);
    const [qtyCount, setQtyCount] = useState(1);

    useEffect(() => {
        dispatch(ServiceActions.clearServiceFaq());
        dispatch(ServiceActions.getServieFaq(data.id));
    }, [data, dispatch]);

    const incrementQtyCount = useCallback(() => {
        let count = qtyCount;
        count++;

        setQtyCount(count);
    }, [qtyCount]);

    const decrementQtyCount = useCallback(() => {
        let count = qtyCount;
        if (count > 1)
            count--;
        setQtyCount(count);
    }, [qtyCount]);


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

                                        <img alt="img" className="cursor-pointer" onClick={decrementQtyCount} src={require('../../../_metronic/layout/assets/layout-svg-icons/minus.svg')} />

                                        <span className="qty">{qtyCount}</span>

                                        <img alt="img" className="cursor-pointer" onClick={incrementQtyCount} src={require('../../../_metronic/layout/assets/layout-svg-icons/plus.svg')} />

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
                                    <div onClick={closeModal} className="fas fa-times"></div>
                                </div>
                                {serviceFaq.map((v, i) => {
                                    return (<div key={i} className="accordion-container mb-2" >
                                        <Accordion defaultActiveKey="0">
                                            <CustomToggle question={v.question} eventKey="1">Click me!</CustomToggle>

                                            <Accordion.Collapse eventKey="1">
                                                <div className="faq-ans" >
                                                    {v.answer}
                                                </div>
                                            </Accordion.Collapse>
                                        </Accordion>
                                    </div>);
                                })
                                }





                            </div>
                        </Col>
                    </Row>


                </Container>
            </Modal.Body>
        </Modal>
    );
}