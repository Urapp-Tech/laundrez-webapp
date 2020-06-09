import React, { useCallback, useEffect, useState } from 'react';
import { withRouter, } from 'react-router-dom';
import { Table, Badge } from 'react-bootstrap';
import CircularProgress from './CircularProgress';
import Pagination from 'react-js-pagination';
import { OrderActions } from '../../store/ducks/order-duck';
import { Order, OrderColor } from '../../store/ducks/order-duck/constants';
import { useDispatch, useSelector } from 'react-redux';
import { MyBasketActions } from '../../store/ducks/mybasket-duck/actions';

function OrderHistoryTable({ history, showPagination, repeatOrder = true, orders, paging }) {

    const [isOnRepeatOrderClicked, setIsOnRepeatOrderClicked] = useState(false);
    const orderDetails = useSelector(store => store?.order?.orderDetail?.listDetail);
    const dispatch = useDispatch();
    const onRepeatOrderClick = useCallback((orderId) => {
        setIsOnRepeatOrderClicked(true);
        dispatch(OrderActions.getOrderDetail(orderId));
    }, [dispatch]);
    useEffect(() => {
        if (orderDetails && isOnRepeatOrderClicked) {
            orderDetails.forEach((v) => {
                let service = v?.service;
                service['qty'] = v?.quantity;
                dispatch(MyBasketActions.addToBasket(service));
            });
            setIsOnRepeatOrderClicked(false);
            history.replace('/mybasket');

        }
        return () => {
            if (orderDetails) {
                dispatch(OrderActions.clearOrderDetail());
            }
        };
    }, [orderDetails, dispatch, history, isOnRepeatOrderClicked]);
    if (orders.length)
        return (
            <>
                <Table className="table-head-solid table-light" responsive  >
                    <thead  >
                        <tr>
                            <th></th>
                            <th>Order ID</th>
                            <th>Date & Time</th>
                            <th>Status</th>
                            <th>Items</th>
                            {repeatOrder && <th></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((data, i) => {

                            return (< tr key={i} >
                                <td>

                                    {data.status === Order.Delivered ?
                                        <CircularProgress value={100} color={OrderColor.Delivered} img={'box.svg'} />
                                        : data.status === Order.OrderPlaced ?
                                            <CircularProgress value={100} color={OrderColor.OrderPlaced} img={'checklist.svg'} />
                                            : data.status === Order.PickUp ?
                                                <CircularProgress value={100} color={OrderColor.PickUp} img={'trolley.svg'} />
                                                : data.status === Order.DropOff ?
                                                    <CircularProgress value={100} color={OrderColor.DropOff} img={'Dropoff.svg'} />
                                                    : data.status === Order.InProgress ?
                                                        <CircularProgress value={100} color={OrderColor.InProgress} img={'In-progress.svg'} />
                                                        : data.status === Order.Cancelled ?
                                                            <CircularProgress value={100} color={OrderColor.Cancelled} img={'cancel.svg'} />
                                                            : null

                                    }
                                </td>
                                <td className="cursor-pointer" onClick={() => history.push({
                                    pathname: `/orderdetails/${data?.id}`,
                                })} >{data.orderNumber}</td>
                                <td>{data.orderDate}</td>
                                <td>{
                                    data.status === Order.Delivered ?
                                        <Badge variant="order-delivered">Delivered</Badge>
                                        : data.status === Order.OrderPlaced ?
                                            <Badge variant="order-placed">Order Placed</Badge>
                                            : data.status === Order.PickUp ?
                                                <Badge variant="order-pickedup">Order Pickedup</Badge>
                                                : data.status === Order.DropOff ?
                                                    <Badge variant="order-out-delivery">Dropoff</Badge>
                                                    : data.status === Order.InProgress ?
                                                        <Badge variant="order-inprogress">In Progress</Badge>
                                                        : data.status === Order.Cancelled ?
                                                            <Badge variant="order-cancelled">Cancelled</Badge>
                                                            : null



                                }</td>
                                <td>{data.listDetail.length}</td>
                                {repeatOrder &&
                                    <td>
                                        {
                                            data.status === Order.Delivered ?
                                                <Badge className="cursor-pointer" variant="primary" onClick={() => onRepeatOrderClick(data.id)} >Repeat Order</Badge>
                                                : null
                                        }
                                    </td>
                                }
                            </tr>);
                        })
                        }
                    </tbody>
                </Table>
                {showPagination ? <div className="d-flex justify-content-center kt-pagination kt-pagination--circle kt-pagination--brand " >
                    <Pagination
                        innerClass={'kt-pagination__links'}
                        activePage={paging?.pageNumber}
                        itemsCountPerPage={paging?.pageSize}
                        totalItemsCount={paging?.totalCount}
                        pageRangeDisplayed={5}
                        activeClass={'kt-pagination__link--active'}
                        linkClass={'kt-pagination__links'}
                        prevPageText={<i className="fa fa-angle-left "></i>}
                        nextPageText={<i className="fa fa-angle-right"></i>}
                        firstPageText={<i className="fa fa-angle-double-left"></i>}
                        lastPageText={<i className="fa fa-angle-double-right"></i>}
                        itemClassNext={'kt-pagination__link--next'}
                        itemClassPrev={'kt-pagination__link--prev'}
                        itemClassFirst={'kt-pagination__link--first'}
                        itemClassLast={'kt-pagination__link--last'}
                        onChange={(pageNumber) => dispatch(OrderActions.getOrders(pageNumber))}
                    />
                </div> : null}

            </>
        );
    else
        return <h4 className="mb-3 text-center text-primary" >No Records Found</h4>;
}
export default withRouter(OrderHistoryTable);