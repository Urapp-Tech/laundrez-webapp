import React from "react";
import OrderHistoryTable from "../../partials/layout/OrderHistoryTable";

export default function OrderHistory() {

    return (
        <div className="col-xl-12">
          <OrderHistoryTable showToolbar={false} />
        </div>
    );
}