import React from "react";
import { connect } from "react-redux";
import * as builder from "../../ducks/builder";
import Brand from "../brand/Brand";
import PerfectScrollbar from "react-perfect-scrollbar";
import Menu from "./Menu";
import KTOffcanvas from "../../_assets/js/offcanvas";
import FbImage from "../assets/layout-svg-icons/facebook.svg";
import WhatsappImage from "../assets/layout-svg-icons/whatsapp.svg";
import TwitterImage from "../assets/layout-svg-icons/twitter-sign.svg";
import EmailImage from "../assets/layout-svg-icons/black-envelope.svg";
import PowerImage from "../assets/layout-svg-icons/power.svg";

class AsideLeft extends React.Component {
  asideOffCanvasRef = React.createRef();

  componentDidMount() {
    // eslint-disable-next-line
    const ktoffConvas = new KTOffcanvas(
      this.asideOffCanvasRef.current,
      this.props.menuCanvasOptions
    );
  }

  render() {
    return (
      <>
        <button className="kt-aside-close" id="kt_aside_close_btn">
          <i className="la la-close" />
        </button>
        <div
          id="kt_aside"
          ref={this.asideOffCanvasRef}
          className={`kt-aside ${this.props.asideClassesFromConfig} kt-grid__item kt-grid kt-grid--desktop kt-grid--hor-desktop`}
        >
          <Brand />
          <div
            id="kt_aside_menu_wrapper"
            className="kt-aside-menu-wrapper kt-grid__item kt-grid__item--fluid"
          >
            {this.props.disableScroll && (
              <Menu htmlClassService={this.props.htmlClassService} />
            )}
            {!this.props.disableScroll && (
              <PerfectScrollbar
                options={{ wheelSpeed: 2, wheelPropagation: false }}
              >
                <Menu htmlClassService={this.props.htmlClassService} />
              </PerfectScrollbar>
            )}
            <div className="d-flex flex-column sidemenu-footer "  >
              <span>Share</span>
              <div className="d-flex justify-content-between  w-75 mt-3">
                <img alt={"fb"} src={FbImage} />
                <img alt={"whatsapp"} src={WhatsappImage} />
                <img alt={"twitter"} src={TwitterImage} />
                <img alt={"email"} src={EmailImage} />

              </div>
              <div className="break-line mt-5" ></div>
              <div className="logout-box mt-5 d-flex" >
                <img alt={"power"} src={PowerImage} />
                <span className="ml-3 logout-text " >Logout</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = store => ({
  disableAsideSelfDisplay:
    builder.selectors.getConfig(store, "aside.self.display") === false,
  disableScroll:
    builder.selectors.getConfig(store, "aside.menu.dropdown") === "true" ||
    false,
  asideClassesFromConfig: builder.selectors.getClasses(store, {
    path: "aside",
    toString: true
  }),
  menuCanvasOptions: {
    baseClass: "kt-aside",
    overlay: true,
    closeBy: "kt_aside_close_btn",
    toggleBy: {
      target: "kt_aside_mobile_toggler",
      state: "kt-header-mobile__toolbar-toggler--active"
    }
  }
});

export default connect(mapStateToProps)(AsideLeft);
