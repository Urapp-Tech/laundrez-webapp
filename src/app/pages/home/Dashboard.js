import React, { useCallback, useEffect } from 'react';
// import { useSelector } from "react-redux";
import {
  Portlet,
  PortletBody,
} from '../../partials/content/Portlet';
import OrderHistoryTable from '../../partials/layout/OrderHistoryTable';
import Info from '../../../_metronic/layout/assets/layout-svg-icons/info.svg';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { API_URL } from '../../store/services/config';
import defaultImage from '../../../_metronic/layout/assets/layout-svg-icons/no-image.png';
import { OrderActions } from '../../store/ducks/order-duck';


export default function Dashboard({ history }) {


  const categories = useSelector(store => store?.category?.categories);
  const activeOrders = useSelector(store => store?.order?.activeOrders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(OrderActions.getActiveOrders());
  }, [dispatch]);

  const onClickCategory = useCallback((id, category) => {
    history.push({
      pathname: `/services/${id}`,
      state: { category }
    });
  }, [history]);



  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <h4 className="mb-3 pl-3" >Place Orders <img alt={'info'} src={Info} /> </h4>
          <div className="d-flex flex-wrap w-100 ">
            {categories.map((data, i) => {
              return (
                <div key={i} className=" margin-card  " onClick={() => onClickCategory(data.id, data)} >
                  <Portlet className="justify-content-center  category-card kt-portlet--border-bottom-brand">
                    <PortletBody className="justify-content-center align-items-center" >
                      <h5 className=" text-break text-center" >{data.title}</h5>
                      <img className="category-image" alt="img" src={data.image ? `${API_URL}/${data.image}` : defaultImage} />
                      {/* <h6>Starting From</h6>
                      <h2 className="font-weight-bold" >{data.categoryPrice}</h2> */}
                    </PortletBody>
                  </Portlet>
                </div>
              );
            })
            }
            {/* <div className="kt-space-20" /> */}

          </div>
        </div>

        <div className="col-md-12">
          <div className="d-flex justify-content-between align-items-center mt-5" >
            <h4 className="mb-3 pl-3 " >
              <span> Active Orders <img alt={'info'} src={Info} /></span>

            </h4>
            <Link to="/orderhistory" >View All</Link>
          </div>
          <OrderHistoryTable showPagination={false} repeatOrder={false} orders={activeOrders} />
        </div>
      </div>


    </>
  );
}
