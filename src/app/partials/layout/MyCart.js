import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Dropdown } from "react-bootstrap";
import { toAbsoluteUrl } from "../../../_metronic";
import HeaderDropdownToggle from "../content/CustomDropdowns/HeaderDropdownToggle";
import { ReactComponent as CartNum3Icon } from "../../../_metronic/layout/assets/layout-svg-icons/shopping-cart.svg";
import { ReactComponent as CartNum4Icon } from "../../../_metronic/layout/assets/layout-svg-icons/shop-cart-color.svg";
import MyCartItem from "../content/MyCartItem";

const perfectScrollbarOptions = {
  wheelSpeed: 2,
  wheelPropagation: false
};

export default class MyCart extends React.Component {
  render() {
    const { bgImage, useSVG, icon, iconType } = this.props;

    return (
      <Dropdown className="kt-header__topbar-item" drop="down" alignRight>
        <Dropdown.Toggle as={HeaderDropdownToggle} id="dropdown-toggle-my-cart">
          <span
            className={clsx("kt-header__topbar-icon", {
              "kt-header__topbar-icon--brand": iconType === "brand"
            })}
          >
            {!useSVG && <i className={icon} />}

            {useSVG && (
              <span
                className={clsx("kt-svg-icon", {
                  "kt-svg-icon-brand": iconType === "brand"
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
                className="kt-mycart__head kt-head"
                style={{ backgroundImage: `url(${bgImage})` }}
              >
                <div className="">
                  <CartNum4Icon className=" kt-svg-icon--primary" />
                </div>
                <div className="kt-mycart__button">
                  <button type="button" className="btn btn-outline-light btn-sm">
                    2 Items
                  </button>
                </div>
              </div>

              <PerfectScrollbar
                options={perfectScrollbarOptions}
                style={{ maxHeight: "35vh", position: "relative" }}
              >
                <div className="kt-mycart__body">
                  <MyCartItem imageUrl={"https://i.ya-webdesign.com/images/clothes-model-png-2.png"} />
                  <MyCartItem imageUrl={"https://pluspng.com/img-png/men-clothes-png-mens-fashion-png-file-564.png"} />
                  <MyCartItem imageUrl={"https://pngimg.com/uploads/dress_shirt/dress_shirt_PNG8068.png"} />
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
                    <span>$ 840.00</span>
                    <span>$ 72.00</span>
                    <span className="kt-font-primary">$ 912.00</span>
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
}
