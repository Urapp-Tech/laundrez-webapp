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
import { CategoryActions } from '../../store/ducks/category-duck';
import { useDispatch, useSelector } from 'react-redux';
import { LovActions } from '../../store/ducks/lov-duck/actions';
// import { AuthStorage } from '../../store/ducks/auth-duck/auth-storage';



export default function HomePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CategoryActions.getCategories());
    dispatch(LovActions.getLov());
  }, [dispatch]);

  const isProfileCompleted = useSelector(store => store?.auth?.isProfileCompleted);


  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {/* /* Redirect from root URL to /dashboard. */}
        {
          (isProfileCompleted
            ?
            <Redirect exact from="/" to="/dashboard" />
            :
            <Redirect exact from="/" to="/profile" />)
        }
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/services/:categoryId" component={Services} />
        <Route path="/orderhistory" component={OrderHistory} />
        <Route path="/mybasket" component={MyBasket} />
        <Route path="/deliveryaddress" component={DeliveryAddress} />
        <Route path="/pickanddrop" component={PickAndDrop} />
        <Route path="/orderreview" component={OrderReview} />
        <Route path="/orderdetails/:orderId" component={OrderDetails} />
        <Route path="/contactus" component={ContactUs} />
        <Route path="/paymentsettings" component={PaymentSettings} />
        <Route path="/paymentdetails" component={PaymentDetails} />
        <Route path="/profile" component={YourProfile} />
        <Route path="/faqs" component={Faqs} />




        <Redirect to="/error/error-v1" />
      </Switch>
    </Suspense>
  );
}
