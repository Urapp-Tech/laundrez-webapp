import React, { useMemo } from "react";
// import { useSelector } from "react-redux";
import {
  Portlet,
  PortletBody,
  PortletHeader,
  PortletHeaderToolbar
} from "../../partials/content/Portlet";
import OrderImage from "../../../_metronic/layout/assets/layout-svg-icons/order-2.svg";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { Badge } from "react-bootstrap";
import CircularProgress from "../../partials/layout/CircularProgress";

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
  const orders = [
    {
      orderNumber: 'EZ-45867',
      orderDateTime: '17:20 , 12-01-2020',
      orderStatus: "placed",
      itemCount: '3',
      progressColor: '#357bf3',
      progressCount: '20',
      progressImage: "",
      serviceCharges: '$15.00',
    },
    {
      orderNumber: 'EZ-45864',
      orderDateTime: '22:16 , 09-01-2020',
      orderStatus: "pickedup",
      itemCount: '13',
      progressColor: '#c367f1',
      progressCount: '25',
      progressImage: "",
      serviceCharges: '$15.00',
    },
    {
      orderNumber: 'EZ-45867',
      orderDateTime: '17:20 , 12-01-2020',
      orderStatus: "out",
      itemCount: '3',
      progressColor: '#2CD285',
      progressCount: '100',
      progressImage: "",
      serviceCharges: '$15.00',
    },
    {
      orderNumber: 'EZ-45866',
      orderDateTime: '22:16 , 09-01-2020',
      orderStatus: "placed",
      itemCount: '1',
      progressColor: '#357bf3',
      progressCount: '80',
      progressImage: "",
      serviceCharges: '$15.00',
    },
    {
      orderNumber: 'EZ-45864',
      orderDateTime: '22:16 , 09-01-2020',
      orderStatus: "delivered",
      itemCount: '13',
      progressColor: '#949eae',
      progressCount: '100',
      progressImage: "",
      serviceCharges: '$15.00',
    },
  ];




  return (
    <>
      <div className="row">
        <div className="col-xl-5">
          <div className="row row-full-height ">
            {categories.map((data, i) => {
              return (
                <div className="col-md-6 ">
                  <Portlet className="justify-content-center category-card kt-portlet--border-bottom-brand">
                    <PortletBody className="justify-content-center align-items-center" >
                      <h5>{data.categoryTitle}</h5>
                      <img className="category-image" alt="img" src={data.categoryImage} />
                      <h6>Starting From</h6>
                      <h2 className="font-weight-bold" >{data.categoryPrice}</h2>
                    </PortletBody>
                  </Portlet>
                </div>
              )
            })
            }
            {/* <div className="kt-space-20" /> */}

          </div>
        </div>

        <div className="col-xl-7">
          <Portlet fluidHeight={true}>
            <PortletHeader
              icon={
                <img className="mr-2" alt={"icon"} src={OrderImage} />
              }
              title="Order History"
              toolbar={
                <PortletHeaderToolbar>
                  <Link to="">
                    View all
                  </Link>
                </PortletHeaderToolbar>
              }
            />

            <PortletBody>
              <Table striped responsive  >
                <thead  >
                  <tr>
                    <th></th>
                    <th>Order ID</th>
                    <th>Date & Time</th>
                    <th>Status</th>
                    <th>Items</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((data, i) => {

                    return (< tr >
                      <td>

                        {data.orderStatus === "delivered" ?
                          <CircularProgress value={data.progressCount} color={data.progressColor} img={"box.svg"} />
                          : data.orderStatus === "placed" ?
                            <CircularProgress value={data.progressCount} color={data.progressColor} img={"checklist.svg"} />
                            : data.orderStatus === "pickedup" ?
                              <CircularProgress value={data.progressCount} color={data.progressColor} img={"trolley.svg"} />
                              : data.orderStatus === "out" ?
                                <CircularProgress value={data.progressCount} color={data.progressColor} img={"tracking-green.svg"} />
                                : null

                        }
                      </td>
                      <td>{data.orderNumber}</td>
                      <td>{data.orderDateTime}</td>
                      <td>{
                        data.orderStatus === "delivered" ?
                          <Badge variant="order-delivered">Delivered</Badge>
                          : data.orderStatus === "placed" ?
                            <Badge variant="order-placed">Order Placed</Badge>
                            : data.orderStatus === "pickedup" ?
                              <Badge variant="order-pickedup">Order Pickedup</Badge>
                              : data.orderStatus === "out" ?
                                <Badge variant="order-out-delivery">Out for Delivery</Badge>
                                : null



                      }</td>
                      <td>{data.itemCount}</td>
                      <td>
                        {
                          data.orderStatus === "delivered" ?
                            <Badge variant="primary">Repeat Order</Badge>
                            : null
                        }
                      </td>
                    </tr>)
                  })
                  }
                </tbody>
              </Table>
            </PortletBody>
          </Portlet>
        </div>
      </div>

     
    </>
  );
}
