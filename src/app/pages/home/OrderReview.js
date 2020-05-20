import React, { useState, useCallback, useEffect } from 'react';
import { Portlet, PortletBody } from '../../partials/content/Portlet';
import { Row, Col } from 'react-bootstrap';
import OrderReviewItems from '../../partials/content/OrderReviewItems';
import PickAndDropInfo from '../../partials/content/PickAndDropInfo';
import { ReactComponent as Basket } from '../../../_metronic/layout/assets/layout-svg-icons/shopping-cart.svg';
import Map from '../../partials/layout/Map';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { API_URL } from '../../store/services/config';
import defaultImage from '../../../_metronic/layout/assets/layout-svg-icons/no-image.png';
import { OrderActions } from '../../store/ducks/order-duck';
import clsx from 'clsx';

export default function OrderReview({ history }) {
    const dispatch = useDispatch();
    const basketItems = useSelector(store => store?.mybasket?.items);
    const driverInstruction = useSelector(store => store?.order?.currentOrder?.driverInstruction);
    const currentOrder = useSelector(store => store?.order?.currentOrder);
    const config = useSelector(store => store?.lov?.config);
    const isProgress = useSelector(store => store?.order?.isProgressPost);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalHST, setTotalHST] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    useEffect(() => {
        if (currentOrder.isEmpty) {
            history.replace('/pickanddrop');
        }
    }, [currentOrder, history]);

    const postOrder = useCallback(() => {
        let body = {
            orderDate: new Date().toISOString(),
            pickupDate: currentOrder.pickupDate.toISOString(),
            pickupTime: currentOrder.pickupTime,
            dropoffDate: currentOrder.dropoffDate.toISOString(),
            dropoffTime: currentOrder.dropoffTime,
            addressId: currentOrder.address?.id,
            deliveryAddress: currentOrder.address?.mainAddress,
            description: currentOrder.driverInstruction,
            taxPercentage: Number(config?.system?.HSTPercentage),
            // couponId: 0,
            // couponCode: 'string',
            // couponType: 'string',
            orderAmount: Number(totalAmount),
            discountAmount: 0,
            totalAmount: Number(grandTotal),
            // stripeToken: 'string',
            listDetail: Object.keys(basketItems).map((key) => ({
                serviceId: basketItems[key].id,
                quantity: basketItems[key].qty,
                unitPrice: basketItems[key].price,
                amount: basketItems[key].price * basketItems[key].qty,
            })),
        };
        dispatch(OrderActions.postOrder(body));
    }, [basketItems, currentOrder, totalAmount, grandTotal, config, dispatch]);


    const calculateTotal = useCallback((accumulator, key) => {
        let item = basketItems[key];
        let price = item.price;
        let qty = item.qty;
        let amount = price * qty;
        return accumulator + amount;
    }, [basketItems]);

    const calculateAmount = useCallback(() => {
        let amount = Object.keys(basketItems).reduce(calculateTotal, 0);
        amount = Math.abs(amount).toFixed(2);
        setTotalAmount(amount);
    }, [basketItems, calculateTotal]);

    const calculateHST = useCallback(() => {
        let hst = Math.abs(totalAmount * (13 / 100)).toFixed(2);
        setTotalHST(hst);
    }, [totalAmount]);

    const calculateGrandTotal = useCallback(() => {
        let grandTotal = Number(totalAmount) + Number(totalHST);
        grandTotal = Math.abs(grandTotal).toFixed(2);
        setGrandTotal(grandTotal);
    }, [totalAmount, totalHST]);

    useEffect(() => {
        calculateAmount();
        calculateHST();
        calculateGrandTotal();
    }, [basketItems, calculateAmount, calculateHST, calculateGrandTotal]);
    return (
        <>
            <h4 className="mb-3" >Order Review</h4>
            <div className="row">
                <div className="col-xl-6 col-md-6">
                    <div className="row row-full-height ">
                        <div className="col-md-12 ">
                            <Portlet className="">
                                <PortletBody>
                                    <div>
                                        {
                                            Object.keys(basketItems).map((v, i) => {
                                                return (<OrderReviewItems
                                                    key={i}
                                                    imageUrl={basketItems[v].image ? `${API_URL}/${basketItems[v].image}` : defaultImage}
                                                    title={basketItems[v].title}
                                                    qty={basketItems[v].qty}
                                                    price={basketItems[v].price}

                                                />);
                                            })
                                        }
                                        {/* <OrderReviewItems />
                                        <OrderReviewItems /> */}
                                    </div>
                                    <div>
                                        <PickAndDropInfo />
                                    </div>
                                    <div>
                                        <Row className="mt-3 border-bottom pb-3" >
                                            <Col className="driver-inst d-flex flex-column" >
                                                <label>Driver Instruction</label>
                                                <span className="" >{driverInstruction}</span>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div>
                                        <Row className=" border-bottom pb-3 pt-4" >
                                            <Col className=" d-flex justify-content-between align-items-center" >
                                                <h5>Payable Amount</h5>
                                                <h6 className="kt-font-primary font-weight-bold" >${grandTotal}</h6>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div>
                                        <Row className=" pb-3 pt-4" >
                                            <Col className=" d-flex  align-items-center" >
                                                <Basket style={{ width: '1rem', height: '1rem' }} />
                                                <Link to="/dashboard" className="ml-1 kt-font-primary" >Add More to Basket</Link>
                                            </Col>
                                            <Col className=" d-flex justify-content-between align-items-center" >
                                                <button onClick={postOrder} className={clsx('btn btn-block btn-primary-gradient btn-primary', isProgress && 'pr-0 kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light')}>Continue</button>

                                            </Col>
                                        </Row>
                                    </div>

                                </PortletBody>
                            </Portlet>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-md-6">
                    <div className="row row-full-height ">
                        <div className="col-md-12 ">
                            <Map height={'600px'} lat={Number(currentOrder?.address?.lat)} lng={Number(currentOrder?.address?.lng)} showMarker={true} />
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}