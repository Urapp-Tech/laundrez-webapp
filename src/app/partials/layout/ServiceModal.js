import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Container, Row, Col, Button, Accordion, useAccordionToggle } from 'react-bootstrap';
import defaultImage from '../../../_metronic/layout/assets/layout-svg-icons/no-image.png';
import { API_URL } from '../../store/services/config';
import { useDispatch, useSelector } from 'react-redux';
import { MyBasketActions } from '../../store/ducks/mybasket-duck/actions';

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

export default function ServiceModal({ showModal, closeModal }) {

    const dispatch = useDispatch();
    const isProgress = useSelector(store => store?.service?.isProgress);
    const service = useSelector(store => store?.service?.service);
    const [item, setItem] = useState({});

    useEffect(() => {
        let item = { ...service };
        item['qty'] = service.minQty;
        setItem(item);
    }, [service]);

    const incrementQtyCount = useCallback(() => {
        let itemObj = { ...item };
        let count = itemObj.qty;
        count++;
        itemObj['qty'] = count;
        setItem(itemObj);

    }, [item]);

    const decrementQtyCount = useCallback(() => {
        let itemObj = { ...item };
        let count = itemObj.qty;
        if (count > item.minQty)
            count--;
        itemObj['qty'] = count;
        setItem(itemObj);

    }, [item]);

    const addToBasket = useCallback(() => {
        dispatch(MyBasketActions.addToBasket(item));
        closeModal();
    }, [dispatch, item, closeModal]);


    return (
        <Modal
            size="lg"
            centered
            show={showModal}
            onHide={closeModal}
        >

            <Modal.Body  >
                {
                    isProgress ?
                        <div className="kt-spinner kt-spinner--center kt-spinner--primary mt-4" ></div>
                        :
                        <Container>
                            <Row className="show-grid">
                                <Col xs={6} md={6}>
                                    <div className="service-modal-info" >
                                        <div className="item-image" >
                                            <img alt={'img'} className="image" src={item.image ? `${API_URL}/${item.image}` : defaultImage} />
                                        </div>
                                        <div className="item-info" >
                                            <h3>{item.title}</h3>
                                            <div className="item-description"  >
                                                {item.description}
                                            </div>
                                            <span>Minimum Order : {item.minQty}</span>
                                        </div>
                                        <div className="item-quantity-price" >
                                            <div>
                                                <h2 className="font-weight-bold price" >${item.price}<span className="per-item" > / item</span></h2>

                                            </div>

                                            <div className="w-25  d-flex justify-content-between align-items-center" >

                                                <img alt="img" className="cursor-pointer" onClick={decrementQtyCount} src={require('../../../_metronic/layout/assets/layout-svg-icons/minus.svg')} />

                                                <span className="qty">{item.qty}</span>

                                                <img alt="img" className="cursor-pointer" onClick={incrementQtyCount} src={require('../../../_metronic/layout/assets/layout-svg-icons/plus.svg')} />

                                            </div>


                                        </div>
                                        <div className="item-add">
                                            <Button variant="primary" block className="" onClick={addToBasket} >Add to Basket</Button>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={6} md={6}>
                                    <div className="service-modal-faq" >
                                        <div className="d-flex justify-content-end mb-3" >
                                            <div onClick={closeModal} className="fas fa-times"></div>
                                        </div>
                                        {item?.listFAQ?.map((v, i) => {
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
                }
            </Modal.Body>
        </Modal>
    );
}