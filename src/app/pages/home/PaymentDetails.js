import React, { useEffect, useState, useCallback } from 'react';
import { Portlet, PortletBody } from '../../partials/content/Portlet';
import { Col, Row, Form, Alert } from 'react-bootstrap';
import PaymentSetting from '../../../_metronic/layout/assets/layout-svg-icons/receipt.svg';
import { useDispatch, useSelector } from 'react-redux';
import { CardActions } from '../../store/ducks/card-duck/actions';
import { OrderActions } from '../../store/ducks/order-duck/actions';
import clsx from 'clsx';
export default function PaymentDetails({ history }) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
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
        cvv: '',
        rememberDetails: false,
        cardId: ''
    });
    const [notValid, setNotValid] = useState({ error: false, type: '', message: '' });
    const dispatch = useDispatch();
    const cards = useSelector(store => store?.card?.cards);
    const order = useSelector(store => store?.order?.order);
    const isProgress = useSelector(store => store?.order?.isProgressPayment);
    const paymentSuccess = useSelector(store => store?.notification?.isSuccess);

    useEffect(() => {
        dispatch(CardActions.getCards());
    }, [dispatch]);

    useEffect(() => {
        if (paymentSuccess) {
            history.replace('/dashboard');
        }
    }, [paymentSuccess, history]);


    const doPayment = useCallback(() => {
        let cardRegexp = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
        if (notValid.error) {
            setNotValid({ error: false, type: '', message: '' });
        }
        if (!formValues.cardNumber && cards.length && !formValues.cardId) {
            setNotValid({ error: true, type: 'cardId', message: 'Please select card' });
            return;
        }
        if (!formValues.cardId) {
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
        }
        let body = {
            totalAmount: order?.totalAmount,
            orderId: order?.id,
            orderNumber: order?.orderNumber

        };
        if (formValues.cardId) {
            body['cardId'] = formValues.cardId;
        }
        else if (formValues.cardNumber) {

            let cardDetails = {
                expiryMonth: Number(formValues.expiryMonth),
                expiryYear: Number(formValues.expiryYear),
                cvvNumber: formValues.cvv,
                saveCard: formValues.rememberDetails
            };
            body['cardDetails'] = cardDetails;
        }
        dispatch(OrderActions.makePayment(body));

    }, [formValues, notValid, dispatch, cards, order]);


    return (
        <>
            {paymentSuccess && <Alert variant={'success'}>
                <img src={PaymentSetting} alt={'img'} /> <span className="ml-2" >  Payment has been done.</span>
            </Alert>}
            <h4 className="mb-3" >Payment Details</h4>
            <div className="row">
                <div className="col-md-6">
                    <Portlet className="">
                        <PortletBody>
                            <div className="row" >
                                <div className="col-md-12">
                                    <Form>
                                        {cards.length ? <Row>
                                            <Form.Group as={Col} controlId="formGridStreet">
                                                <Form.Label>Saved Card</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={formValues.cardId}
                                                    onChange={(e) => setFormValues({ ...formValues, cardId: e.target.value })}
                                                >
                                                    <option value={''} >Select card</option>
                                                    {
                                                        cards.map((v, i) => {
                                                            return <option key={i} value={v?.cardId} >XXXX XXXX XXXX {v?.cardNumber}</option>;
                                                        })
                                                    }
                                                </Form.Control>
                                                {(notValid.error && notValid.type === 'cardId') && <label className="text-danger" > {notValid.message} </label>}
                                            </Form.Group>
                                        </Row> : null}
                                        <Row>
                                            <h6>Add New Card</h6>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} controlId="formGridStreet">
                                                <Form.Label>Card Number</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder=""
                                                    value={formValues.cardNumber}
                                                    onChange={(e) => setFormValues({ ...formValues, cardNumber: e.target.value })}
                                                />
                                                {(notValid.error && notValid.type === 'cardNumber') && <label className="text-danger" > {notValid.message} </label>}
                                            </Form.Group>
                                        </Row>
                                        <Row  >
                                            <Form.Group as={Col} controlId="formGridProperty">
                                                <Form.Label>Expiry Month</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={formValues.expiryMonth}
                                                    onChange={(e) => setFormValues({ ...formValues, expiryMonth: e.target.value })}
                                                >
                                                    <option value={0} >Select Expiry Month</option>
                                                    {
                                                        months.map((v, i) => {
                                                            return <option key={i} value={Number(i) + 1} >{v}</option>;
                                                        })
                                                    }

                                                </Form.Control>
                                                {(notValid.error && notValid.type === 'expiryMonth') && <label className="text-danger" > {notValid.message} </label>}
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="formGridProperty">
                                                <Form.Label>Expiry Year</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={formValues.expiryYear}
                                                    onChange={(e) => setFormValues({ ...formValues, expiryYear: e.target.value })}>
                                                    <option value={0} >Select Expiry Year</option>
                                                    {
                                                        getYears(2040).map((v, i) => {
                                                            return <option key={i} value={v} >{v}</option>;
                                                        })
                                                    }
                                                </Form.Control>
                                                {(notValid.error && notValid.type === 'expiryYear') && <label className="text-danger" > {notValid.message} </label>}
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} controlId="formGridSuite">
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
                                        <Row>
                                            <Form.Group as={Col} controlId="formGridBusser">
                                                <Form.Check className="check-primary-addrs" checked={formValues.rememberDetails} onChange={() => setFormValues({ ...formValues, rememberDetails: !formValues.rememberDetails })} inline style={{ color: '#2c436a' }} label="Remember Details" />
                                            </Form.Group>
                                        </Row>
                                        <Row className="justify-content-end" >
                                            <Col  >
                                                <button onClick={doPayment} type={'button'} className={clsx('btn btn-block btn-primary-gradient btn-primary', isProgress && 'pr-0 kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light')} > Pay Now </button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </div>
                        </PortletBody>
                    </Portlet>
                </div>
                {/* <div className="col-md-6">
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
                </div> */}
            </div>
        </>
    );
}