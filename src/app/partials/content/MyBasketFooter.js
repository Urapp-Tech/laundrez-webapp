import React, { useState, useEffect } from 'react';
import { InputGroup, FormControl, Form } from 'react-bootstrap';
import { ReactComponent as Basket } from '../../../_metronic/layout/assets/layout-svg-icons/shopping-cart.svg';
import { ReactComponent as Coupon } from '../../../_metronic/layout/assets/layout-svg-icons/coupon.svg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MyBasketActions } from '../../store/ducks/mybasket-duck/actions';
export default function MyBasketFooter() {

    const dispatch = useDispatch();
    const isProgressCoupon = useSelector(store => store?.mybasket?.isProgress);
    const coupon = useSelector(store => store?.mybasket?.coupon);
    const [formValues, setFormValues] = useState({
        promoCode: '',
        useReferral: false
    });
    const [typedPromo, setTypedPromo] = useState(false);

    useEffect(() => {
        if (formValues.promoCode) {
            setTypedPromo(true);
            dispatch(MyBasketActions.validateCoupon(formValues.promoCode));
        }
        else if (typedPromo && !formValues.promoCode){

            dispatch(MyBasketActions.clearCoupon());
        }
    }, [formValues.promoCode, dispatch, typedPromo]);

    useEffect(() => {
        if (coupon?.code) {
            setFormValues({
                promoCode: coupon?.code,
                useReferral: false
            });
        }
    }, [coupon]);

    return (
        <>
            <div className="promo-container ">
                <div className="w-100 d-flex align-items-center" >
                    <span className="mb-3 mr-2 " > Add Promo Code </span>
                    <InputGroup className="mb-3 promo-input">
                        <InputGroup.Prepend>
                            <InputGroup.Text className="bg-transparent" id="inputGroup-sizing-sm">
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
                            disabled={formValues.useReferral}
                            aria-label="Small"
                            placeholder="Enter Promo Code"
                            className="border-left-0 border"
                            aria-describedby="inputGroup-sizing-sm"
                            value={formValues.promoCode}
                            onChange={(e) => setFormValues({ ...formValues, promoCode: e.target.value })}
                        />
                    </InputGroup>
                </div>
                <Form.Check
                    className="check-primary-addrs"
                    inline
                    label="Use Referral Code"
                    id={'use-referral'}
                    value={formValues.useReferral}
                    checked={formValues.useReferral}
                    onChange={() => setFormValues({ ...formValues, useReferral: !formValues.useReferral })}
                />
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