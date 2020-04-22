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
  const basketItems = useSelector(store => store?.mybasket?.items);

  const [totalAmont, setTotalAmount] = useState(0);
  const [totalHST, setTotalHST] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);


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

  const calculateAmount = useCallback(() => {
    let amount = Object.keys(basketItems).reduce(calculateTotal, 0);
    amount = Math.abs(amount).toFixed(2);
    setTotalAmount(amount);
  }, [basketItems, calculateTotal]);


  const calculateHST = useCallback(() => {
    let hst = Math.abs(totalAmont * (13 / 100)).toFixed(2);
    setTotalHST(hst);
  }, [totalAmont]);


  const calculateGrandTotal = useCallback(() => {
    let grandTotal = Number(totalAmont) + Number(totalHST);
    grandTotal = Math.abs(grandTotal).toFixed(2);
    setGrandTotal(grandTotal);
  }, [totalAmont, totalHST]);

  useEffect(() => {
    calculateAmount();
    calculateHST();
    calculateGrandTotal();
  }, [basketItems, calculateAmount, calculateHST, calculateGrandTotal]);




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
                <Link to="/mybasket" className="btn btn-outline-light btn-sm">
                  {Object.keys(basketItems).length} Items
                  </Link>
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
                  <span>HST 13%</span>
                  <span>Grand Total</span>
                </div>

                <div className="kt-mycart__prices">
                  <span>$ {totalAmont}</span>
                  <span>$ {totalHST}</span>
                  <span className="kt-font-primary">$ {grandTotal}</span>
                </div>
              </div>
              <div className="kt-mycart__button kt-align-right">
                <button type="button" className=" btn-block btn-primary-gradient btn btn-primary">
                  Place Order
                  </button>
              </div>
            </div>
          </div>
        </form>
      </Dropdown.Menu>
    </Dropdown>
  );
}

