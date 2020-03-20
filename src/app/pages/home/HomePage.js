import React, { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Builder from "./Builder";
import Dashboard from "./Dashboard";
import DocsPage from "./docs/DocsPage";
import { LayoutSplashScreen } from "../../../_metronic";
import Services from "./Services";
import OrderHistory from "./OrderHistory";
import MyBasket from "./MyBasket";
import AddDeliveryAddress from "./AddDeliveryAddress";
import PickAndDrop from "./PickAndDrop";
import OrderReview from "./OrderReview";
import OrderDetails from "./OrderDetails";

const GoogleMaterialPage = lazy(() =>
  import("./google-material/GoogleMaterialPage")
);
const ReactBootstrapPage = lazy(() =>
  import("./react-bootstrap/ReactBootstrapPage")
);

export default function HomePage() {
  // useEffect(() => {
  //   console.log('Home page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <Route path="/builder" component={Builder} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/google-material" component={GoogleMaterialPage} />
        <Route path="/react-bootstrap" component={ReactBootstrapPage} />
        <Route path="/docs" component={DocsPage} />
        <Route path="/services" component={Services} />
        <Route path="/orderhistory" component={OrderHistory} />
        <Route path="/mybasket" component={MyBasket} />
        <Route path="/deliveryaddress" component={AddDeliveryAddress} />
        <Route path="/pickanddrop" component={PickAndDrop} />
        <Route path="/orderreview" component={OrderReview} />
        <Route path="/orderdetails" component={OrderDetails} />


        <Redirect to="/error/error-v1" />
      </Switch>
    </Suspense>
  );
}
