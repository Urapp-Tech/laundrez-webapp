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
import moment from 'moment';

export default function OrderReview({ history }) {
    const dispatch = useDispatch();
    const basketItems = useSelector(store => store?.mybasket?.items);
    const driverInstruction = useSelector(store => store?.order?.currentOrder?.driverInstruction);
    const currentOrder = useSelector(store => store?.order?.currentOrder);
    const order = useSelector(store => store?.order?.order);
    const config = useSelector(store => store?.lov?.config);
    const useReferral = useSelector(store => store?.mybasket?.coupon?.useReferral);
    const referralCoupon = useSelector(store => store?.mybasket?.coupon?.referral);
    const promoCoupon = useSelector(store => store?.mybasket?.coupon?.promo);
    const isProgress = useSelector(store => store?.order?.isProgressPost);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalHST, setTotalHST] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);
    useEffect(() => {
        if (!currentOrder.start) {
            history.replace('/mybasket');
        }
    }, [currentOrder, history]);

    const postOrder = useCallback(() => {

        var deliveryAddress = '';
        if(currentOrder.address?.suite) {
            deliveryAddress = currentOrder.address?.suite + ', ';
        }
        if(currentOrder.address?.street) {
            deliveryAddress = deliveryAddress + currentOrder.address?.street + ', ';
        }
        deliveryAddress = deliveryAddress + currentOrder.address?.mainAddress;

        let body = {
            orderDate: moment(new Date()).format('YYYY-MM-DD') + 'T00:00:00.000Z',
            pickupDate: moment(currentOrder.pickupDate).format('YYYY-MM-DD') + 'T00:00:00.000Z',
            pickupTime: currentOrder.pickupTime,
            dropoffDate: moment(currentOrder.dropoffDate).format('YYYY-MM-DD') + 'T00:00:00.000Z',
            dropoffTime: currentOrder.dropoffTime,
            addressId: currentOrder.address?.id,
            deliveryAddress: deliveryAddress,
            description: currentOrder.driverInstruction,
            taxPercentage: Number(config?.system?.HSTPercentage),
            orderAmount: Number(totalAmount),
            discountAmount: Number(discountAmount),
            totalAmount: Number(grandTotal),
            listDetail: Object.keys(basketItems).map((key) => ({
                serviceId: basketItems[key].id,
                quantity: basketItems[key].qty,
                unitPrice: basketItems[key].price,
                amount: basketItems[key].price * basketItems[key].qty,
            })),
        };
        if (referralCoupon && useReferral) {
            body['couponId'] = referralCoupon?.id;
            body['couponCode'] = referralCoupon?.code;
            body['couponType'] = referralCoupon?.couponType;
        }
        else if (promoCoupon) {
            body['couponId'] = promoCoupon?.id;
            body['couponCode'] = promoCoupon?.code;
            body['couponType'] = promoCoupon?.couponType;
        }
        if (!order?.id) {
            dispatch(OrderActions.postOrder(body));
        } else {
            body['id'] = order?.id;
            body['orderNumber'] = order?.orderNumber;
            dispatch(OrderActions.updateOrder(body));
        }
    }, [basketItems, currentOrder, totalAmount, grandTotal, config, dispatch, referralCoupon, promoCoupon, useReferral, discountAmount, order]);


    const calculateTotal = useCallback((accumulator, key) => {
        let item = basketItems[key];
        let price = item.price;
        let qty = item.qty;
        let amount = price * qty;
        return accumulator + amount;
    }, [basketItems]);

    const calculateDiscount = useCallback((totalAmount) => {
        let coupon = useReferral ? referralCoupon : promoCoupon;
        let type = coupon?.offerType;
        let _totalAmount;
        let _discountAmount = 0;
        if (type === 'Amount') {
            _discountAmount = coupon?.offerValue;
            _totalAmount = totalAmount - _discountAmount;
        }
        else if (type === 'Percentage') {
            _discountAmount = Math.abs(totalAmount * (coupon?.offerValue / 100)).toFixed(2);
            _totalAmount = Math.abs(totalAmount - _discountAmount).toFixed(2);
        }
        setDiscountAmount(_discountAmount);
        return _totalAmount;
    }, [referralCoupon, promoCoupon, useReferral]);

    const calculateAmount = useCallback(() => {
        let amount = Object.keys(basketItems).reduce(calculateTotal, 0);
        amount = Math.abs(amount).toFixed(2);
        if ((referralCoupon && useReferral) || promoCoupon) {
            amount = calculateDiscount(amount);
        }
        setTotalAmount(amount);
    }, [basketItems, calculateTotal, referralCoupon, useReferral, promoCoupon, calculateDiscount]);

    const calculateHST = useCallback(() => {
        let hst = Math.abs(totalAmount * (config?.system?.HSTPercentage / 100)).toFixed(2);
        setTotalHST(hst);
    }, [totalAmount, config]);

    const calculateGrandTotal = useCallback(() => {
        let grandTotal = Number(totalAmount) + Number(totalHST);
        grandTotal = Math.abs(grandTotal).toFixed(2);
        setGrandTotal(grandTotal);
    }, [totalAmount, totalHST]);

    useEffect(() => {
        calculateAmount();
        calculateHST();
        calculateGrandTotal();
        // let coupon = null;
        // if (((referralCoupon && useReferral) || promoCoupon)) {
        //     coupon = useReferral ? referralCoupon : promoCoupon;
        //     setCoupon(coupon);
        // }
        // else {
        //     setCoupon(coupon);
        // }
    }, [basketItems, calculateAmount, calculateHST, calculateGrandTotal, referralCoupon, useReferral, promoCoupon]);
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
                                        <PickAndDropInfo
                                            pickupDate={moment(currentOrder?.pickupDate).format('ddd, Do MMM YYYY')}
                                            pickupTime={currentOrder?.pickupTime}
                                            dropoffDate={moment(currentOrder?.dropoffDate).format('ddd, Do MMM YYYY')}
                                            dropoffTime={currentOrder?.dropoffTime}
                                            address={currentOrder?.address}
                                        />
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