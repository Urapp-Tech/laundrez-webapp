import React, { useEffect } from 'react';
import { Portlet, PortletBody } from '../../partials/content/Portlet';
import OrderReviewItems from '../../partials/content/OrderReviewItems';
import PickAndDropInfo from '../../partials/content/PickAndDropInfo';
import CircularProgress from '../../partials/layout/CircularProgress';
import { Row, Col } from 'react-bootstrap';
import Map from '../../partials/layout/Map';
import moment from 'moment';
import { Order, OrderColor, OrderProgressCount } from '../../store/ducks/order-duck/constants';
import { useDispatch, useSelector } from 'react-redux';
import { OrderActions } from '../../store/ducks/order-duck';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../store/services/config';
import defaultImage from '../../../_metronic/layout/assets/layout-svg-icons/no-image.png';

export default function OrderDetails() {
    const order = useSelector(store => store?.order?.orderDetail);
    const dispatch = useDispatch();
    const { orderId } = useParams();
    useEffect(() => {
        dispatch(OrderActions.getOrderDetail(orderId));
        return () => {
            dispatch(OrderActions.clearOrderDetail());
        };
    }, [dispatch, orderId]);
    return (
        <>
            <h4 className="mb-3" >Order Details</h4>
            <div className="row">
                <div className="col-xl-6 col-md-6">
                    <div className="row row-full-height ">
                        <div className="col-md-12 ">
                            <Portlet className="">
                                <PortletBody>
                                    <div  >
                                        <Row className="border-bottom pt-4 pb-4" >
                                            <Col className="d-flex " >

                                                {order?.status === Order.Delivered ?
                                                    <CircularProgress width="4rem" value={OrderProgressCount.Delivered} color={OrderColor.Delivered} img={'box.svg'} />
                                                    : order?.status === Order.OrderPlaced ?
                                                        <CircularProgress width="4rem" value={OrderProgressCount.OrderPlaced} color={OrderColor.OrderPlaced} img={'checklist.svg'} />
                                                        : order?.status === Order.PickUp ?
                                                            <CircularProgress width="4rem" value={OrderProgressCount.PickUp} color={OrderColor.PickUp} img={'trolley.svg'} />
                                                            : order?.status === Order.DropOff ?
                                                                <CircularProgress width="4rem" value={OrderProgressCount.DropOff} color={OrderColor.DropOff} img={'Dropoff.svg'} />
                                                                : order?.status === Order.InProgress ?
                                                                    <CircularProgress width="4rem" value={OrderProgressCount.InProgress} color={OrderColor.InProgress} img={'In-progress.svg'} />
                                                                    : order?.status === Order.Cancelled ?
                                                                        <CircularProgress width="4rem" value={OrderProgressCount.Cancelled} color={OrderColor.Cancelled} img={'cancel.svg'} />
                                                                        : null

                                                }
                                                {/* <CircularProgress width="4rem" value={88} color={'#2CD285'} img={'tracking-green.svg'} /> */}
                                                <div className="d-flex ml-2 h-100 justify-content-between flex-column order-info" >
                                                    <span>Order Id: <b>{order?.orderNumber}</b></span>
                                                    {/* <span>08:35 , 05-01-2020</span> */}
                                                    <span>{moment(order?.orderDate).format('hh:mm')} , {moment(order?.orderDate).format('DD-MM-YYYY')}</span>
                                                    {

                                                        order?.status === Order.OrderPlaced ?
                                                            <span className="text-order-placed font-weight-bold" >Order Placed</span> :
                                                            order?.status === Order.PickUp ?
                                                                <span className="text-order-pickedup font-weight-bold" >Order Picked Up</span> :
                                                                order?.status === Order.InProgress ?
                                                                    <span className="text-order-inprogress font-weight-bold" >Out for Delivery</span> :
                                                                    order?.status === Order.DropOff ?
                                                                        <span className="text-order-out-delivery font-weight-bold" >Order Droped Off</span> :
                                                                        order?.status === Order.Cancelled ?
                                                                            <span className="text-order-cancelled font-weight-bold" >Order Cancelled </span> :
                                                                            order?.status === Order.Delivered ?
                                                                                <span className="text-order-delivered font-weight-bold" >Order Delivered </span> :
                                                                                null
                                                    }
                                                </div>
                                            </Col>
                                            <Col>
                                                {order?.status === Order.OrderPlaced ? <button onClick={() => dispatch(OrderActions.cancelOrder(order?.id))} className="btn btn-block btn-primary-gradient btn-primary">Cancel Order</button> : null}
                                            </Col>
                                        </Row>
                                    </div>
                                    <div  >
                                        <PickAndDropInfo
                                            pickupDate={moment(order?.pickupDate).format('ddd, Do MMM YYYY')}
                                            pickupTime={order?.pickupTime}
                                            dropoffDate={moment(order?.dropoffDate).format('ddd, Do MMM YYYY')}
                                            dropoffTime={order?.dropoffTime}
                                            address={order?.address}
                                        />
                                    </div>
                                    <div className="mt-3" >
                                        {order?.listDetail?.map((v, i) => {
                                            return (

                                                <OrderReviewItems
                                                    key={i}
                                                    qty={v?.quantity}
                                                    price={v?.unitPrice}
                                                    title={v?.service?.title}
                                                    imageUrl={v?.service?.image ? `${API_URL}/${v?.service?.image}` : defaultImage}
                                                />
                                            );
                                        })
                                        }
                                    </div>
                                    <Row className="mt-3 border-bottom pb-3">
                                        <Col className=" " >
                                            <Row  >
                                                <Col className=" d-flex  justify-content-between align-items-center" >
                                                    <span>Total Amount</span>
                                                    <h6 className=" " >${Number(order?.orderAmount).toFixed(2)}</h6>
                                                </Col>
                                            </Row>
                                            <Row className="" >
                                                <Col className=" d-flex  justify-content-between align-items-center" >
                                                    <span>HST {order?.taxPercentage}%</span>
                                                    <h6 className=" " >${Math.abs(order?.orderAmount * (order?.taxPercentage / 100)).toFixed(2)}</h6>
                                                </Col>
                                            </Row>
                                            <Row className="" >
                                                <Col className=" d-flex  justify-content-between align-items-center" >
                                                    <span>Discount</span>
                                                    <h6 className=" " >${Number(order?.discountAmount).toFixed(2)}</h6>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <div>
                                        <Row className="  pb-3 pt-4" >
                                            <Col className=" d-flex justify-content-between align-items-center" >
                                                <h5>Grand Total</h5>
                                                <h5 className="kt-font-primary font-weight-bold" >${Number(order?.totalAmount).toFixed(2)}</h5>
                                            </Col>
                                        </Row>
                                    </div>



                                </PortletBody>
                            </Portlet>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-md-6">
                    <div className="row row-full-height ">
                        <div className="col-md-12 ">
                            <Map
                                height={'600px'}
                                showMarker={true}
                                lat={Number(order?.address?.lat)}
                                lng={Number(order?.address?.lng)}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}