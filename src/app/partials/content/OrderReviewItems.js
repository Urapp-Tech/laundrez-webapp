import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default function OrderReviewItems({ qty, title, imageUrl, price }) {
    return (
        <Row className="border-bottom mb-3 order-review-item" >
            <Col>
                <div className=" d-flex justify-content-center align-items-center">
                    <div className="rounded-circle product-image  border-image-theme mb-3" >
                        <img
                            src={imageUrl}
                            alt="product"
                            className="img-fluid"
                        />
                    </div>
                    <div className="ml-2 font-weight-bold w-25 "  >{title}</div>
                </div>
            </Col>
            <Col className="d-flex justify-content-center align-items-center" >
                <span> {qty} Items </span>

            </Col>
            <Col className="d-flex justify-content-end align-items-center" >
                <span className="kt-font-primary font-weight-bold"> ${Math.abs(qty * price).toFixed(2)} </span>
            </Col>

        </Row>
    );
}