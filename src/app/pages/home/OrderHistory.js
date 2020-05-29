import React, { useEffect } from 'react';
import OrderHistoryTable from '../../partials/layout/OrderHistoryTable';
import OrderImage from '../../../_metronic/layout/assets/layout-svg-icons/order-2.svg';
import { Portlet, PortletHeader, PortletBody } from '../../partials/content/Portlet';
import { useSelector, useDispatch } from 'react-redux';
import { OrderActions } from '../../store/ducks/order-duck';

export default function OrderHistory() {
  const orders = useSelector(store => store?.order?.orders);
  const paging = useSelector(store => store?.order?.paging);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(OrderActions.getOrders());
  }, [dispatch]);

  return (
    <div className="col-xl-12">
      <Portlet fluidHeight={true}>

        <PortletHeader
          icon={
            <img className="mr-2" alt={'icon'} src={OrderImage} />
          }
          title="Order History"
        />
        <PortletBody>
          <OrderHistoryTable showPagination={true} orders={orders} paging={paging} />
        </PortletBody>
      </Portlet>
    </div>
  );
}