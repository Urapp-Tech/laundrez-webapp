import React, { useEffect } from 'react';

const HeaderDropdownToggle = React.forwardRef((props, ref) => {
  useEffect(() => {
    let item = document.getElementById('place-order-item');
    if (item)
      item.classList.remove('dropdown-item');
  });
  return (
    <div
      ref={ref}
      className="kt-header__topbar-wrapper"
      onClick={e => {
        e.preventDefault();
        props.onClick(e);
      }}
    >
      {props.children}
    </div>
  );
});

HeaderDropdownToggle.displayName = 'HeaderDropdownToggle';
export default HeaderDropdownToggle;
