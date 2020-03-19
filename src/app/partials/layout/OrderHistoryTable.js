import React, { useState } from "react";
import { Link, } from "react-router-dom";
import { Table, Badge } from "react-bootstrap";
import OrderImage from "../../../_metronic/layout/assets/layout-svg-icons/order-2.svg";
import CircularProgress from "./CircularProgress";
import { Portlet, PortletHeader, PortletBody, PortletHeaderToolbar } from "../content/Portlet";
import Pagination from "react-js-pagination";

export default function OrderHistoryTable({ showToolbar, showPagination }) {
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
        
    ];
    const [activePage, setActivePage] = useState(1);
    return (
        <>
            <Portlet fluidHeight={true}>
                <PortletHeader
                    icon={
                        <img className="mr-2" alt={"icon"} src={OrderImage} />
                    }
                    title="Order History"
                    toolbar={
                        showToolbar ?
                            <PortletHeaderToolbar>
                                <Link to="/orderhistory">
                                    View all
                                </Link>
                            </PortletHeaderToolbar>
                            : null
                    }
                />

                <PortletBody>
                    <Table className="table-head-solid table-light"  responsive  >
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

                                return (< tr key={i} >
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
                    {showPagination ? <div className="d-flex justify-content-center kt-pagination kt-pagination--circle kt-pagination--brand " >
                        <Pagination
                            innerClass={"kt-pagination__links"}
                            activePage={activePage}
                            itemsCountPerPage={10}
                            totalItemsCount={2000}
                            pageRangeDisplayed={5}
                            activeClass={"kt-pagination__link--active"}
                            linkClass={"kt-pagination__links"}
                            prevPageText={<i className="fa fa-angle-left "></i>}
                            nextPageText={<i className="fa fa-angle-right"></i>}
                            firstPageText={<i className="fa fa-angle-double-left"></i>}
                            lastPageText={<i className="fa fa-angle-double-right"></i>}
                            itemClassNext={"kt-pagination__link--next"}
                            itemClassPrev={"kt-pagination__link--prev"}
                            itemClassFirst={"kt-pagination__link--first"}
                            itemClassLast={"kt-pagination__link--last"}
                            onChange={(pageNumber) => setActivePage(pageNumber)}
                        />
                    </div> : null}
                </PortletBody>
            </Portlet>
        </>
    );
}