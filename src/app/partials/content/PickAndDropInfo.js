import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Clock from '../../../_metronic/layout/assets/layout-svg-icons/clock.svg';
import Calendar from '../../../_metronic/layout/assets/layout-svg-icons/calendar.svg';
import Pin from '../../../_metronic/layout/assets/layout-svg-icons/pin.svg';
import moment from 'moment';

export default function PickAndDropInfo() {

    const order = useSelector(store => store?.order?.currentOrder);

    return (
        <Row className="mt-3 border-bottom pb-3" >
            <Col className="border-right" >
                <div className=" d-flex flex-column justify-content-between align-items-start">
                    <div className="mb-2 font-weight-bold kt-font-primary"  >Pickup Date & Time</div>

                    <div className="d-flex w-100  justify-content-start align-items-start" >
                        <span>
                            <img alt={'img'} src={Calendar} className="w-75 h-75" />
                        </span>
                        <span>{moment(order.pickupDate).format('ddd, Do MMM YYYY')}</span>

                    </div>
                    <div className="d-flex w-100 justify-content-start align-items-start" >
                        <span>
                            <img alt={'img'} src={Clock} className="w-75 h-75" />
                        </span>
                        <span>{order.pickupTime}</span>
                    </div>

                </div>
            </Col>
            <Col className="border-right" >
                <div className=" d-flex flex-column justify-content-between align-items-start">
                    <div className="mb-2 font-weight-bold kt-font-primary"  >Drop-off Date & Time</div>

                    <div className="d-flex w-100  justify-content-start align-items-start" >
                        <span>
                            <img alt={'img'} className="w-75 h-75" src={Calendar} />
                        </span>
                        <span>{moment(order.dropoffDate).format('ddd, Do MMM YYYY')}</span>

                    </div>
                    <div className="d-flex w-100 justify-content-start align-items-start" >
                        <span>
                            <img alt={'img'} src={Clock} className="w-75 h-75" />
                        </span>
                        <span>{order.dropoffTime}</span>
                    </div>

                </div>
            </Col>
            <Col>
                <div className=" d-flex street-container h-100  justify-content-center align-items-center">
                    <span>
                        <img alt={'img'} src={Pin} className="pin-image img-fluid " />

                    </span>
                    <span className="ml-2 street-text" > {order.address?.postalCode} | {order.address?.street}</span>

                </div>
            </Col>
        </Row>
    );
}