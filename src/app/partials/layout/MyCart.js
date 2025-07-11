import React, { useCallback, useState, useEffect } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Dropdown } from 'react-bootstrap';
import HeaderDropdownToggle from '../content/CustomDropdowns/HeaderDropdownToggle';
import { ReactComponent as CartNum3Icon } from '../../../_metronic/layout/assets/layout-svg-icons/shopping-cart.svg';
import { ReactComponent as CartNum4Icon } from '../../../_metronic/layout/assets/layout-svg-icons/shop-cart-color.svg';
import MyCartItem from '../content/MyCartItem';
import { useSelector, useDispatch } from 'react-redux';
import { API_URL } from '../../store/services/config';
import defaultImage from '../../../_metronic/layout/assets/layout-svg-icons/no-image.png';
import { MyBasketActions } from '../../store/ducks/mybasket-duck/actions';

const perfectScrollbarOptions = {
  wheelSpeed: 2,
  wheelPropagation: false
};

export default function MyCart({ bgImage, useSVG, icon, iconType }) {

  const dispatch = useDispatch();
  const hstPercentage = useSelector(store => store?.lov?.config?.system?.HSTPercentage);
  const basketItems = useSelector(store => store?.mybasket?.items);


  const useReferral = useSelector(store => store?.mybasket?.coupon?.useReferral);
  const referralCoupon = useSelector(store => store?.mybasket?.coupon?.referral);
  const promoCoupon = useSelector(store => store?.mybasket?.coupon?.promo);

  const [totalAmount, setTotalAmount] = useState(0);
  const [totalHST, setTotalHST] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [coupon, setCoupon] = useState(null);

  const incrementQty = useCallback((id) => {
    dispatch(MyBasketActions.incrementQty(id));
  }, [dispatch]);

  const decrementQty = useCallback((id) => {
    if (basketItems[id].qty > basketItems[id].minQty)
      dispatch(MyBasketActions.decrementQty(id));
  }, [dispatch, basketItems]);

  const calculateTotal = useCallback((accumulator, key) => {
    let item = basketItems[key];
    let price = item.price;
    let qty = item.qty;
    let amount = price * qty;
    return accumulator + amount;
  }, [basketItems]);

  const calculateDiscount = useCallback((totalAmount) => {
    let coupon = useReferral ? referralCoupon : promoCoupon;
    let type = coupon?.offerType;
    let _totalAmount;
    if (type === 'Amount') {
      _totalAmount = totalAmount - coupon?.offerValue;
    }
    else if (type === 'Percentage') {
      _totalAmount = Math.abs(totalAmount - (totalAmount * (coupon?.offerValue / 100))).toFixed(2);
    }
    return _totalAmount;
  }, [referralCoupon, promoCoupon, useReferral]);

  const calculateAmount = useCallback(() => {
    let amount = Object.keys(basketItems).reduce(calculateTotal, 0);
    amount = Math.abs(amount).toFixed(2);
    if ((referralCoupon && useReferral) || promoCoupon) {
      amount = calculateDiscount(amount);
    }
    setTotalAmount(amount);
  }, [basketItems, calculateTotal, referralCoupon, useReferral, promoCoupon, calculateDiscount]);




  const calculateHST = useCallback(() => {
    let hst = Math.abs(totalAmount * (hstPercentage / 100)).toFixed(2);
    setTotalHST(hst);
  }, [totalAmount, hstPercentage]);


  const calculateGrandTotal = useCallback(() => {
    let grandTotal = Number(totalAmount) + Number(totalHST);
    grandTotal = Math.abs(grandTotal).toFixed(2);
    setGrandTotal(grandTotal);
  }, [totalAmount, totalHST]);

  useEffect(() => {
    calculateAmount();
    calculateHST();
    calculateGrandTotal();
    let coupon = null;
    if (((referralCoupon && useReferral) || promoCoupon)) {
      coupon = useReferral ? referralCoupon : promoCoupon;
      setCoupon(coupon);
    }
    else {
      setCoupon(coupon);
    }
  }, [basketItems, calculateAmount, calculateHST, calculateGrandTotal, referralCoupon, useReferral, promoCoupon]);






  return (
    <Dropdown className="kt-header__topbar-item" drop="down" alignRight>
      <Dropdown.Toggle as={HeaderDropdownToggle} id="dropdown-toggle-my-cart">
        {Object.keys(basketItems).length === 0 ? null : <span className="notify-bubble">{Object.keys(basketItems).length}</span>}
        <span
          className={clsx('kt-header__topbar-icon', {
            'kt-header__topbar-icon--brand': iconType === 'brand'
          })}
        >
          {!useSVG && <i className={icon} />}

          {useSVG && (
            <span
              className={clsx('kt-svg-icon', {
                'kt-svg-icon-brand': iconType === 'brand'
              })}
            >
              <CartNum3Icon className="kt-svg-icon kt-svg-icon--primary" />
            </span>
          )}
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl">
        <form className="flex-column p-0">
          <div className="kt-mycart">
            <div
              className="kt-mycart__head kt-head  "
              style={{ backgroundImage: `url(${bgImage})` }}
            >
              <div className="">
                <CartNum4Icon className=" kt-svg-icon--primary" />
              </div>
              <div className="kt-mycart__button">
                <span className="btn btn-outline-light btn-sm">
                  {Object.keys(basketItems).length} Items
                  </span>
              </div>
            </div>

            <PerfectScrollbar
              options={perfectScrollbarOptions}
              style={{ maxHeight: '35vh', position: 'relative' }}
            >
              <div className="kt-mycart__body">
                {
                  Object.keys(basketItems).map((v, i) => {
                    return (<MyCartItem
                      key={i}
                      imageUrl={basketItems[v].image ? `${API_URL}/${basketItems[v].image}` : defaultImage}
                      title={basketItems[v].title}
                      qty={basketItems[v].qty}
                      price={basketItems[v].price}
                      categoryTitle={basketItems[v]?.category?.title}
                      incrementQty={() => incrementQty(basketItems[v].id)}
                      decrementQty={() => decrementQty(basketItems[v].id)}
                    />);
                  })
                }

                {
                  Object.keys(basketItems).length === 0
                    ?
                    <h6 className="text-center" > No items in the basket </h6>
                    : null
                }


              </div>
            </PerfectScrollbar>

            <div className="kt-mycart__footer">
              <div className="kt-mycart__section">
                <div className="kt-mycart__subtitel">
                  <span>Total Amount</span>
                  <span>Discount</span>
                  <span>HST {hstPercentage}%</span>
                  <span>Grand Total</span>
                </div>

                <div className="kt-mycart__prices">
                  <span>$ {totalAmount}</span>
                  {coupon ?
                    <span>{coupon?.offerType === 'Amount' ? `$${coupon?.offerValue}` : `${coupon?.offerValue}%`}</span>
                    :
                    <span>$ 0.00</span>
                  }
                  <span>$ {totalHST}</span>
                  <span className="kt-font-primary">$ {grandTotal}</span>
                </div>
              </div>
              <div className="kt-mycart__button kt-align-right">
                <Dropdown.Item as={Link} to="/mybasket" className=" btn-block btn-primary-gradient btn btn-primary" id="place-order-item"   >
                  Place Order
                </Dropdown.Item>
              </div>
            </div>
          </div>
        </form>
      </Dropdown.Menu>
    </Dropdown>
  );
}

