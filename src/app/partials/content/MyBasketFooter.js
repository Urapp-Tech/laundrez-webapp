import React, { useState } from 'react';
import { InputGroup, FormControl, Form } from 'react-bootstrap';
import { ReactComponent as Basket } from '../../../_metronic/layout/assets/layout-svg-icons/shopping-cart.svg';
import { ReactComponent as Coupon } from '../../../_metronic/layout/assets/layout-svg-icons/coupon.svg';
import { Link } from 'react-router-dom';
export default function MyBasketFooter() {
    const [formValues, setFormValues] = useState({
        promoCode: '',
        useReferral: false
    });
    return (
        <>
            <div className="promo-container ">
                <div className="w-100 d-flex align-items-center" >
                    <span className="mb-3 mr-2 " > Add Promo Code </span>
                    <InputGroup className="mb-3 promo-input">
                        <InputGroup.Prepend>
                            <InputGroup.Text className="bg-transparent" id="inputGroup-sizing-sm"><Coupon /></InputGroup.Text>
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