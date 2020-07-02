import React, { useEffect, useState, useCallback } from 'react';
import { Portlet, PortletBody } from '../../partials/content/Portlet';
import { Col, Row, Form } from 'react-bootstrap';
import SavedCard from '../../partials/content/SavedCard';
import { useDispatch, useSelector } from 'react-redux';
import { CardActions } from '../../store/ducks/card-duck/actions';
import clsx from 'clsx';
import StripeIcon from '../../../_metronic/layout/assets/layout-svg-icons/stripe-icon.png';
import PciIcon from '../../../_metronic/layout/assets/layout-svg-icons/pci-icon.png';

export default function PaymentSettings() {
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const getYears = function (endYear) {
        let currentYear = new Date().getFullYear(), years = [];
        while (currentYear <= endYear) {
            years.push(currentYear++);
        }
        return years;
    };
    const [formValues, setFormValues] = useState({
        cardNumber: '',
        expiryMonth: 0,
        expiryYear: 0,
        cvv: ''
    });
    const [notValid, setNotValid] = useState({ error: false, type: '', message: '' });
    const dispatch = useDispatch();
    const cardSaved = useSelector(store => store?.notification?.isSuccess);
    const isProgress = useSelector(store => store?.card?.isProgress);
    const cards = useSelector(store => store?.card?.cards);
    useEffect(() => {
        dispatch(CardActions.getCards());
    }, [dispatch]);
    useEffect(() => {
        if (cardSaved) {
            setFormValues({
                cardNumber: '',
                expiryMonth: 0,
                expiryYear: 0,
                cvv: ''
            });
        }
    }, [cardSaved]);
    const saveCard = useCallback((e) => {
        e.preventDefault();
        let cardRegexp = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
        if (notValid.error) {
            setNotValid({ error: false, type: '', message: '' });
        }
        if (!formValues.cardNumber) {
            setNotValid({ error: true, type: 'cardNumber', message: 'Please provide card number' });
            return;
        }
        if (!cardRegexp.test(formValues.cardNumber)) {
            setNotValid({ error: true, type: 'cardNumber', message: 'Not a valid card number' });
            return;
        }
        if (!formValues.expiryMonth) {
            setNotValid({ error: true, type: 'expiryMonth', message: 'Please select expiry month' });
            return;
        }
        if (!formValues.expiryYear) {
            setNotValid({ error: true, type: 'expiryYear', message: 'Please select expiry year' });
            return;
        }
        if (!formValues.cvv) {
            setNotValid({ error: true, type: 'cvv', message: 'Please provide cvv' });
            return;
        }
        let body = {
            cardNumber: formValues.cardNumber,
            expiryMonth: Number(formValues.expiryMonth),
            expiryYear: Number(formValues.expiryYear),
            cvvNumber: formValues.cvv
        };
        dispatch(CardActions.saveCard(body));
    }, [formValues, notValid, dispatch]);
    return (
        <>
            <h4 className="mb-3" >Payment Settings</h4>
            <div className="row">
                <div className="col-md-8">
                    <Portlet className="">
                        <PortletBody>
                            <h5 className="mb-3" >Add Card</h5>
                            <div className="row" >
                                <div className="col-md-12">
                                    <Form>
                                        <Row>
                                            <Form.Group as={Col} >
                                                <Form.Label>Card Number</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    id="card-number-input"
                                                    placeholder=""
                                                    value={formValues.cardNumber}
                                                    onChange={(e) => setFormValues({ ...formValues, cardNumber: e.target.value })}
                                                />
                                                {(notValid.error && notValid.type === 'cardNumber') && <label className="text-danger" > {notValid.message} </label>}
                                            </Form.Group>
                                        </Row>
                                        <Row  >
                                            <Form.Group as={Col} md={3} sm={5} xs={5} >
                                                <Form.Label>Expiry Month</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={formValues.expiryMonth}
                                                    onChange={(e) => setFormValues({ ...formValues, expiryMonth: e.target.value })}
                                                >
                                                    <option value={0} >MM</option>
                                                    {
                                                        months.map((v, i) => {
                                                            return <option key={i} value={Number(i) + 1} >{v}</option>;
                                                        })
                                                    }

                                                </Form.Control>
                                                {(notValid.error && notValid.type === 'expiryMonth') && <label className="text-danger" > {notValid.message} </label>}
                                            </Form.Group>
                                            <Col md={1} sm={2} xs={2} className="mt-auto text-center mb-auto" >
                                                /
                                            </Col>
                                            <Form.Group as={Col} md={3} sm={5} xs={5} >
                                                <Form.Label>Expiry Year</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={formValues.expiryYear}
                                                    onChange={(e) => setFormValues({ ...formValues, expiryYear: e.target.value })}>
                                                    <option value={0} >YYYY</option>
                                                    {
                                                        getYears(2040).map((v, i) => {
                                                            return <option key={i} value={v} >{v}</option>;
                                                        })
                                                    }
                                                </Form.Control>
                                                {(notValid.error && notValid.type === 'expiryYear') && <label className="text-danger" > {notValid.message} </label>}
                                            </Form.Group>
                                            <Form.Group as={Col} md={4} sm={12} >
                                                <Form.Label>CVV</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder=""
                                                    maxLength={4}
                                                    value={formValues.cvv}
                                                    onChange={(e) => setFormValues({ ...formValues, cvv: e.target.value })}
                                                />
                                                {(notValid.error && notValid.type === 'cvv') && <label className="text-danger" > {notValid.message} </label>}
                                            </Form.Group>
                                        </Row>
                                        {/* <Row>
                                        </Row> */}
                                        <Row className="justify-content-end" >
                                            <Col  >
                                                <button className={clsx('btn btn-block btn-primary-gradient btn-primary', isProgress && 'pr-0 kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light')} onClick={saveCard}  > Save </button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </div>
                        </PortletBody>
                    </Portlet>
                </div>
                <div className="col-md-4">
                    <Portlet className="">
                        <PortletBody>
                            <h5 className="mb-3" >Saved Card</h5>
                            {
                                cards.map((v, i) => {
                                    return (

                                        <SavedCard
                                            key={i}
                                            cardCount={Number(i) + 1}
                                            cardNumber={v?.cardNumber}
                                            expiryMonth={v?.expiryMonth}
                                            expiryYear={v?.expiryYear}
                                            deleteCard={() => dispatch(CardActions.deleteCard(v?.cardId))}
                                        />
                                    );
                                })
                            }
                        </PortletBody>
                    </Portlet>
                    <h6 className="mb-3 text-secondary" >Secured By</h6>
                    <div className="d-flex secured-container justify-content-start align-items-center" >
                        <img id="stripe-icon" src={StripeIcon} alt={'icon'} />
                        <img id="pci-icon" src={PciIcon} alt={'icon'} />
                    </div>
                </div>
            </div>
        </>
    );
}