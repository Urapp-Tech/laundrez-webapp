import React from 'react';
// import { useSelector } from "react-redux";
import {
  Portlet,
  PortletBody,
} from '../../partials/content/Portlet';
import OrderHistoryTable from '../../partials/layout/OrderHistoryTable';
import Info from '../../../_metronic/layout/assets/layout-svg-icons/info.svg';
import { Link } from 'react-router-dom';
// import OrderImage from "../../../_metronic/layout/assets/layout-svg-icons/order-2.svg";
// import { Link } from "react-router-dom";
// import { Table } from "react-bootstrap";
// import { Badge } from "react-bootstrap";
// import CircularProgress from "../../partials/layout/CircularProgress";

export default function Dashboard() {
  const categories = [
    {
      categoryTitle: 'Dry Cleaning',
      categoryPrice: '$5.00',
      categoryImage: 'https://image.flaticon.com/icons/svg/1818/1818882.svg',
    },
    {
      categoryTitle: 'Wash & Fold',
      categoryPrice: '$8.00',
      categoryImage:
        'https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/among_nature_p1xb.svg',
    },
    {
      categoryTitle: 'Commercial',
      categoryPrice: '$2.00',
      categoryImage: 'https://flatvectors.com/wp-content/uploads/travel-man.svg',
    },
    {
      categoryTitle: 'Dry Cleaning',
      categoryPrice: '$5.00',
      categoryImage: 'https://image.flaticon.com/icons/svg/1818/1818882.svg',
    },
    {
      categoryTitle: 'Wash & Fold',
      categoryPrice: '$8.00',
      categoryImage:
        'https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/among_nature_p1xb.svg',
    },
    // {
    //   categoryTitle: 'Commercial',
    //   categoryPrice: '$2.00',
    //   categoryImage: 'https://flatvectors.com/wp-content/uploads/travel-man.svg',
    // },
  ];





  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <h4 className="mb-3 pl-3" >Place Orders <img alt={'info'} src={Info} /> </h4>
          <div className="d-flex flex-wrap w-100 ">
            {categories.map((data, i) => {
              return (
                <div key={i} className=" margin-card  ">
                  <Portlet className="justify-content-center  category-card kt-portlet--border-bottom-brand">
                    <PortletBody className="justify-content-center align-items-center" >
                      <h5>{data.categoryTitle}</h5>
                      <img className="category-image" alt="img" src={data.categoryImage} />
                      <h6>Starting From</h6>
                      <h2 className="font-weight-bold" >{data.categoryPrice}</h2>
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
          <OrderHistoryTable showPagination={false} repeatOrder={false} />
        </div>
      </div>


    </>
  );
}
