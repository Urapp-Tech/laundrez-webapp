import React from 'react';
import { Portlet, PortletBody, PortletHeader, PortletHeaderTitle, PortletFooter } from '../../partials/content/Portlet';

import MyBasketItem from '../../partials/content/MyBasketItem';
import MyBasketFooter from '../../partials/content/MyBasketFooter';
export default function MyBasket({ history }) {
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
                                            <PortletHeaderTitle className="w-50  d-flex justify-content-center" >Products</PortletHeaderTitle>
                                            <PortletHeaderTitle className="w-50 d-flex justify-content-center" >Price</PortletHeaderTitle>
                                            <PortletHeaderTitle className="w-50 d-flex justify-content-center" >Quantity</PortletHeaderTitle>
                                            <PortletHeaderTitle className="w-50 d-flex justify-content-center" >Subtotal</PortletHeaderTitle>
                                        </div>
                                    }
                                >

                                </PortletHeader>
                                <PortletBody className="" >
                                    <MyBasketItem />
                                </PortletBody>
                                <PortletFooter className="mybasket-footer d-flex     justify-content-between border-0" >
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
                                            <span className=" amount-num font-weight-bold"  >$400</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span className="amount-text" >HST 13%</span>
                                            <span className="amount-num font-weight-bold" >$31.20</span>
                                        </div>

                                    </div>
                                    <div className="d-flex justify-content-between mt-3" >
                                        <h4>Grand Total</h4>
                                        <h4 className=" font-weight-bold kt-font-primary" >$431.20</h4>
                                    </div>
                                    <button onClick={() => history.push('/deliveryaddress')} className="btn btn-block btn-primary-gradient btn-primary">Place Order</button>
                                </PortletBody>
                            </Portlet>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}