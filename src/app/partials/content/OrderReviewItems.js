import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default function OrderReviewItems() {
    return (
        <Row className="border-bottom mb-3" >
            <Col>
                <div className=" d-flex justify-content-center align-items-center">
                    <div style={{width:'8rem'}} className="rounded-circle  border-image-theme mb-3" >
                        <img
                            src={'https://i.ya-webdesign.com/images/clothes-model-png-2.png'}
                            alt="product"
                            className="img-fluid"
                        />
                    </div>
                    <div className="ml-2 font-weight-bold"  >Wash & Fold 15 Lbs</div>
                </div>
            </Col>
            <Col className="d-flex justify-content-center align-items-center" >
                <span> 3 Items </span>

            </Col>
            <Col className="d-flex justify-content-end align-items-center" >
                <span className="kt-font-primary font-weight-bold"> $150.00 </span>
            </Col>

        </Row>
    );
}