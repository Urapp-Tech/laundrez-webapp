import React from "react";
import { Link, } from "react-router-dom";
import { Table, Badge } from "react-bootstrap";
import OrderImage from "../../../_metronic/layout/assets/layout-svg-icons/order-2.svg";
import CircularProgress from "./CircularProgress";
import { Portlet, PortletHeader, PortletBody, PortletHeaderToolbar } from "../content/Portlet";

export default function OrderHistoryTable({ showToolbar }) {
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
                </PortletBody>
            </Portlet>
        </>
    );
}