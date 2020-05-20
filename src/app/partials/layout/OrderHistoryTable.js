import React, { useEffect } from 'react';
import { withRouter, } from 'react-router-dom';
import { Table, Badge } from 'react-bootstrap';
import CircularProgress from './CircularProgress';
import Pagination from 'react-js-pagination';
import { useSelector, useDispatch } from 'react-redux';
import { OrderActions } from '../../store/ducks/order-duck';

function OrderHistoryTable({ history, showPagination, repeatOrder = true }) {
    const dispatch = useDispatch();
    const orders = useSelector(store => store?.order?.orders);
    const paging = useSelector(store => store?.order?.paging);
    useEffect(() => {
        dispatch(OrderActions.getOrders());
    }, [dispatch]);

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

                                {data.status === 'delivered' ?
                                    <CircularProgress value={data.progressCount} color={data.progressColor} img={'box.svg'} />
                                    : data.status === 'placed' ?
                                        <CircularProgress value={data.progressCount} color={data.progressColor} img={'checklist.svg'} />
                                        : data.status === 'pickedup' ?
                                            <CircularProgress value={data.progressCount} color={data.progressColor} img={'trolley.svg'} />
                                            : data.status === 'out' ?
                                                <CircularProgress value={data.progressCount} color={data.progressColor} img={'tracking-green.svg'} />
                                                : null

                                }
                            </td>
                            <td className="cursor-pointer" onClick={() => history.push('/orderdetails')} >{data.orderNumber}</td>
                            <td>{data.orderDate}</td>
                            <td>{
                                data.status === 'delivered' ?
                                    <Badge variant="order-delivered">Delivered</Badge>
                                    : data.status === 'placed' ?
                                        <Badge variant="order-placed">Order Placed</Badge>
                                        : data.status === 'pickedup' ?
                                            <Badge variant="order-pickedup">Order Pickedup</Badge>
                                            : data.status === 'out' ?
                                                <Badge variant="order-out-delivery">Out for Delivery</Badge>
                                                : null



                            }</td>
                            <td>{data.listDetail.length}</td>
                            {repeatOrder &&
                                <td>
                                    {
                                        data.status === 'delivered' ?
                                            <Badge variant="primary">Repeat Order</Badge>
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
}
export default withRouter(OrderHistoryTable);