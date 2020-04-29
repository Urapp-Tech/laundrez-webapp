import React from 'react';



export default function MyCartItem({ imageUrl, title, qty, price, incrementQty, decrementQty, categoryTitle }) {
    return (
        <div className="kt-mycart__item">
            <div className="kt-mycart__container">
                <div className="d-flex align-items-center" >
                    <div to="cart-item" className="kt-mycart__pic">
                        <img
                            src={imageUrl}
                            alt="product"
                        />
                    </div>
                    <div className="kt-mycart__info">
                        <div to="cart-item" className="kt-mycart__title">
                            {title}
                        </div>
                        <span className="kt-mycart__desc">
                            {categoryTitle}
                        </span>

                        <div className="kt-mycart__action">
                            <span className="kt-mycart__price kt-font-primary">$ {price}</span>
                        </div>
                    </div>

                </div>
                <div className="  d-flex flex-column justify-content-between align-items-center" >

                    <img alt="img" onClick={incrementQty} className="cursor-pointer" src={require('../../../_metronic/layout/assets/layout-svg-icons/plus.svg')} />

                    <span className="kt-font-info font-weight-bold">{qty}</span>

                    <img alt="img" onClick={decrementQty} className="cursor-pointer" src={require('../../../_metronic/layout/assets/layout-svg-icons/minus.svg')} />

                </div>
            </div>
        </div>
    );
}