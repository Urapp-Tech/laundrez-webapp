import React from 'react';

export default function MyBasketItem() {
    return (
        <div className="mybasket-item w-100 d-flex  " >
            <button type="button" class="close"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
            <div className="product d-flex justify-content-center align-items-center">
                <div className="product-image" >
                    <img
                        src={'https://i.ya-webdesign.com/images/clothes-model-png-2.png'}
                        alt="product"
                    />
                </div>
                <div className="ml-2 font-weight-bold"  >wash & fold</div>
            </div>
            <div className=" price d-flex justify-content-center  align-items-center" >$50.00</div>
            <div className=" quantity d-flex justify-content-center  justify-content-between align-items-center" >

                <img className="ml-3" alt="img" src={require('../../../_metronic/layout/assets/layout-svg-icons/plus.svg')} />

                <span className="kt-font-info font-weight-bold">1</span>

                <img className="mr-3" alt="img" src={require('../../../_metronic/layout/assets/layout-svg-icons/minus.svg')} />

            </div>
            <div className="sub-total d-flex justify-content-center align-items-center kt-font-primary font-weight-bold" >$150.00</div>
        </div>
    );
}