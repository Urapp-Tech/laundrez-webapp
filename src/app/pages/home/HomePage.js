import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import { LayoutSplashScreen } from '../../../_metronic';
import Services from './Services';
import OrderHistory from './OrderHistory';
import MyBasket from './MyBasket';
import DeliveryAddress from './DeliveryAddress';
import PickAndDrop from './PickAndDrop';
import OrderReview from './OrderReview';
import OrderDetails from './OrderDetails';
import ContactUs from './ContactUs';
import PaymentSettings from './PaymentSettings';
import PaymentDetails from './PaymentDetails';
import YourProfile from './YourProfile';
import Faqs from './Faqs';
import TermsAndCondtion from './TermsAndCondition';
import PrivacyPolicy from './PrivacyPolicy';



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
          <Redirect exact from="/" to="/customer/dashboard" />
        }
        <Route path="/customer/dashboard" component={Dashboard} />
        <Route path="/customer/services" component={Services} />
        <Route path="/customer/orderhistory" component={OrderHistory} />
        <Route path="/customer/mybasket" component={MyBasket} />
        <Route path="/customer/deliveryaddress" component={DeliveryAddress} />
        <Route path="/customer/pickanddrop" component={PickAndDrop} />
        <Route path="/customer/orderreview" component={OrderReview} />
        <Route path="/customer/orderdetails" component={OrderDetails} />
        <Route path="/customer/contactus" component={ContactUs} />
        <Route path="/customer/paymentsettings" component={PaymentSettings} />
        <Route path="/customer/paymentdetails" component={PaymentDetails} />
        <Route path="/customer/profile" component={YourProfile} />
        <Route path="/customer/faqs" component={Faqs} />
        <Route path="/customer/termsandcondition" component={TermsAndCondtion} />
        <Route path="/customer/privacypolicy" component={PrivacyPolicy} />



        <Redirect to="/error/error-v1" />
      </Switch>
    </Suspense>
  );
}
