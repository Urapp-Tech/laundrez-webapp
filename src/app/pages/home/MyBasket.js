import React, { useCallback, useState, useEffect } from 'react';
import { Portlet, PortletBody, PortletHeader, PortletHeaderTitle, PortletFooter } from '../../partials/content/Portlet';

import MyBasketItem from '../../partials/content/MyBasketItem';
import MyBasketFooter from '../../partials/content/MyBasketFooter';
import { useDispatch, useSelector } from 'react-redux';
import { MyBasketActions } from '../../store/ducks/mybasket-duck/actions';
import { API_URL } from '../../store/services/config';
import defaultImage from '../../../_metronic/layout/assets/layout-svg-icons/no-image.png';
import { OrderActions } from '../../store/ducks/order-duck';

export default function MyBasket({ history }) {

    const dispatch = useDispatch();
    const basketItems = useSelector(store => store?.mybasket?.items);
    const hstPercentage = useSelector(store => store?.lov?.config?.system?.HSTPercentage);

    const coupon = useSelector(store => store?.mybasket?.coupon);
    const [totalAmont, setTotalAmount] = useState(0);
    const [totalHST, setTotalHST] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);

    const incrementQty = useCallback((id) => {
        dispatch(MyBasketActions.incrementQty(id));
    }, [dispatch]);

    const decrementQty = useCallback((id) => {
        if (basketItems[id].qty > basketItems[id].minQty)
            dispatch(MyBasketActions.decrementQty(id));
    }, [dispatch, basketItems]);

    const removeFromBasket = useCallback((id) => {
        dispatch(MyBasketActions.removeFromBasket(id));
    }, [dispatch]);

    const calculateTotal = useCallback((accumulator, key) => {
        let item = basketItems[key];
        let price = item.price;
        let qty = item.qty;
        let amount = price * qty;
        return accumulator + amount;
    }, [basketItems]);

    const calculateDiscount = useCallback((totalAmount) => {
        let type = coupon?.offerType;
        let _totalAmount;
        if (type === 'Amount') {
            _totalAmount = totalAmount - coupon?.offerValue;
        }
        else if (type === 'Percentage') {
            _totalAmount = Math.abs(totalAmount - (totalAmount * (coupon?.offerValue / 100))).toFixed(2);
        }
        return _totalAmount;
    }, [coupon]);

    const calculateAmount = useCallback(() => {
        let amount = Object.keys(basketItems).reduce(calculateTotal, 0);
        amount = Math.abs(amount).toFixed(2);
        if (coupon) {
            amount = calculateDiscount(amount);
        }
        setTotalAmount(amount);
    }, [basketItems, calculateTotal, coupon, calculateDiscount]);

    const calculateHST = useCallback(() => {
        let hst = Math.abs(totalAmont * (hstPercentage / 100)).toFixed(2);
        setTotalHST(hst);
    }, [totalAmont, hstPercentage]);

    const calculateGrandTotal = useCallback(() => {
        let grandTotal = Number(totalAmont) + Number(totalHST);
        grandTotal = Math.abs(grandTotal).toFixed(2);
        setGrandTotal(grandTotal);
    }, [totalAmont, totalHST]);

    useEffect(() => {
        calculateAmount();
        calculateHST();
        calculateGrandTotal();
    }, [basketItems, calculateAmount, calculateHST, calculateGrandTotal, coupon]);

    const onClickPlaceOrder = useCallback(() => {
        dispatch(OrderActions.orderStart());
        history.push('/pickanddrop');
    }, [dispatch, history]);

    return (
        <>
            <h4 className="mb-3" >My Basket</h4>
            <div className="row">
                <div className="col-xl-8 col-md-8">
                    <div className="row row-full-height ">
                        <div className="col-md-12 ">
                            <Portlet className="">
                                <PortletHeader className="w-100"
                                    title={
                                        <div className="w-100 d-flex justify-content-between">
                                            <PortletHeaderTitle className="" ></PortletHeaderTitle>
                                            <PortletHeaderTitle className="w-50  d-flex justify-content-center ml-3" >Products</PortletHeaderTitle>
                                            <PortletHeaderTitle className="w-50 d-flex justify-content-center ml-3" >Price</PortletHeaderTitle>
                                            <PortletHeaderTitle className="w-50 d-flex justify-content-center" >Quantity</PortletHeaderTitle>
                                            <PortletHeaderTitle className="w-50 d-flex justify-content-center" >Subtotal</PortletHeaderTitle>
                                        </div>
                                    }
                                >

                                </PortletHeader>
                                <PortletBody className="" >

                                    {
                                        Object.keys(basketItems).map((v, i) => {
                                            return (<MyBasketItem
                                                key={i}
                                                imageUrl={basketItems[v].image ? `${API_URL}/${basketItems[v].image}` : defaultImage}
                                                title={basketItems[v].title}
                                                qty={basketItems[v].qty}
                                                price={basketItems[v].price}
                                                incrementQty={() => incrementQty(basketItems[v].id)}
                                                decrementQty={() => decrementQty(basketItems[v].id)}
                                                removeFromBasket={() => removeFromBasket(basketItems[v].id)}
                                            />);
                                        })
                                    }
                                    {
                                        Object.keys(basketItems).length === 0
                                            ?
                                            <h6 className="text-center" > No items in the basket </h6>
                                            : null
                                    }
                                </PortletBody>
                                <PortletFooter className="mybasket-footer d-flex justify-content-between border-0" >
                                    <MyBasketFooter />
                                </PortletFooter>
                            </Portlet>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-md-4">
                    <div className="row row-full-height  ">
                        <div className="col-md-12 ">
                            <Portlet className="">
                                <PortletHeader title={'Total Amount'}>
                                </PortletHeader>
                                <PortletBody className="mybasket-billing" >
                                    <div className="amounts-container " >
                                        <div className="d-flex justify-content-between">
                                            <span className="amount-text" >Total Amount</span>
                                            <span className=" amount-num font-weight-bold"  >${totalAmont}</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span className="amount-text" >Discount </span>
                                            {/* <span className="amount-num font-weight-bold" >$0.00</span> */}
                                            {coupon ?
                                                <span className="amount-num font-weight-bold" >{coupon?.offerType === 'Amount' ? `$${coupon?.offerValue}` : `${coupon?.offerValue}%`} </span>
                                                :
                                                <span className="amount-num font-weight-bold" >$0.00</span>
                                            }
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span className="amount-text" >HST {hstPercentage}%</span>
                                            <span className="amount-num font-weight-bold" >${totalHST}</span>
                                        </div>

                                    </div>
                                    <div className="d-flex justify-content-between mt-3" >
                                        <h4>Grand Total</h4>
                                        <h4 className=" font-weight-bold kt-font-primary" >${grandTotal}</h4>
                                    </div>
                                    <button onClick={onClickPlaceOrder} className="btn btn-block btn-primary-gradient btn-primary">Place Order</button>
                                </PortletBody>
                            </Portlet>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}