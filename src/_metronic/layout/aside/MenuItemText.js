import React from 'react';

export default class MenuItemText extends React.Component {
  render() {
    const { item, parentItem } = this.props;

    return (
      <>
        {/* {item.icon && <i className={`kt-menu__link-icon ${item.icon}`} />} */}
        {item.icon && <img className="  img-fluid mr-3" src={require(`../assets/layout-svg-icons/${item.icon}`)} alt="icon" />}


        {parentItem && parentItem.bullet === 'dot' && (
          <i className="kt-menu__link-bullet kt-menu__link-bullet--dot">
            <span />
          </i>
        )}

        {parentItem && parentItem.bullet === 'line' && (
          <i className="kt-menu__link-bullet kt-menu__link-bullet--line">
            <span />
          </i>
        )}

        <span className="kt-menu__link-text" style={{ whiteSpace: 'nowrap' }}>
          {!item.translate ? (
            item.title
          ) : (
              item.title
            )}
        </span>

        {item.badge && (
          <span className="kt-menu__link-badge">
            <span className={`kt-badge ${item.badge.type}`}>
              {item.badge.value}
            </span>
          </span>
        )}
        {item.submenu && <i className="kt-menu__ver-arrow fas fa-angle-right" />}
      </>
    );
  }
}
