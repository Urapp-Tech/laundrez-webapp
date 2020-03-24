import React from "react";
import { Portlet, PortletBody } from "../../partials/content/Portlet";
import { Row, Col } from "react-bootstrap";
import OrderReviewItems from "../../partials/content/OrderReviewItems";
import PickAndDropInfo from "../../partials/content/PickAndDropInfo";
import { ReactComponent as Basket } from "../../../_metronic/layout/assets/layout-svg-icons/shopping-cart.svg";
import Map from "../../widgets/Map";

export default function OrderReview() {
    return (
        <>
            <h4 className="mb-3" >Order Review</h4>
            <div className="row">
                <div className="col-xl-6 col-md-6">
                    <div className="row row-full-height ">
                        <div className="col-md-12 ">
                            <Portlet className="">
                                <PortletBody>
                                    <div>
                                        <OrderReviewItems />
                                        <OrderReviewItems />
                                    </div>
                                    <div>
                                        <PickAndDropInfo />
                                    </div>
                                    <div>
                                        <Row className="mt-3 border-bottom pb-3" >
                                            <Col className="driver-inst d-flex flex-column" >
                                                <label>Driver Instruction</label>
                                                <span className="" >Please come to the side door and call on my mobile. Don't ring the bell.</span>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div>
                                        <Row className=" border-bottom pb-3 pt-4" >
                                            <Col className=" d-flex justify-content-between align-items-center" >
                                                <h5>Payable Amount</h5>
                                                <h6 className="kt-font-primary font-weight-bold" >$431.20</h6>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div>
                                        <Row className=" pb-3 pt-4" >
                                            <Col className=" d-flex  align-items-center" >
                                                <Basket style={{ width: "1rem", height: "1rem" }} />
                                                <span className="ml-1 kt-font-primary" >Add More to Basket</span>
                                            </Col>
                                            <Col className=" d-flex justify-content-between align-items-center" >
                                                <button className="btn btn-block btn-primary-gradient btn-primary">Continue</button>

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