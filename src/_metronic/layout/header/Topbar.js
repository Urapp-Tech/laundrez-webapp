import React from "react";
import MyCart from "../../../app/partials/layout/MyCart";
import UserProfile from "../../../app/partials/layout/UserProfile";
import BgCart from "../assets/layout-svg-icons/bg-cart.svg"
export default class Topbar extends React.Component {
  render() {
    return (
      <div className="kt-header__topbar">
        {/* <SearchDropdown useSVG="true" /> */}

        {/* <UserNotifications
          bgImage={toAbsoluteUrl("/media/misc/bg-1.jpg")}
          pulse="true"
          pulseLight="false"
          skin="dark"
          iconType=""
          type="success"
          useSVG="true"
          dot="false"
        /> */}

        

        <MyCart
          iconType=""
          useSVG="true"
          bgImage={BgCart}
        />

          


          

        <UserProfile showAvatar={true} showHi={false} showBadge={false} />
      </div>
    );
  }
}
