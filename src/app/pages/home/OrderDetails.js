import React from "react";
import { Portlet, PortletBody } from "../../partials/content/Portlet";
import OrderReviewItems from "../../partials/content/OrderReviewItems";
import PickAndDropInfo from "../../partials/content/PickAndDropInfo";
import CircularProgress from "../../partials/layout/CircularProgress";
import { Row, Col } from "react-bootstrap";
import Map from "../../widgets/Map";
export default function OrderDetails() {
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
                                                <CircularProgress width="4rem" value={88} color={"#2CD285"} img={"tracking-green.svg"} />
                                                <div className="d-flex ml-2 h-100 justify-content-between flex-column order-info" >
                                                    <span>Order Id: <b>EZ-45866</b></span>
                                                    <span>08:35 , 05-01-2020</span>
                                                    <span className="text-out-for-delivery font-weight-bold" > Out for Delivery </span>
                                                </div>
                                            </Col>
                                            <Col>
                                                <button className="btn btn-block btn-primary-gradient btn-primary">Cancel or Change Order</button>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div  >
                                        <PickAndDropInfo />
                                    </div>
                                    <div className="mt-3" >
                                        <OrderReviewItems />
                                        <OrderReviewItems />
                                    </div>
                                    <Row className="mt-3 border-bottom pb-3">
                                        <Col className=" " >
                                            <Row  >
                                                <Col className=" d-flex  justify-content-between align-items-center" >
                                                    <span>Total Amount</span>
                                                    <h6 className=" " >$400</h6>
                                                </Col>
                                            </Row>
                                            <Row className="" >
                                                <Col className=" d-flex  justify-content-between align-items-center" >
                                                    <span>HST 13%</span>
                                                    <h6 className=" " >$31.20</h6>
                                                </Col>
                                            </Row>
                                            <Row className="" >
                                                <Col className=" d-flex  justify-content-between align-items-center" >
                                                    <span>Discount</span>
                                                    <h6 className=" " >$18</h6>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <div>
                                        <Row className="  pb-3 pt-4" >
                                            <Col className=" d-flex justify-content-between align-items-center" >
                                                <h5>Grand Total</h5>
                                                <h5 className="kt-font-primary font-weight-bold" >$431.20</h5>
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
                            <Map height={"600px"} />
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}