import React, { Suspense, useEffect } from 'react';
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
import { CategoryActions } from '../../store/ducks/category-duck';
import { useDispatch } from 'react-redux';



export default function HomePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CategoryActions.getCategories());
  }, [dispatch]);


  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/services/:categoryId" component={Services} />
        <Route path="/orderhistory" component={OrderHistory} />
        <Route path="/mybasket" component={MyBasket} />
        <Route path="/deliveryaddress" component={DeliveryAddress} />
        <Route path="/pickanddrop" component={PickAndDrop} />
        <Route path="/orderreview" component={OrderReview} />
        <Route path="/orderdetails" component={OrderDetails} />
        <Route path="/contactus" component={ContactUs} />
        <Route path="/paymentsettings" component={PaymentSettings} />
        <Route path="/paymentdetails" component={PaymentDetails} />
        <Route path="/profile" component={YourProfile} />
        <Route path="/faqs" component={Faqs} />
        <Route path="/termsandcondition" component={TermsAndCondtion} />
        <Route path="/privacypolicy" component={PrivacyPolicy} />



        <Redirect to="/error/error-v1" />
      </Switch>
    </Suspense>
  );
}
