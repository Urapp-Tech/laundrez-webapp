import React from 'react';
import { Link } from 'react-router-dom';


export default function MyCartItem({imageUrl}) {
    return (
        <div className="kt-mycart__item">
            <div className="kt-mycart__container">
                <div className="d-flex align-items-center" >
                    <Link to="cart-item" className="kt-mycart__pic">
                        <img
                            src={imageUrl}
                            alt="product"
                        />
                    </Link>
                    <div className="kt-mycart__info">
                        <Link to="cart-item" className="kt-mycart__title">
                            Wash & Fold 15Lbs
                        </Link>
                        <span className="kt-mycart__desc">
                            Profile info, Timeline etc
      </span>

                        <div className="kt-mycart__action">
                            <span className="kt-mycart__price kt-font-primary">$ 450</span>
                        </div>
                    </div>

                </div>
                <div className="  d-flex flex-column justify-content-between align-items-center" >

                    <img alt="img" src={require('../../../_metronic/layout/assets/layout-svg-icons/plus.svg')} />

                    <span className="kt-font-info font-weight-bold">1</span>

                    <img alt="img" src={require('../../../_metronic/layout/assets/layout-svg-icons/minus.svg')} />

                </div>
            </div>
        </div>
    );
}