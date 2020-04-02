import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import { ReactComponent as Basket } from '../../../_metronic/layout/assets/layout-svg-icons/shopping-cart.svg';
import { ReactComponent as Coupon } from '../../../_metronic/layout/assets/layout-svg-icons/coupon.svg';
export default function MyBasketFooter() {
    return (
        <>
            <div className="promo-container w-100 d-flex align-items-center">
                <span className="mb-3 mr-2 " > Add Promo Code </span>
                <InputGroup className="mb-3 promo-input">
                    <InputGroup.Prepend>
                        <InputGroup.Text className="bg-transparent" id="inputGroup-sizing-sm"><Coupon /></InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl aria-label="Small" placeholder="Enter Promo Code" className="border-left-0 border" aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>
            </div>
            <div className="d-flex add-more-container " >
                <Basket className="image-basket" />
                <span className="text kt-font-primary" >Add More to Basket</span>
            </div>
        </>
    );
}