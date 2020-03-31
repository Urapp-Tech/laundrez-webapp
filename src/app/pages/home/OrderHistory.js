import React from "react";
import OrderHistoryTable from "../../partials/layout/OrderHistoryTable";
import OrderImage from "../../../_metronic/layout/assets/layout-svg-icons/order-2.svg";
import { Portlet, PortletHeader, PortletBody } from "../../partials/content/Portlet";

export default function OrderHistory() {

  return (
    <div className="col-xl-12">
      <Portlet fluidHeight={true}>

        <PortletHeader
          icon={
            <img className="mr-2" alt={"icon"} src={OrderImage} />
          }
          title="Order History"
        />
        <PortletBody>

          <OrderHistoryTable  showPagination={true} />
        </PortletBody>
      </Portlet>
    </div>
  );
}