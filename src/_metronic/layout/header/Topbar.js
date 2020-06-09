import React from 'react';
import MyCart from '../../../app/partials/layout/MyCart';
import UserProfile from '../../../app/partials/layout/UserProfile';
import BgCart from '../assets/layout-svg-icons/bg-cart.svg';
export default class Topbar extends React.Component {
  render() {
    const { isProfileCompleted } = this.props;
    return (
      <div className="kt-header__topbar">



        {isProfileCompleted && <MyCart
          iconType=""
          useSVG="true"
          bgImage={BgCart}
        />}






        <UserProfile showAvatar={true} showHi={false} showBadge={false} />
      </div>
    );
  }
}
