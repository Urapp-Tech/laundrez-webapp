import React from 'react';

export default function MyBasketItem({ imageUrl, title, qty, price, incrementQty, decrementQty, removeFromBasket }) {
    return (
        <div className="mybasket-item w-100 d-flex  " >
            <button type="button" onClick={removeFromBasket} className="close"><span aria-hidden="true">×</span><span className="sr-only">Close</span></button>
            <div className="product d-flex justify-content-center align-items-center">
                <div className="product-image" >
                    <img
                        src={imageUrl}
                        alt="product"
                    />
                </div>
                <div className="ml-2 font-weight-bold w-25 "  >{title}</div>
            </div>
            <div className=" price d-flex justify-content-center  align-items-center" >${price}</div>
            <div className=" quantity d-flex justify-content-center  justify-content-between align-items-center" >

                <img className="ml-3 cursor-pointer " alt="img" onClick={incrementQty} src={require('../../../_metronic/layout/assets/layout-svg-icons/plus.svg')} />

                <span className="kt-font-info font-weight-bold">{qty}</span>

                <img className="mr-3 cursor-pointer " alt="img" onClick={decrementQty} src={require('../../../_metronic/layout/assets/layout-svg-icons/minus.svg')} />

            </div>
            <div className="sub-total d-flex justify-content-center align-items-center kt-font-primary font-weight-bold" >${Math.abs(qty * price).toFixed(2)}</div>
        </div>
    );
}