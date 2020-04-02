/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toAbsoluteUrl } from "../../../_metronic";


class UserProfile extends React.Component {
  render() {
    const { showAvatar, showBadge, } = this.props;
    return (
      <Link to="/profile" className="d-flex justify-content-center align-items-center" >
        <div className="kt-header__topbar-item kt-header__topbar-item--user"  >
          <div className="kt-header__topbar-user">

            {showAvatar && <img alt="Pic" className="rounded-circle" src={toAbsoluteUrl("/media/users/300_25.jpg")} />}

            {showBadge && (
              <span className="kt-badge kt-badge--username kt-badge--unified-success kt-badge--lg kt-badge--rounded kt-badge--bold">
                {/* TODO: Should get from currentUser */}
           John Doe
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }
}

const mapStateToProps = ({ auth: { user } }) => ({
  user
});

export default connect(mapStateToProps)(UserProfile);
