import React, { useState, useEffect, useCallback } from 'react';
import { InputGroup, FormControl, Form } from 'react-bootstrap';
import { ReactComponent as Basket } from '../../../_metronic/layout/assets/layout-svg-icons/shopping-cart.svg';
import { ReactComponent as Coupon } from '../../../_metronic/layout/assets/layout-svg-icons/coupon.svg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MyBasketActions } from '../../store/ducks/mybasket-duck/actions';
export default function MyBasketFooter() {

    const dispatch = useDispatch();
    const isProgressCoupon = useSelector(store => store?.mybasket?.isProgress);
    const useReferral = useSelector(store => store?.mybasket?.coupon?.useReferral);
    const referralCoupon = useSelector(store => store?.mybasket?.coupon?.referral);
    const promoCoupon = useSelector(store => store?.mybasket?.coupon?.promo);
    const promoError = useSelector(store => store?.mybasket?.isError);
    const promoMessage = useSelector(store => store?.mybasket?.errorMsg);
    const myBasketItems = useSelector(store => store?.mybasket?.items);
    const [qtyErrRefCoupon, setQtyErrRefCoupon] = useState({ error: false, message: '' });
    const [formValues, setFormValues] = useState({
        promoCode: '',
    });
    const [typedPromo, setTypedPromo] = useState(false);
    const calculateTotalItems = useCallback((accumulator, key) => {
        let item = myBasketItems[key];
        let qty = item.qty;
        return accumulator + qty;
    }, [myBasketItems]);
    const calculateAmount = useCallback((accumulator, key) => {
        let item = myBasketItems[key];
        let price = item.price;
        let qty = item.qty;
        let amount = price * qty;
        return accumulator + amount;
    }, [myBasketItems]);

    useEffect(() => {
        if (formValues.promoCode.length > 3) {
            setTypedPromo(true);
            let body = {
                couponCode: formValues.promoCode,
                amount: Object.keys(myBasketItems).reduce(calculateAmount, 0),
                quantity: Object.keys(myBasketItems).reduce(calculateTotalItems, 0)
            };

            dispatch(MyBasketActions.validatePromoCoupon(body));
        }
        else if (typedPromo && !formValues.promoCode) {

            dispatch(MyBasketActions.clearPromoCoupon());
        }
    }, [formValues.promoCode, dispatch, typedPromo, myBasketItems, calculateAmount, calculateTotalItems]);

    useEffect(() => {
        if (promoCoupon?.code) {
            setFormValues({
                promoCode: promoCoupon?.code,
            });
        }
    }, [promoCoupon]);

    useEffect(() => {
        let quantity = Object.keys(myBasketItems).reduce(calculateTotalItems, 0);
        let amount = Object.keys(myBasketItems).reduce(calculateAmount, 0);
        if (quantity < referralCoupon?.minProduct && amount < referralCoupon?.minAmount) {
            setQtyErrRefCoupon({ error: true, message: `Min number of items for referral coupon is ${referralCoupon?.minProduct} and min amount is ${referralCoupon?.minAmount}` });
        }
        else if (amount < referralCoupon?.minAmount) {
            setQtyErrRefCoupon({ error: true, message: `Min amount for referral coupon is ${referralCoupon?.minAmount}` });
        }
        else if (quantity < referralCoupon?.minProduct) {
            setQtyErrRefCoupon({ error: true, message: `Min number of items for referral coupon is  ${referralCoupon?.minProduct}` });
        }
        else {
            setQtyErrRefCoupon({ error: false, message: '' });
        }

    }, [referralCoupon, calculateTotalItems, myBasketItems, calculateAmount]);

    return (
        <>
            <div className="promo-container ">
                <div className="d-flex flex-column" >
                    <div className="w-100 d-flex align-items-center" >
                        <span className="mb-3 mr-2 d-block" > Add Promo Code </span>
                        <InputGroup className="mb-3 promo-input">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-sm">
                                    {
                                        isProgressCoupon ?
                                            <div className="kt-spinner  kt-spinner--md kt-spinner--center kt-spinner--primary" >
                                            </div>
                                            :
                                            <Coupon />
                                    }
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                disabled={useReferral}
                                aria-label="Small"
                                placeholder="Enter Promo Code"
                                className="border-left-0 border"
                                aria-describedby="inputGroup-sizing-sm"
                                value={formValues.promoCode}
                                onChange={(e) => setFormValues({ ...formValues, promoCode: e.target.value })}
                            />
                        </InputGroup>
                    </div>
                    {(promoError) && <label className="text-danger d-block" > {promoMessage} </label>}
                </div>
                {referralCoupon && <> <Form.Check
                    className="check-primary-addrs"
                    inline
                    label="Use Referral Code"
                    id={'use-referral'}
                    value={useReferral}
                    checked={useReferral}
                    disabled={qtyErrRefCoupon.error}
                    onChange={() => dispatch(MyBasketActions.useReferral())}
                />
                    {(qtyErrRefCoupon.error) && <label className="text-danger d-block" > {qtyErrRefCoupon.message} </label>}
                </>
                }
            </div>
            <div className="d-flex add-more-container " >
                <>
                    <Basket className="image-basket" />
                    <Link to="/dashboard" className="text kt-font-primary" >Add More to Basket</Link>
                </>
            </div>
        </>
    );
}